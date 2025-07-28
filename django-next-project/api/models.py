from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from ckeditor.fields import RichTextField

# Model yang sudah ada untuk Aksi dan Peta (biarkan saja)
class Action(models.Model):
    CATEGORY_CHOICES = [
        ('Listrik', 'Listrik'),
        ('Transportasi', 'Transportasi'),
        ('Konsumsi', 'Konsumsi'),
        ('Bahan Bakar', 'Bahan Bakar'),
        ('Umum', 'Umum'),
    ]
    IMPACT_CHOICES = [
        ('Tinggi', 'Tinggi'),
        ('Sedang', 'Sedang'),
        ('Rendah', 'Rendah'),
    ]
    EFFORT_CHOICES = [
        ('Mudah', 'Mudah'),
        ('Sedang', 'Sedang'),
        ('Sulit', 'Sulit'),
    ]
    
    emoji = models.CharField(max_length=5)
    title = models.CharField(max_length=100)
    description = models.TextField(help_text="Deskripsi singkat yang muncul di kartu.")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Umum')
    content = RichTextField(blank=True, null=True, help_text="Konten detail seperti langkah-langkah, penjelasan mendalam, dll.")

    # --- FIELD BARU UNTUK INFORMASI DETAIL ---
    impact_level = models.CharField(max_length=10, choices=IMPACT_CHOICES, default='Sedang')
    effort_level = models.CharField(max_length=10, choices=EFFORT_CHOICES, default='Sedang')
    image = models.ImageField(
        upload_to='aksi/',  # Gambar akan disimpan di folder 'media/aksi/'
        blank=True, 
        null=True, 
        help_text="Upload gambar yang relevan dengan aksi ini."
    )
    related_links = models.TextField(blank=True, null=True, help_text="Satu URL per baris untuk sumber atau bacaan lebih lanjut.")

    def __str__(self):
        return f"{self.title} ({self.category})"

    class Meta:
        ordering = ['id']
        verbose_name = "Aksi Nyata"
        verbose_name_plural = "Daftar Aksi Nyata"

class EcoPoint(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['id']
        verbose_name = "Titik Lestari"
        verbose_name_plural = "Daftar Titik Lestari"

# --- MODEL BARU UNTUK FAKTOR EMISI ---

class FaktorEmisiListrik(models.Model):
    """
    Menyimpan faktor emisi listrik per provinsi atau per jaringan listrik.
    """
    provinsi = models.CharField(max_length=100, unique=True, help_text="Nama Provinsi atau Jaringan Listrik")
    faktor = models.FloatField(help_text="Faktor emisi dalam kg CO2e per kWh")

    def __str__(self):
        return self.provinsi
    
    class Meta:
        verbose_name = "Faktor Emisi Listrik"
        verbose_name_plural = "Faktor Emisi Listrik"


class FaktorEmisiTransportasi(models.Model):
    """
    Menyimpan faktor emisi per km untuk berbagai jenis kendaraan.
    """
    jenis_kendaraan = models.CharField(max_length=100, unique=True)
    faktor = models.FloatField(help_text="Faktor emisi dalam kg CO2e per km")

    def __str__(self):
        return self.jenis_kendaraan

    class Meta:
        verbose_name = "Faktor Emisi Transportasi"
        verbose_name_plural = "Faktor Emisi Transportasi"

class FaktorEmisiMakanan(models.Model):
    """
    Menyimpan faktor emisi per porsi untuk berbagai jenis makanan.
    """
    jenis_makanan = models.CharField(max_length=100, unique=True)
    faktor = models.FloatField(help_text="Faktor emisi dalam kg CO2e per porsi/kg")

    def __str__(self):
        return self.jenis_makanan

    class Meta:
        verbose_name = "Faktor Emisi Makanan"
        verbose_name_plural = "Faktor Emisi Makanan"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    score = models.IntegerField(default=0)
    badges = models.JSONField(default=list)
    completed_challenges = models.JSONField(default=list) 
    avatar_url = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

# Sinyal untuk otomatis membuat UserProfile saat User baru dibuat
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    # Cek apakah profil sudah ada sebelum mencoba menyimpannya
    if hasattr(instance, 'profile'):
        instance.profile.save()

class FaktorEmisiBahanBakar(models.Model):
    jenis_bahan_bakar = models.CharField(max_length=100, unique=True)
    faktor = models.FloatField(help_text='Faktor emisi dalam kg CO2e per liter')

    def __str__(self):
        return self.jenis_bahan_bakar
    
    class Meta:
        verbose_name = "Faktor Emisi Bahan Bakar"
        verbose_name_plural = "Faktor Emisi Bahan Bakar"