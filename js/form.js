
// =========================================================
// form.js - Modul 3: validasi formulir & pesan WhatsApp
// Praktikum Pemrograman Web 1 - Sasirangan Banua
// =========================================================

// Mengambil elemen HTML
const form = document.querySelector("#form-pesan");
const hasilPesan = document.querySelector("#hasil-pesan");
const ringkasan = document.querySelector("#ringkasan");
const tautanWa = document.querySelector("#tautan-wa");

// Nomor WhatsApp toko (FIKTIF, hanya untuk latihan)
const NOMOR_TOKO = "6281234567890";

// 1. Aturan validasi untuk setiap kolom
const aturan = {

    nama: {
        cek: (nilai) => nilai.trim().length >= 3,
        pesan: "Nama wajib diisi, minimal 3 huruf.",
    },

    wa: {
        cek: (nilai) => /^08\d{8,11}$/.test(nilai.trim()),
        pesan: "Nomor WhatsApp diawali 08 dan terdiri atas 10–13 digit angka.",
    },

    email: {
        // Email boleh kosong, tetapi jika diisi formatnya harus benar
        cek: (nilai) =>
            nilai.trim() === "" ||
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai.trim()),
        pesan: "Format surel belum benar, contoh: nama@domain.com.",
    },

    produk: {
        cek: (nilai) => nilai !== "",
        pesan: "Silakan pilih produk.",
    },

    jumlah: {
        cek: (nilai) =>
            Number.isInteger(Number(nilai)) &&
            Number(nilai) >= 1 &&
            Number(nilai) <= 50,
        pesan: "Jumlah harus bilangan bulat 1 sampai 50.",
    },

};


// 2. Menampilkan atau menghapus pesan kesalahan
function tampilkanError(input, pesan) {

    const wadahError =
        document.querySelector(`#error-${input.id}`);

    wadahError.textContent = pesan;

    input.setAttribute(
        "aria-invalid",
        pesan !== "" ? "true" : "false"
    );
}


// 3. Memeriksa satu kolom
function validasiKolom(input) {

    if (input.type === "checkbox") {

        const dicentang = input.checked;

        tampilkanError(
            input,
            dicentang ? "" : "Centang persetujuan terlebih dahulu."
        );

        return dicentang;
    }

    const aturanKolom = aturan[input.name];

    const valid = aturanKolom.cek(input.value);

    tampilkanError(
        input,
        valid ? "" : aturanKolom.pesan
    );

    return valid;
}


// 4. Daftar kolom yang perlu diperiksa
const kolomDiperiksa = [
    "nama",
    "wa",
    "email",
    "produk",
    "jumlah",
    "setuju"
].map((nama) => form.elements[nama]);


// 5. Memeriksa ulang kolom ketika isinya berubah
kolomDiperiksa.forEach((input) => {

    input.addEventListener("input", () => {

        if (input.getAttribute("aria-invalid") === "true") {
            validasiKolom(input);
        }

    });

});


// 6. Memeriksa semua kolom ketika formulir dikirim
form.addEventListener("submit", (event) => {

    event.preventDefault();

    let kolomSalahPertama = null;

    kolomDiperiksa.forEach((input) => {

        const valid = validasiKolom(input);

        if (!valid && kolomSalahPertama === null) {
            kolomSalahPertama = input;
        }

    });

    // Jika masih ada kesalahan
    if (kolomSalahPertama !== null) {

        hasilPesan.hidden = true;

        kolomSalahPertama.focus();

        return;
    }


    // 7. Semua valid: susun pesan WhatsApp
    const data = new FormData(form);

    const pesan = [

        "Assalamu'alaikum, saya ingin memesan:",

        `Nama: ${data.get("nama").trim()}`,

        `Produk: ${data.get("produk")}`,

        `Jumlah: ${data.get("jumlah")}`,

        `Pengambilan: ${data.get("pengambilan")}`,

        `Catatan: ${data.get("catatan").trim() || "-"}`

    ].join("\n");


    // Menampilkan ringkasan pesanan dengan aman
    ringkasan.textContent = pesan;

    // Membuat tautan WhatsApp
    tautanWa.href =
        `https://wa.me/${NOMOR_TOKO}?text=${encodeURIComponent(pesan)}`;

    // Menampilkan hasil pesanan
    hasilPesan.hidden = false;

    hasilPesan.scrollIntoView({
        behavior: "smooth"
    });

});