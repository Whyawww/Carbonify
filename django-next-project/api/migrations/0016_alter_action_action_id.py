# Generated by Django 5.2.4 on 2025-07-29 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_action_action_id_action_points'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='action_id',
            field=models.CharField(help_text='ID unik untuk tantangan, cth: wc01', max_length=20, unique=True),
        ),
    ]
