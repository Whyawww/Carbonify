from django.db import migrations

def seed_data(apps, schema_editor):
    """
    Fungsi untuk mengisi database dengan data awal.
    """
    # Ambil model yang diperlukan
    Action = apps.get_model('api', 'Action')
    EcoPoint = apps.get_model('api', 'EcoPoint')
    FaktorEmisiListrik = apps.get_model('api', 'FaktorEmisiListrik')
    FaktorEmisiTransportasi = apps.get_model('api', 'FaktorEmisiTransportasi')
    FaktorEmisiMakanan = apps.get_model('api', 'FaktorEmisiMakanan')

    # Hapus data lama untuk menghindari duplikat jika migrasi dijalankan ulang
    Action.objects.all().delete()
    EcoPoint.objects.all().delete()
    FaktorEmisiListrik.objects.all().delete()
    FaktorEmisiTransportasi.objects.all().delete()
    FaktorEmisiMakanan.objects.all().delete()

    # --- DATA AKSI NYATA ---
    actions_data = [
        {'emoji': '♻️', 'title': 'Pilahlah Sampah', 'description': 'Pisahkan sampah organik, anorganik, dan B3 untuk memudahkan proses daur ulang dan mengurangi volume sampah di TPA.'},
        {'emoji': '💧', 'title': 'Gunakan Botol Minum Isi Ulang', 'description': 'Hindari membeli air minum kemasan sekali pakai. Satu botol plastik membutuhkan ratusan tahun untuk terurai.'},
        {'emoji': '💡', 'title': 'Matikan Listrik Jika Tidak Digunakan', 'description': 'Cabut charger dan matikan lampu atau peralatan elektronik lainnya saat tidak dipakai untuk menghemat energi.'},
        {'emoji': '🛍️', 'title': 'Bawa Tas Belanja Sendiri', 'description': 'Tolak kantong plastik sekali pakai saat berbelanja. Gunakan tas kain yang bisa dipakai berulang kali.'},
        {'emoji': '🚲', 'title': 'Gunakan Transportasi Publik atau Bersepeda', 'description': 'Kurangi penggunaan kendaraan pribadi untuk menekan emisi gas rumah kaca dari sektor transportasi.'},
        {'emoji': '🥩', 'title': 'Kurangi Konsumsi Daging Merah', 'description': 'Industri peternakan adalah salah satu penyumbang emisi gas metana terbesar. Coba ganti dengan protein nabati.'},
    ]
    for data in actions_data:
        Action.objects.create(**data)

    # --- DATA PETA LOKAL ---
    eco_points_data = [
        {'name': 'Bank Sampah Melati Bersih', 'category': 'Bank Sampah', 'address': 'Jl. Mawar No. 12, Jakarta Selatan', 'latitude': -6.28, 'longitude': 106.80},
        {'name': 'Naked Inc. Bulk Store', 'category': 'Bulk Store / Zero Waste', 'address': 'Jl. Kemang Raya No. 3, Jakarta Selatan', 'latitude': -6.26, 'longitude': 106.81},
        {'name': 'Setali Indonesia', 'category': 'Thrift Store / Pakaian Bekas', 'address': 'Jl. Radio Dalam No. 14, Jakarta Selatan', 'latitude': -6.25, 'longitude': 106.78},
        {'name': 'Kebun Kumara', 'category': 'Komunitas / Edukasi', 'address': 'Jl. Cilandak KKO No. 1, Jakarta Selatan', 'latitude': -6.30, 'longitude': 106.81},
    ]
    for data in eco_points_data:
        EcoPoint.objects.create(**data)

    # --- DATA FAKTOR EMISI ---
    FaktorEmisiListrik.objects.create(provinsi='Jawa-Madura-Bali', faktor=0.735)
    FaktorEmisiListrik.objects.create(provinsi='Sumatera', faktor=0.650)
    FaktorEmisiListrik.objects.create(provinsi='Kalimantan', faktor=0.810)
    FaktorEmisiListrik.objects.create(provinsi='Sulawesi', faktor=0.550)
    FaktorEmisiListrik.objects.create(provinsi='Papua & Maluku', faktor=0.780)

    FaktorEmisiTransportasi.objects.create(jenis_kendaraan='Motor Matic (125cc)', faktor=0.05)
    FaktorEmisiTransportasi.objects.create(jenis_kendaraan='Mobil LCGC', faktor=0.12)
    FaktorEmisiTransportasi.objects.create(jenis_kendaraan='Mobil SUV Bensin', faktor=0.19)
    FaktorEmisiTransportasi.objects.create(jenis_kendaraan='Mobil SUV Diesel', faktor=0.17)
    FaktorEmisiTransportasi.objects.create(jenis_kendaraan='Bus Umum', faktor=0.03)

    FaktorEmisiMakanan.objects.create(jenis_makanan='Daging Sapi (per kg)', faktor=27.0)
    FaktorEmisiMakanan.objects.create(jenis_makanan='Daging Kambing (per kg)', faktor=39.2)
    FaktorEmisiMakanan.objects.create(jenis_makanan='Daging Ayam (per kg)', faktor=6.9)
    FaktorEmisiMakanan.objects.create(jenis_makanan='Ikan (per kg)', faktor=6.1)
    FaktorEmisiMakanan.objects.create(jenis_makanan='Tahu/Tempe (per kg)', faktor=2.0)
    FaktorEmisiMakanan.objects.create(jenis_makanan='Sayuran (per kg)', faktor=2.0)


class Migration(migrations.Migration):

    dependencies = [
        # GANTI NAMA FILE DI BAWAH INI DENGAN NAMA FILE 0002_ ANDA
        ('api', '0002_faktoremisilistrik_faktoremisimakanan_and_more'), 
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
