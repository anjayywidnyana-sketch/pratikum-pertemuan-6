const db = require('../config/database');
const ProdukModel = {
    // Menampilkan semua produk
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM produk');
        return rows;
    },
    // Menampilkan satu produk berdasarkan ID
    getById: async (id) => {
        const sql = 'SELECT * FROM produk WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    },
    // Menambahkan produk
    create: async (data) => {
        const { nama, kategori, harga, stok } = data;
        const sql = `
            INSERT INTO produk (nama, kategori, harga, stok)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [
            nama,
            kategori,
            harga,
            stok
        ]);
        return result;
    },
    // Mengupdate produk berdasarkan ID
    update: async (id, data) => {
        const { nama, kategori, harga, stok } = data;
        const sql = `
            UPDATE produk
            SET nama = ?, kategori = ?, harga = ?, stok = ?
            WHERE id = ?
        `;
        const [result] = await db.query(sql, [
            nama,
            kategori,
            harga,
            stok,
            id
        ]);
        return result;
    },
    // Menghapus produk berdasarkan ID
    delete: async (id) => {
        const sql = 'DELETE FROM produk WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
    // METODE TIDAK AMAN - HANYA UNTUK EKSPERIMEN KEAMANAN
    getByKategoriInsecure: async (kategoriInput) => {
        const rawSql =
            `SELECT * FROM produk WHERE kategori = '${kategoriInput}'`;
        console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
        const [rows] = await db.query(rawSql);
        return rows;
    },
    // METODE AMAN MENGGUNAKAN PREPARED STATEMENT
    getByKategoriSecure: async (kategoriInput) => {
        const secureSql =
            'SELECT * FROM produk WHERE kategori = ?';
        console.log(
            '\n[PREPARED STATEMENT QUERY]:',
            secureSql,
            'WITH VALUE:',
            [kategoriInput]
        );
        const [rows] = await db.query(secureSql, [kategoriInput]);
        return rows;
    }
};
module.exports = ProdukModel;