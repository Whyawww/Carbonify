# Generated by Django 5.2.4 on 2025-07-23 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_faktoremisibahanbakar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='category',
            field=models.CharField(choices=[('Listrik', 'Listrik'), ('Transportasi', 'Transportasi'), ('Konsumsi', 'Konsumsi'), ('Bahan Bakar', 'Bahan Bakar'), ('Umum', 'Umum')], default='Umum', max_length=20),
        ),
    ]
