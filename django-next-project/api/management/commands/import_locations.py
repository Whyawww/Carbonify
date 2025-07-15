import csv
from django.core.management.base import BaseCommand, CommandError
from api.models import EcoPoint

class Command(BaseCommand):
    help = 'Imports eco points from a specified CSV file.'

    def add_arguments(self, parser):
        # Menambahkan argumen wajib: path ke file CSV
        parser.add_argument('csv_file', type=str, help='The path to the CSV file to import.')

    def handle(self, *args, **options):
        # Ambil path file dari argumen
        file_path = options['csv_file']
        
        self.stdout.write(self.style.NOTICE(f'Starting to import locations from {file_path}...'))

        try:
            with open(file_path, mode='r', encoding='utf-8') as csvfile:
                # Membaca CSV dengan header
                reader = csv.DictReader(csvfile)
                
                # Hapus semua data lama untuk menghindari duplikat
                self.stdout.write(self.style.WARNING('Deleting all existing eco points...'))
                EcoPoint.objects.all().delete()
                
                count = 0
                for row in reader:
                    # Buat objek EcoPoint untuk setiap baris di CSV
                    EcoPoint.objects.create(
                        name=row['name'],
                        category=row['category'],
                        address=row['address'],
                        latitude=float(row['latitude']),
                        longitude=float(row['longitude'])
                    )
                    count += 1
                
                self.stdout.write(self.style.SUCCESS(f'Successfully imported {count} locations.'))

        except FileNotFoundError:
            raise CommandError(f'File "{file_path}" does not exist.')
        except Exception as e:
            raise CommandError(f'An error occurred: {e}')

