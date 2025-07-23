from rest_framework import serializers
from .models import Action, EcoPoint, FaktorEmisiBahanBakar, FaktorEmisiListrik, FaktorEmisiTransportasi, FaktorEmisiMakanan, UserProfile

# Serializer untuk daftar singkat Aksi
class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'emoji', 'title', 'description', 'category']

# Serializer untuk halaman detail Aksi
class ActionDetailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Action
        fields = [
            'id', 'emoji', 'title', 'description', 'category', 'content', 
            'impact_level', 'effort_level', 'image', 'related_links'
        ]
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            else:
                # Fallback untuk development
                return f"http://127.0.0.1:8000{obj.image.url}"
        return None

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

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['score', 'badges', 'completed_challenges']

class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    class Meta:
        model = UserProfile
        fields = ['username', 'score']

class FaktorEmisiBahanBakarSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaktorEmisiBahanBakar
        fields = ['id', 'jenis_bahan_bakar']