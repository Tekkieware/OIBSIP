# Generated by Django 4.0.2 on 2022-02-21 11:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_rename_orderpayment_id_order_orderpaymentid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='createdAt',
        ),
    ]
