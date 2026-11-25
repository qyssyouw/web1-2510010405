
 // =========================================================
 // katalog.js - Modul 3: menampilkan katalog dengan DOM
 // Praktikum Pemrograman Web 1 - Sasirangan Banua
 // =========================================================

// 1. Data katalog sekarang diambil dari file JSON.
// dibantu AI
let katalog = [];

 // 2. Mengambil elemen HTML
 const daftarKatalog = document.querySelector("#daftar-katalog");
 const inputCari = document.querySelector("#cari");
 const tombolFilter = document.querySelectorAll(".tombol-filter");
 const infoJumlah = document.querySelector("#info-jumlah");

 // 3. Status kategori yang aktif
 let kategoriAktif = "semua";

 // 4. Fungsi mengubah angka menjadi format Rupiah
 function formatRupiah(angka) {
     return new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 0,
     }).format(angka);
 }

 // 5. Membuat kartu untuk setiap produk
 function buatKartu(produk) {

     const kartu = document.createElement("article");
     kartu.className = "kartu";

     const gambar = document.createElement("img");
     gambar.src = produk.gambar;
     gambar.alt = produk.nama;
     gambar.width = 600;
     gambar.height = 400;
     gambar.loading = "lazy";

     const isi = document.createElement("div");
     isi.className = "kartu-isi";

     const label = document.createElement("span");
     label.className = "label-kategori";
     label.textContent = produk.kategori;

     const judul = document.createElement("h3");
     judul.textContent = produk.nama;

     const deskripsi = document.createElement("p");
     deskripsi.textContent = produk.deskripsi;

     const harga = document.createElement("p");
     harga.className = "harga";
     harga.textContent = formatRupiah(produk.harga);

     isi.append(label, judul, deskripsi, harga);
     kartu.append(gambar, isi);

     return kartu;
 }

 // 6. Menampilkan katalog produk
 function tampilkanKatalog(daftarProduk) {

     daftarKatalog.replaceChildren();

     if (daftarProduk.length === 0) {
         const kosong = document.createElement("p");

         kosong.textContent =
             "Produk tidak ditemukan. Coba kata kunci lain.";

         daftarKatalog.append(kosong);
     }

     daftarProduk.forEach((produk) => {
         daftarKatalog.append(buatKartu(produk));
     });

     infoJumlah.textContent =
         `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`;
 }

 // 7. Menyaring katalog berdasarkan kata kunci dan kategori
 function saringKatalog() {

     const kataKunci = inputCari.value.trim().toLowerCase();

     const hasil = katalog.filter((produk) => {

         const cocokKategori =
             kategoriAktif === "semua" ||
             produk.kategori === kategoriAktif;

         const cocokKata =
             produk.nama.toLowerCase().includes(kataKunci) ||
             produk.deskripsi.toLowerCase().includes(kataKunci);

         return cocokKategori && cocokKata;
     });

     tampilkanKatalog(hasil);
 }

 // 8. Event ketika pengguna mengetik
 inputCari.addEventListener("input", saringKatalog);

 // 9. Event klik tombol filter kategori
 tombolFilter.forEach((tombol) => {

     tombol.addEventListener("click", () => {

         kategoriAktif = tombol.dataset.kategori;

         tombolFilter.forEach((t) => {
             t.classList.remove("aktif");
             t.setAttribute("aria-pressed", "false");
         });

         tombol.classList.add("aktif");
         tombol.setAttribute("aria-pressed", "true");

         saringKatalog();
     });

 });


 // 10. Memuat data katalog dari file JSON secara asinkron
 // dibantu AI
 async function muatKatalog() {

     infoJumlah.textContent = "Memuat katalog...";

     try {

        const respons = await fetch("data/katalog.json");

         if (!respons.ok) {
             throw new Error(
                 `Gagal memuat katalog (HTTP ${respons.status})`
             );
         }

         const data = await respons.json();

         katalog = data;

         tampilkanKatalog(katalog);

     } catch (galat) {

         console.error(galat);

         infoJumlah.textContent =
             "Maaf, katalog gagal dimuat. Periksa koneksi Anda lalu muat ulang halaman.";

     }
 }

 // Menjalankan fungsi muat katalog
 muatKatalog();
