from django.urls import path
from base.views import app_views

urlpatterns = [
    path('', app_views.getPizzas, name='pizzas'),
    path('orders/', app_views.getOrders, name='orders'),
    path('pizza/ingredients/', app_views.getIngredients, name='ingredients'),
    path('pizza/make/', app_views.makePizza, name='make-pizza'),
    path('payment/success/', app_views.handle_payment_success,
         name="payment_success"),
    path('orders/add/', app_views.addOrderItems, name='order-add'),
    path('orders/myorders/', app_views.getMyOrders, name='my-orders'),
    path('orders/<str:pk>/', app_views.getOrderById, name='user-order'),
    path('orders/<str:pk>/changestatus/',
         app_views.changeOderStatus, name='order-status'),
    path('pizza/<str:pk>/', app_views.getPizza, name='get-pizza'),
    path('pizzas/<str:pk>/reviews/',
         app_views.createPizzaReview, name='create-review'),

]
