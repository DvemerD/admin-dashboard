# Generated by Django 3.2.3 on 2023-05-29 07:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0004_alter_transactionrequest_transaction_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transactionrequest',
            name='transaction_id',
        ),
    ]
