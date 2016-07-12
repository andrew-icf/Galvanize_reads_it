
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', function(table) {
    table.increments();
    table.string('title');
    table.integer('genre_id').references('genre.id').onDelete('CASCADE');
    table.string('description');
    table.string('cover_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
