/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('karyawan',
  (table) => {
    table.increments(),
    table.string('nama'),
    table.string('alamat'),
    table.string('jabatan'),
    table.string('tanggalLahir')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('karyawan');
};
