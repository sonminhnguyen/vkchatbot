
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id_user: 1, username: 'admin', password: '$2b$10$CKDSGm9BC/E7f.lvxv2By.UnxuV8n4AWj/plBLJAYFeFLUNmthpKO', admin: true}
      ]);
    });
};
