# Generated by Django 4.0.2 on 2022-02-20 19:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_order_orderpayment_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='orderPayment_Id',
            new_name='orderPaymentId',
        ),
    ]
