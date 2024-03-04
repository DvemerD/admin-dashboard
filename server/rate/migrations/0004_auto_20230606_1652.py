# Generated by Django 3.2.3 on 2023-06-06 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rate', '0003_auto_20230605_1637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rate',
            name='coin_rate',
            field=models.DecimalField(decimal_places=10, max_digits=100),
        ),
        migrations.AlterField(
            model_name='rate',
            name='dollar_rate',
            field=models.DecimalField(decimal_places=10, max_digits=100),
        ),
        migrations.AlterField(
            model_name='usdtoczk',
            name='czk_rate',
            field=models.DecimalField(decimal_places=10, max_digits=10),
        ),
    ]