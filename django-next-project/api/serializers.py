# api/serializers.py

from rest_framework import serializers
from .models import Action, EcoPoint
from .models import Action, EcoPoint, FaktorEmisiListrik, FaktorEmisiTransportasi, FaktorEmisiMakanan

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        # Tentukan field yang akan dikirim ke frontend
        fields = ['id', 'emoji', 'title', 'description']


class EcoPointSerializer(serializers.ModelSerializer):
    position = serializers.SerializerMethodField()
    # Tambahkan field 'distance'
    distance = serializers.FloatField(read_only=True) 

    class Meta:
        model = EcoPoint
        # Tambahkan 'distance' ke fields
        fields = ['id', 'name', 'category', 'address', 'position', 'distance']

    def get_position(self, obj):
        return [obj.latitude, obj.longitude]
    

class FaktorEmisiListrikSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaktorEmisiListrik
        fields = ['id', 'provinsi']

class FaktorEmisiTransportasiSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaktorEmisiTransportasi
        fields = ['id', 'jenis_kendaraan']

class FaktorEmisiMakananSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaktorEmisiMakanan
        fields = ['id', 'jenis_makanan']
