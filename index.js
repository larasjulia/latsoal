const express = require('express');
const axios = require('axios');
const app = express();

const db = require('./db');

app.use(express.json());
app.set('view engine', 'hbs');

//START API
//POST API
app.post('/api/karyawan', async (req, res) => {
    const { nama, alamat, jabatan, tanggalLahir } = req.body;

    const karyawan = await
    db('karyawan').insert({
        nama: nama,
        alamat: alamat,
        jabatan: jabatan,
        tanggalLahir: tanggalLahir,
    }).returning(['id']);

    return res.json({
        message: 'Data berhasil ditambahkan',
        data: { id: karyawan[0].id, nama: nama, alamat: alamat, jabatan: jabatan, tanggalLahir: tanggalLahir },
    });
});

//PUT API
app.put('/api/karyawan/:id', async (req, res) => {
    const { id } = req.params;

    const { nama, alamat, jabatan, tanggalLahir } = req.body;

    await db('karyawan').where({
        id: id,
    }).update({
        nama: nama,
        alamat: alamat,
        jabatan: jabatan,
        tanggalLahir: tanggalLahir,
    });

    return res.json({
        message: 'Data berhasil diubah',
        data: { id: id, nama: nama, alamat: alamat, jabatan: jabatan, tanggalLahir: tanggalLahir },
    });
});

//DELETE API
app.delete('/api/karyawan/:id', async (req, res) => {
    const { id } = req.params;

    await db('karyawan').where({
        id: id,
    }).del();
    return res.json({ message: 'Data karyawan berhasil dihapus' });
});

//GET ID API
app.get('/api/karyawan/:id', async (req, res) => {
    const { id } = req.params;

    const karyawan = await
    db('karyawan').select('*').where({id: id,}).first();

    return res.json({ data: karyawan });
});

//GET API
app.get('/api/karyawan', async (req, res) => {
    const karyawan = await
    db('karyawan').select('*');
    return res.json({ data: karyawan });
});
//END API


//VIEW
app.get('/', async (req, res) => {
    return res.render('index')
})

app.get('/karyawan', async (req, res) => {
    const data = await axios.get('http://localhost:3007/api/karyawan')
    console.log(data.data)
    return res.render('listKaryawan', {karyawan:data.data.data})
})

app.listen(3007, () => {
    console.log('Server is running on port 3007');
});