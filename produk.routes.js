const express = require('express');
const router = express.Router();

const produkController = require('../controllers/produk.controller');
const ProdukModel = require('../models/produk.model');

// Menampilkan daftar produk
router.get('/produk', produkController.getProduk);

// Tambah produk
router.get('/produk/tambah', produkController.getTambahProduk);
router.post('/produk/tambah', produkController.postTambahProduk);

// Edit produk
router.get('/produk/edit/:id', produkController.getEditProduk);
router.post('/produk/edit/:id', produkController.postEditProduk);

// Hapus produk
router.post('/produk/hapus/:id', produkController.postHapusProduk);

// Uji keamanan Prepared Statement
router.get('/uji-keamanan', async (req, res) => {
    try {
        const inputPayload = req.query.kategori;

        const hasil = await ProdukModel.getByKategoriSecure(inputPayload);

        res.json({
            input: inputPayload,
            totalDataDitemukan: hasil.length,
            data: hasil
        });
    } catch (error) {
        console.error('[ERROR uji-keamanan]:', error);

        res.status(500).json({
            message: 'Terjadi kesalahan.'
        });
    }
});

module.exports = router;