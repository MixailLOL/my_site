# Generated by Django 3.2.8 on 2021-10-31 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='image',
            field=models.ImageField(default=0, upload_to='images'),
            preserve_default=False,
        ),
    ]
