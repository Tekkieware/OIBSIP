from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Pizza, Crust, Cheese, Sauce, Veggie, Review, Order, ShippingAddress, OrderItem
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class CrustSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crust
        fields = '__all__'


class CheeseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cheese
        fields = '__all__'


class SauceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sauce
        fields = '__all__'


class VeggieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veggie
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class PizzaSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    crust = serializers.SerializerMethodField(read_only=True)
    cheese = serializers.SerializerMethodField(read_only=True)
    sauce = serializers.SerializerMethodField(read_only=True)
    veggie = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Pizza
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def get_crust(self, obj):
        crust = obj.crust
        serializer = CrustSerializer(crust, many=False)
        return serializer.data

    def get_cheese(self, obj):
        cheese = obj.cheese
        serializer = CheeseSerializer(cheese, many=False)
        return serializer.data

    def get_sauce(self, obj):
        sauce = obj.sauce
        serializer = SauceSerializer(sauce, many=False)
        return serializer.data

    def get_veggie(self, obj):
        veggie = obj.veggie
        serializer = VeggieSerializer(veggie, many=False)
        return serializer.data


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'name', 'isAdmin']

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_isAdmin(self, obj):
        return obj.is_staff


class MyTokenObtainPairSeriaizer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
