# Generated by Django 4.0.2 on 2022-02-20 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_pizza_cheese_alter_pizza_crust_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='orderPayment_Id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
