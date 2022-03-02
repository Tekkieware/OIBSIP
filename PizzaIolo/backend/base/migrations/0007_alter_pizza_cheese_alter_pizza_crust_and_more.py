# Generated by Django 4.0.2 on 2022-02-17 16:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_cheese_image_crust_image_sauce_image_veggie_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizza',
            name='cheese',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.cheese'),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='crust',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.crust'),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='sauce',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.sauce'),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='veggie',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.veggie'),
        ),
    ]