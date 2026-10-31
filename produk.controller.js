const ProdukModel = require('../models/produk.model');
// Menampilkan daftar produk
exports.getProduk = async (req, res) => {
    try {
        const produk = await ProdukModel.getAll();
        res.render('pages/produk-list', {
            title: 'Daftar Produk',
            produk
        });
    } catch (error) {
        console.error('[ERROR getProduk]:', error);
        res.status(500).send('Gagal mengambil data dari database.');
    }
};
// Menampilkan halaman tambah produk
exports.getTambahProduk = (req, res) => {
    res.render('pages/produk-form-tambah', {
        title: 'Tambah Produk'
    });
};
// Menyimpan produk baru
exports.postTambahProduk = async (req, res) => {
    try {
        await ProdukModel.create(req.body);
        console.log('[DATABASE] Produk berhasil ditambahkan.');
        res.redirect('/produk');
    } catch (error) {
        console.error('[ERROR postTambahProduk]:', error);
        res.status(500).send('Gagal menambahkan produk.');
    }
};
// Menampilkan halaman edit produk
exports.getEditProduk = async (req, res) => {
    try {
        const produk = await ProdukModel.getById(req.params.id);
        if (!produk) {
            return res.status(404).send('Produk tidak ditemukan.');
        }
        res.render('pages/produk-form-edit', {
            title: 'Edit Produk',
            produk
        });
    } catch (error) {
        console.error('[ERROR getEditProduk]:', error);
        res.status(500).send('Gagal mengambil data produk.');
    }
};
// Menyimpan perubahan produk
exports.postEditProduk = async (req, res) => {
    try {
        const result = await ProdukModel.update(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).send('Produk tidak ditemukan.');
        }
        console.log(`[DATABASE] Produk ID ${req.params.id} berhasil diperbarui.`);
        res.redirect('/produk');
    } catch (error) {
        console.error('[ERROR postEditProduk]:', error);
        res.status(500).send('Gagal memperbarui produk.');
    }
};
// Menghapus produk
exports.postHapusProduk = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProdukModel.delete(id);
        if (result.affectedRows === 0) {
            console.warn(`[DATABASE] Tidak ada record yang terhapus untuk ID ${id}`);
        } else {
            console.log(`[DATABASE] Record ID ${id} berhasil dihapus.`);
        }
        res.redirect('/produk');
    } catch (error) {
        console.error('[ERROR postHapusProduk]:', error);
        res.status(500).send('Gagal menghapus data dari basis data.');
    }
};
