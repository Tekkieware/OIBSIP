
from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model
from django.db.models.fields.related import OneToOneField

# Create your models here.


class Crust(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.jpg')

    def __str__(self):
        return self.name


class Sauce(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.jpg')

    def __str__(self):
        return self.name


class Cheese(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.jpg')

    def __str__(self):
        return self.name


class Veggie(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.jpg')

    def __str__(self):
        return self.name


class Pizza(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    crust = models.ForeignKey(
        Crust, on_delete=models.SET_NULL, null=True)
    sauce = models.ForeignKey(
        Sauce, on_delete=models.SET_NULL, null=True)
    cheese = models.ForeignKey(
        Cheese, on_delete=models.SET_NULL, null=True)
    veggie = models.ForeignKey(
        Veggie, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.jpg')
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    pizza = models.ForeignKey(Pizza, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    status = models.CharField(
        max_length=200, null=True, blank=True, default='Pending')
    orderPaymentId = models.CharField(max_length=100, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return str(self.isPaid)


class OrderItem(models.Model):
    pizza = models.ForeignKey(Pizza, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return str(self.address)
