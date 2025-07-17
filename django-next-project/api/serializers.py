from rest_framework import serializers
from .models import Action, EcoPoint, FaktorEmisiListrik, FaktorEmisiTransportasi, FaktorEmisiMakanan

# Serializer untuk daftar singkat Aksi
class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'emoji', 'title', 'description', 'category']

# Serializer untuk halaman detail Aksi
class ActionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        # PERBAIKAN: Tambahkan semua field baru untuk halaman detail
        fields = [
            'id', 'emoji', 'title', 'description', 'category', 'content', 
            'impact_level', 'effort_level', 'image_url', 'related_links'
        ]

# Serializer lainnya (tidak berubah)
class EcoPointSerializer(serializers.ModelSerializer):
    position = serializers.SerializerMethodField()
    # Tambahkan required=False agar lebih aman jika jarak tidak dihitung
    distance = serializers.FloatField(read_only=True, required=False) 

    class Meta:
        model = EcoPoint
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
