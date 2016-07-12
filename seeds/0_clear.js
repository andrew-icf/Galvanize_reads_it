exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE genre, book, author RESTART IDENTITY CASCADE;');
};
