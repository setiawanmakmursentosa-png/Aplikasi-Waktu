# Jejak Foto — GitHub + Netlify

Aplikasi kamera web statis. Tidak memerlukan proses build atau Claude API.

## Pasang melalui GitHub
1. Ekstrak ZIP ini, lalu unggah folder dist dan netlify.toml ke repository GitHub Anda.
2. Di Netlify pilih Add new project / Import an existing project, lalu hubungkan GitHub.
3. Pilih repository tersebut. Build command: kosong. Publish directory: dist.
4. Deploy, lalu buka URL HTTPS melalui Safari iPhone.
5. Izinkan kamera dan lokasi. Izin terikat domain/browser dan dapat ditanyakan lagi.

## Alternatif tanpa GitHub
Ekstrak ZIP. Unggah folder dist ke Netlify Drop (bukan seluruh folder proyek).

## Menyimpan foto di iPhone
Ambil foto, tekan Simpan / Bagikan, lalu pilih Simpan Gambar atau Simpan ke File.
Alternatif: Unduh JPEG. Jika browser di dalam aplikasi membatasi, buka situs di Safari.
Tekan lama foto hasil untuk menyimpan atau buka foto ukuran penuh.
Aplikasi tidak dapat memastikan apakah pengguna menyelesaikan penyimpanan dari menu iOS.

## Data dan lokasi
Galeri disimpan dalam IndexedDB browser pada perangkat/domain ini. Unduh foto penting sebelum berpindah domain; galeri tidak ikut pindah otomatis.
ID foto dibuat lokal dari waktu dan nilai acak, bukan ID GPS dan bukan bukti verifikasi keaslian.
Koordinat dari perangkat; alamat dari OpenStreetMap Nominatim dan memerlukan internet. Koordinat dikirim ke layanan pencarian alamat tersebut. Akurasi bergantung perangkat dan kondisi lokasi.
Tanpa backend akun atau sinkronisasi antarperangkat. Pengunjung domain publik dapat membuka aplikasi, tetapi galeri tiap browser tetap terpisah.

## Pemeriksaan
Sintaks JavaScript serta logika ID, GPS kedaluwarsa, pencahayaan, dan jalur simpan telah diperiksa dengan pengujian terisolasi. Kamera/GPS dan penyimpanan nyata di iPhone belum diverifikasi.
