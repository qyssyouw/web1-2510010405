
 // =========================================================
 // katalog.js - Modul 3: menampilkan katalog dengan DOM
 // Praktikum Pemrograman Web 1 - Sasirangan Banua
 // =========================================================

 // 1. Data katalog dalam bentuk array objek
 const katalog = [
     {
         id: 1,
         nama: "Kain Motif Gigi Haruan",
         kategori: "kain",
         harga: 185000,
         gambar: "img/gigi-haruan.svg",
         deskripsi: "Kain katun dengan motif zig-zag khas Banjar."
     },
     {
         id: 2,
         nama: "Kain Motif Kambang Kacang",
         kategori: "kain",
         harga: 175000,
         gambar: "img/kambang-kacang.svg",
         deskripsi: "Motif bunga yang melambangkan keakraban."
     },
     {
         id: 3,
         nama: "Selendang Iris Pudak",
         kategori: "aksesoris",
         harga: 120000,
         gambar: "img/iris-pudak.svg",
         deskripsi: "Selendang tradisional dengan motif khas Banjar."
     },
     {
         id: 4,
         nama: "Kemeja Bayam Raja",
         kategori: "pakaian",
         harga: 250000,
         gambar: "img/bayam-raja.svg",
         deskripsi: "Kemeja bermotif tradisional Kalimantan Selatan."
     },
     {
         id: 5,
         nama: "Tas Naga Balimbur",
         kategori: "aksesoris",
         harga: 95000,
         gambar: "img/naga-balimbur.svg",
         deskripsi: "Tas dengan motif khas budaya Banjar."
     },
     {
         id: 6,
         nama: "Gamis Ombak Sinapur Karang",
         kategori: "pakaian",
         harga: 325000,
         gambar: "img/ombak-sinapur-karang.svg",
         deskripsi: "Busana dengan motif tradisional yang menarik."
     },
     {
         id: 7,
         nama: "Kain Motif Bunga Banua",
         kategori: "kain",
         harga: 190000,
         gambar: "img/kain-bunga-banua.png",
         deskripsi: "Kain sasirangan dengan corak bunga yang elegan."
     },
     {
         id: 8,
         nama: "Kain Motif Ombak Barito",
         kategori: "kain",
         harga: 195000,
         gambar: "img/kain-ombak-barito.png",
         deskripsi: "Kain sasirangan dengan pola gelombang yang menarik."
     },
     {
         id: 9,
         nama: "Blus Sasirangan Motif Kambang",
         kategori: "pakaian",
         harga: 210000,
         gambar: "img/blus-kambang.png",
         deskripsi: "Blus wanita dengan motif bunga khas sasirangan."
     },
     {
         id: 10,
         nama: "Tunik Sasirangan Bintang Bahambur",
         kategori: "pakaian",
         harga: 235000,
         gambar: "img/tunik-bintang-bahambur.png",
         deskripsi: "Tunik modern dengan motif bintang yang cantik."
     },
     {
         id: 11,
         nama: "Rok Sasirangan Bunga Banua",
         kategori: "pakaian",
         harga: 185000,
         gambar: "img/rok-bunga-banua.png",
         deskripsi: "Rok dengan perpaduan motif bunga tradisional."
     },
     {
         id: 12,
         nama: "Outer Sasirangan Daun Pudak",
         kategori: "pakaian",
         harga: 220000,
         gambar: "img/outer-daun-pudak.png",
         deskripsi: "Outer kekinian dengan motif khas Kalimantan Selatan."
     },
     {
         id: 13,
         nama: "Dompet Sasirangan Kambang Kacang",
         kategori: "aksesoris",
         harga: 75000,
         gambar: "img/dompet-kambang-kacang.png",
         deskripsi: "Dompet praktis dengan sentuhan motif sasirangan."
     },
     {
         id: 14,
         nama: "Syal Sasirangan Ombak Barito",
         kategori: "aksesoris",
         harga: 110000,
         gambar: "img/syal-ombak-barito.png",
         deskripsi: "Syal lembut dengan motif ombak khas Banua."
     },
     {
         id: 15,
         nama: "Kain Motif Pucuk Banua",
         kategori: "kain",
         harga: 200000,
         gambar: "img/kain-pucuk-banua.png",
         deskripsi: "Kain sasirangan dengan corak pucuk tumbuhan yang indah."
     },
     {
         id: 16,
         nama: "Bros Sasirangan Kambang",
         kategori: "aksesoris",
         harga: 65000,
         gambar: "img/bros-sasirangan.png",
         deskripsi: "Bros cantik berbahan kain sasirangan untuk pelengkap busana."
     }
 ];

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

 // 10. Menampilkan semua produk ketika halaman dibuka
 tampilkanKatalog(katalog);