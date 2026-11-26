// NusaStat data — every figure carries its source and year, shown on the site
// next to the number. National figures are World Bank World Development
// Indicators 2024 and Statistics Indonesia (BPS) releases unless noted.
// Figures are rounded for display; the site states the rounding in its notes.

export const SITE = {
  name: 'NusaStat',
  tagline: 'Portal Statistik Nasional Indonesia',
  country: 'Indonesia',
  updated: '26 November 2026',
  note: 'Angka dibulatkan untuk tampilan. Sumber dan tahun setiap indikator tercantum di samping angka dan di halaman Sumber & Metodologi.',
};

// Headline indicators shown on the home page.
export const HEADLINE = [
  { id: 'populasi', label: 'Penduduk', value: '283,5 jt', detail: 'jiwa, 2024', change: '+0,8% per tahun', source: 'World Bank WDI 2024' },
  { id: 'pdb', label: 'PDB', value: 'US$ 1,40 tn', detail: 'harga berlaku, 2024', change: 'peringkat ke-16 dunia', source: 'World Bank WDI 2024' },
  { id: 'pdb-kapita', label: 'PDB per kapita', value: 'US$ 4.925', detail: 'harga berlaku, 2024', change: '+1,0% dari 2023', source: 'World Bank WDI 2024' },
  { id: 'pertumbuhan', label: 'Pertumbuhan ekonomi', value: '5,03%', detail: '2024 (y-on-y)', change: 'stabil di atas 5%', source: 'BPS, Feb 2025' },
  { id: 'inflasi', label: 'Inflasi', value: '1,57%', detail: 'Des 2024 (y-on-y)', change: 'terendah sejak 2020', source: 'BPS, Jan 2025' },
  { id: 'pengangguran', label: 'Pengangguran terbuka', value: '4,91%', detail: 'Agu 2024', change: 'turun dari 5,32% (2023)', source: 'BPS, Nov 2024' },
  { id: 'kemiskinan', label: 'Kemiskinan', value: '8,57%', detail: 'Sep 2024', change: '24,06 jt jiwa · terendah sepanjang sejarah pencatatan', source: 'BPS, Jan 2025' },
  { id: 'ipm', label: 'Indeks Pembangunan Manusia', value: '75,02', detail: '2024', change: 'kategori tinggi', source: 'BPS, 2024' },
];

// Annual series, 2015–2024.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const SERIES = {
  // Pertumbuhan PDB riil, % per tahun (BPS).
  pertumbuhanPdb: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03],
  // Penduduk, juta jiwa (World Bank WDI).
  penduduk: [258.4, 261.1, 264.0, 266.9, 269.6, 272.2, 275.0, 277.9, 281.2, 283.5],
  // Inflasi Desember y-on-y, % (BPS).
  inflasi: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  // Tingkat pengangguran terbuka Agustus, % (BPS).
  pengangguran: [6.18, 5.61, 5.5, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91],
  // Persentase penduduk miskin September, % (BPS).
  kemiskinan: [11.13, 10.7, 10.12, 9.66, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
};

// Struktur umur 2024, % penduduk (World Bank WDI 2024).
export const AGE_BANDS = [
  { band: '0–14 tahun', share: 24.6, note: 'Anak-anak' },
  { band: '15–64 tahun', share: 68.1, note: 'Usia kerja' },
  { band: '65 tahun ke atas', share: 7.3, note: 'Lansia' },
];

// PDB menurut lapangan usaha, % terhadap PDB 2023 (BPS, dibulatkan).
export const SECTORS = [
  { sector: 'Industri pengolahan', share: 18.7 },
  { sector: 'Perdagangan besar & eceran', share: 12.9 },
  { sector: 'Pertanian, kehutanan & perikanan', share: 12.5 },
  { sector: 'Pertambangan & penggalian', share: 10.5 },
  { sector: 'Konstruksi', share: 9.9 },
  { sector: 'Administrasi pemerintahan', share: 7.0 },
  { sector: 'Transportasi & pergudangan', share: 3.9 },
  { sector: 'Informasi & komunikasi', share: 4.4 },
  { sector: 'Jasa keuangan & asuransi', share: 4.2 },
  { sector: 'Lapangan usaha lainnya', share: 16.0 },
];

// Sepuluh provinsi berpenduduk terbanyak, estimasi pertengahan tahun 2024 (BPS).
// Luas dalam km² (BPS); kepadatan dihitung dari keduanya.
export const PROVINCES = [
  { slug: 'jawa-barat', name: 'Jawa Barat', pop: 50.35, area: 35378, capital: 'Bandung', islands: 'Jawa' },
  { slug: 'jawa-timur', name: 'Jawa Timur', pop: 41.81, area: 47803, capital: 'Surabaya', islands: 'Jawa' },
  { slug: 'jawa-tengah', name: 'Jawa Tengah', pop: 37.89, area: 32801, capital: 'Semarang', islands: 'Jawa' },
  { slug: 'sumatera-utara', name: 'Sumatera Utara', pop: 15.59, area: 72981, capital: 'Medan', islands: 'Sumatera' },
  { slug: 'banten', name: 'Banten', pop: 12.43, area: 9663, capital: 'Serang', islands: 'Jawa' },
  { slug: 'dki-jakarta', name: 'DKI Jakarta', pop: 10.68, area: 664, capital: 'Jakarta', islands: 'Jawa' },
  { slug: 'sulawesi-selatan', name: 'Sulawesi Selatan', pop: 9.41, area: 46717, capital: 'Makassar', islands: 'Sulawesi' },
  { slug: 'lampung', name: 'Lampung', pop: 9.28, area: 34624, capital: 'Bandar Lampung', islands: 'Sumatera' },
  { slug: 'sumatera-selatan', name: 'Sumatera Selatan', pop: 8.84, area: 91592, capital: 'Palembang', islands: 'Sumatera' },
  { slug: 'riau', name: 'Riau', pop: 6.91, area: 87024, capital: 'Pekanbaru', islands: 'Sumatera' },
];

// Perdagangan luar negeri 2024 (BPS; barang, FOB).
export const TRADE = {
  exports: 264.7,
  imports: 233.7,
  surplus: 31.0,
  topExports: [
    { product: 'Bahan bakar mineral', share: 20.8 },
    { product: 'Lemak & minyak nabati', share: 11.7 },
    { product: 'Besi & baja', share: 8.6 },
  ],
  topImports: [
    { product: 'Bahan bakar mineral', share: 17.4 },
    { product: 'Mesin & peralatan mekanik', share: 14.3 },
    { product: 'Mesin & peralatan listrik', share: 11.6 },
  ],
};

// Perbandingan dengan negara ASEAN, 2024 (World Bank WDI).
export const PEERS = [
  { country: 'Indonesia', pop: 283.5, gdpCap: 4925, life: 71.3, growth: 5.0 },
  { country: 'Vietnam', pop: 101.0, gdpCap: 4806, life: 75.4, growth: 7.1 },
  { country: 'Filipina', pop: 114.9, gdpCap: 3996, life: 72.8, growth: 5.7 },
  { country: 'Thailand', pop: 71.7, gdpCap: 7545, life: 76.4, growth: 2.5 },
  { country: 'Malaysia', pop: 34.1, gdpCap: 13132, life: 76.8, growth: 5.1 },
  { country: 'Singapura', pop: 6.0, gdpCap: 90674, life: 84.1, growth: 4.4 },
];

// Rilis BPS terbaru yang dipakai situs ini.
export const RELEASES = [
  { date: '5 Feb 2025', title: 'Pertumbuhan ekonomi 2024 mencapai 5,03%', body: 'PDB harga berlaku Rp22.138,9 triliun; PDB per kapita Rp78,6 juta.' },
  { date: '15 Jan 2025', title: 'Kemiskinan September 2024: 8,57%', body: 'Jumlah penduduk miskin 24,06 juta jiwa; garis kemiskinan Rp595.242 per kapita per bulan.' },
  { date: '2 Jan 2025', title: 'Inflasi Desember 2024: 1,57% (y-on-y)', body: 'Inflasi tahun kalender 2024 sebesar 1,57%, terendah dalam lima tahun terakhir.' },
  { date: '5 Nov 2024', title: 'Pengangguran Agustus 2024: 4,91%', body: 'Angkatan kerja 147,1 juta orang; 144,64 juta orang bekerja.' },
  { date: '15 Nov 2024', title: 'IPM 2024 mencapai 75,02', body: 'Harapan lama sekolah 13,41 tahun; rata-rata lama sekolah 9,05 tahun.' },
  { date: '15 Jan 2025', title: 'Ekspor 2024: US$ 264,7 miliar', body: 'Neraca perdagangan barang surplus US$ 31,0 miliar sepanjang 2024.' },
];

// Semua indikator dalam satu tabel yang bisa dicari (halaman Indikator).
export const INDICATORS = [
  { name: 'Jumlah penduduk', value: '283,5 juta jiwa', year: 2024, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Laju pertumbuhan penduduk', value: '0,8% per tahun', year: 2024, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Kepadatan penduduk', value: '149 jiwa/km²', year: 2024, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Penduduk perkotaan', value: '58,8%', year: 2024, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Penduduk usia 0–14 tahun', value: '24,6%', year: 2024, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Penduduk usia 65 tahun ke atas', value: '7,3%', year: 2024, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Angka kelahiran total', value: '2,1 anak per perempuan', year: 2023, category: 'Penduduk', source: 'World Bank WDI' },
  { name: 'Harapan hidup saat lahir', value: '71,3 tahun', year: 2024, category: 'Kesehatan', source: 'World Bank WDI' },
  { name: 'Harapan hidup perempuan', value: '73,4 tahun', year: 2024, category: 'Kesehatan', source: 'World Bank WDI' },
  { name: 'Harapan hidup laki-laki', value: '69,2 tahun', year: 2024, category: 'Kesehatan', source: 'World Bank WDI' },
  { name: 'PDB harga berlaku', value: 'US$ 1,40 triliun', year: 2024, category: 'Ekonomi', source: 'World Bank WDI' },
  { name: 'PDB (PPP)', value: 'US$ 4,10 triliun', year: 2024, category: 'Ekonomi', source: 'IMF WEO / CIA World Factbook' },
  { name: 'PDB per kapita', value: 'US$ 4.925', year: 2024, category: 'Ekonomi', source: 'World Bank WDI' },
  { name: 'Pertumbuhan PDB riil', value: '5,03%', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Inflasi (Desember, y-on-y)', value: '1,57%', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Tingkat pengangguran terbuka', value: '4,91%', year: 2024, category: 'Ketenagakerjaan', source: 'BPS' },
  { name: 'Angkatan kerja', value: '147,1 juta orang', year: 2024, category: 'Ketenagakerjaan', source: 'BPS' },
  { name: 'Investasi asing langsung (masuk)', value: 'US$ 24,2 miliar', year: 2024, category: 'Ekonomi', source: 'World Bank WDI' },
  { name: 'Ekspor barang', value: 'US$ 264,7 miliar', year: 2024, category: 'Perdagangan', source: 'BPS' },
  { name: 'Impor barang', value: 'US$ 233,7 miliar', year: 2024, category: 'Perdagangan', source: 'BPS' },
  { name: 'Surplus perdagangan barang', value: 'US$ 31,0 miliar', year: 2024, category: 'Perdagangan', source: 'BPS' },
  { name: 'Defisit transaksi berjalan', value: 'US$ 8,9 miliar (0,6% PDB)', year: 2024, category: 'Perdagangan', source: 'Bank Indonesia / IMF' },
  { name: 'Utang pemerintah', value: '38,7% PDB', year: 2024, category: 'Keuangan', source: 'IMF / Kementerian Keuangan' },
  { name: 'Persentase penduduk miskin', value: '8,57%', year: 2024, category: 'Kesejahteraan', source: 'BPS' },
  { name: 'Jumlah penduduk miskin', value: '24,06 juta jiwa', year: 2024, category: 'Kesejahteraan', source: 'BPS' },
  { name: 'Garis kemiskinan', value: 'Rp595.242 per kapita/bulan', year: 2024, category: 'Kesejahteraan', source: 'BPS' },
  { name: 'Indeks Pembangunan Manusia', value: '75,02', year: 2024, category: 'Kesejahteraan', source: 'BPS' },
  { name: 'Harapan lama sekolah', value: '13,41 tahun', year: 2024, category: 'Pendidikan', source: 'BPS' },
  { name: 'Rata-rata lama sekolah', value: '9,05 tahun', year: 2024, category: 'Pendidikan', source: 'BPS' },
  { name: 'Jumlah provinsi', value: '38 provinsi', year: 2024, category: 'Wilayah', source: 'Kemendagri / BPS' },
  { name: 'Jumlah kabupaten/kota', value: '514 kabupaten/kota', year: 2024, category: 'Wilayah', source: 'Kemendagri / BPS' },
  { name: 'Luas daratan', value: '1,89 juta km²', year: 2024, category: 'Wilayah', source: 'World Bank WDI' },
];

// Sumber-sumber yang dipakai, untuk halaman Sumber & Metodologi.
export const SOURCES = [
  { name: 'Badan Pusat Statistik (BPS)', what: 'Pertumbuhan ekonomi, inflasi, pengangguran, kemiskinan, IPM, perdagangan, penduduk provinsi.', url: 'bps.go.id' },
  { name: 'World Bank — World Development Indicators', what: 'Penduduk, PDB, PDB per kapita, harapan hidup, struktur umur, FDI, perbandingan antarnegara.', url: 'data.worldbank.org' },
  { name: 'IMF — World Economic Outlook', what: 'PDB (PPP), utang pemerintah, proyeksi pertumbuhan.', url: 'imf.org' },
  { name: 'Bank Indonesia', what: 'Transaksi berjalan, cadangan devisa.', url: 'bi.go.id' },
  { name: 'Kementerian Dalam Negeri', what: 'Jumlah provinsi dan kabupaten/kota.', url: 'kemendagri.go.id' },
];
