# Generated by Django 4.0.2 on 2022-02-15 10:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Veggies',
            new_name='Veggie',
        ),
        migrations.RenameField(
            model_name='pizza',
            old_name='veggies',
            new_name='veggie',
        ),
    ]
