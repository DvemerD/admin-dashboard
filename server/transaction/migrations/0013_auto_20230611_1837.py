# Generated by Django 3.2.3 on 2023-06-11 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0012_alter_transactionrequest_bought_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transactionrequest',
            name='bought_amount',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='coin_rate',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='dollar_rate',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='market_rate',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='sold_amount',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='transaction_rate',
            field=models.FloatField(),
        ),
    ]
