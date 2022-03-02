from ast import Return
import imp
import re
import json
import environ
import razorpay
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.models import Pizza, Crust, Cheese, Sauce, Veggie, Order, OrderItem, ShippingAddress, Review
from rest_framework import serializers
from base.serializers import PizzaSerializer, CheeseSerializer, CrustSerializer, SauceSerializer, VeggieSerializer, OrderSerializer
from django.contrib.auth.models import User
from django.core.checks import messages
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.models import Order, OrderItem, ShippingAddress
from rest_framework import status
from datetime import datetime

env = environ.Env()
environ.Env.read_env()


@api_view(['GET'])
def getPizzas(request):
    pizzas = Pizza.objects.all()
    serializer = PizzaSerializer(pizzas, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def makePizza(request):
    data = request.data
    crust = Crust.objects.get(id=data['crustId'])
    sauce = Sauce.objects.get(id=data['sauceId'])
    cheese = Cheese.objects.get(id=data['cheeseId'])
    veggie = Veggie.objects.get(id=data['veggieId'])
    name = data['name']
    description = data['description']
    user = request.user
    pizza, created = Pizza.objects.get_or_create(
        crust=crust,
        sauce=sauce,
        cheese=cheese,
        veggie=veggie,
        defaults={'name': name, 'description': description,
                  'user': user}
    )
    serializer = PizzaSerializer(pizza, many=False)
    return Response(serializer.data)


@ api_view(['GET'])
def getIngredients(request):
    crusts = Crust.objects.all()
    sauces = Sauce.objects.all()
    cheeses = Cheese.objects.all()
    veggies = Veggie.objects.all()
    crustSerializer = CrustSerializer(crusts, many=True)
    sauceSerializer = SauceSerializer(sauces, many=True)
    cheeseSerializer = CheeseSerializer(cheeses, many=True)
    veggieSerializer = VeggieSerializer(veggies, many=True)
    return Response({"crusts": crustSerializer.data, "sauces": sauceSerializer.data, "cheeses": cheeseSerializer.data, "veggies": veggieSerializer.data})


@api_view(['GET'])
def getPizza(request, pk):
    pizzas = Pizza.objects.get(id=pk)
    serializer = PizzaSerializer(pizzas, many=False)
    return Response(serializer.data)


@ api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPizzaReview(request, pk):
    pizza = Pizza.objects.get(id=pk)
    user = request.user
    data = request.data

    # reviewexists
    alreadyExists = pizza.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # no rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # no comment
    elif data['comment'] == "":
        content = {'detail': 'Please add a comment'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # create review
    else:
        review = Review.objects.create(
            user=user,
            pizza=pizza,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = pizza.review_set.all()
        pizza.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        pizza.rating = total/len(reviews)
        pizza.save()

        return Response('Review added')


@ api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data["orderItems"]
    price = data['totalPrice']
    amount = int(float(price)) * 100
    client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # razorpay instance
        payment = client.order.create({"amount":  amount,
                                       "currency": "INR",
                                       "payment_capture": "1"})
        # create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=amount,
            orderPaymentId=payment['id']
        )
        # create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        # create order items and set relationship to order
        for i in orderItems:
            pizza = Pizza.objects.get(id=i['pizza'])
            item = OrderItem.objects.create(
                pizza=pizza,
                order=order,
                name=pizza.name,
                qty=i['qty'],
                price=i['price'],
                image=pizza.image,
            )
        # update stock
            crust = pizza.crust
            sauce = pizza.sauce
            cheese = pizza.cheese
            veggie = pizza.veggie
            crust.countInStock -= item.qty
            sauce.countInStock -= item.qty
            cheese.countInStock -= item.qty
            veggie.countInStock -= item.qty
            crust.save()
            sauce.save()
            cheese.save()
            veggie.save()
            pizza.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['POST'])
def handle_payment_success(request):
    # request.data is coming from frontend
    res = json.loads(request.data["response"])

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = Order.objects.get(orderPaymentId=ord_id)

    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))

    # checking if the transaction is valid or not by passing above data dictionary in
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)
    print(check)

    if check is True:
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        res_data = {
            'message': 'payment successfully received!'
        }

        return Response(res_data)
    else:
        print('it did not work')
        return Response({'error': 'Something went wrong'})


@ api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@ api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist '},
                        status=status.HTTP_400_BAD_REQUEST)


@ api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@ api_view(['PUT'])
@permission_classes([IsAdminUser])
def changeOderStatus(request, pk):
    order = Order.objects.get(id=pk)
    data = request.data
    status = data["status"]
    order.status = status
    order.save()
    return Response('Order status updated')
