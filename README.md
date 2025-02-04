# Pokémon Explorer
### Deskripsi Proyek
Pokémon Explorer adalah aplikasi web yang memungkinkan pengguna untuk menjelajahi daftar Pokémon dan melihat detail lengkap dari setiap Pokémon. Aplikasi ini dibangun menggunakan Next.js sebagai framework utama dan Material-UI (MUI) untuk komponen UI yang modern dan responsif.

##### Aplikasi ini terdiri dari dua halaman utama:
Halaman Home: Menampilkan daftar Pokémon dalam bentuk grid dengan fitur pencarian.
Halaman Detail Pokémon: Menampilkan detail lengkap dari Pokémon yang dipilih, termasuk gambar, kemampuan, tipe, statistik, tinggi, dan berat.

##### Fitur Utama
###### Daftar Pokémon:
Menampilkan daftar Pokémon dalam grid responsif.
Fitur pencarian untuk memfilter Pokémon berdasarkan nama.

###### Detail Pokémon:
Menampilkan gambar Pokémon (normal, shiny, dan back).
Menampilkan kemampuan, tipe, statistik, tinggi, dan berat Pokémon.
Navigasi ke Pokémon sebelumnya atau berikutnya.

###### Responsive Design:
Aplikasi dapat diakses dengan baik di berbagai perangkat (desktop, tablet, dan mobile).

### Teknologi yang Digunakan
##### Framework dan Library
Next.js
Material-UI (MUI)
Axios
TypeScript

##### Struktur Proyek
Berikut adalah struktur folder utama dari proyek ini:
src/
├── components/
│   ├── home/              # Komponen untuk halaman Home
│   └── pokemon/           # Komponen untuk halaman Detail Pokémon
├── pages/
│   ├── index.tsx          # Halaman Home
│   ├── pokemon/
│   │   └── [id].tsx       # Halaman Detail Pokémon
├── utils/
│   ├── api.ts             # Fungsi untuk fetching data dari PokeAPI
│   └── converters.ts      # Fungsi utilitas untuk konversi unit
├── interfaces/
│   └── PokemonDetail.ts   # Tipe data untuk detail Pokémon
├── styles/
│   └── globals.css        # Gaya global untuk aplikasi


### Pilihan Desain
##### Modularisasi Komponen:
Setiap komponen dipisahkan ke dalam file terpisah untuk meningkatkan reusability dan kemudahan pemeliharaan.
Contoh: PokemonCard, PokemonImage, PokemonStats, dll.

##### TypeScript:
Digunakan untuk memastikan tipe data yang konsisten dan mengurangi bug yang terkait dengan tipe data.

#####  Responsive Design:
Menggunakan sistem grid dari Material-UI untuk membuat layout yang responsif.
Memastikan aplikasi dapat diakses dengan baik di berbagai perangkat.

### Cara Menjalankan Proyek
Clone repositori ini:
```bash
git clone https://github.com/yusufginanjar/pokemon-explorer.git
```
Masuk ke folder proyek:

```bash
cd pokemon-explorer
```
Install dependencies:

```bash
npm install
```
Jalankan aplikasi:
```bash
npm run dev
```
Buka aplikasi di: 
http://localhost:3000
