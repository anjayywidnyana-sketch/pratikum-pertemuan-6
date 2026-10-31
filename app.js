const express = require('express');
const path = require('path');
require('dotenv').config();

const produkRoutes = require('./routes/produk.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Pengaturan EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(produkRoutes);

// Halaman utama
app.get('/', (req, res) => {
    res.redirect('/produk');
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
