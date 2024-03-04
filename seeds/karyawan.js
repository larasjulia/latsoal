/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('karyawan').del()
  await knex('karyawan').insert([
    {nama: 'Laras', alamat: 'Cilegon', jabatan: 'CEO', tanggalLahir: '18-07-2000'},
    {nama: 'Dany', alamat: 'Cilegon', jabatan: 'CTO', tanggalLahir: '07-06-1995'}
  ]);
};
