
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id_user: 1, username: 'admin', password: '$2b$10$CKDSGm9BC/E7f.lvxv2By.UnxuV8n4AWj/plBLJAYFeFLUNmthpKO', profile: 'Son Nguyen', admin: true},
        {id_user: 1, username: 'dev', password: '$2b$10$37AQlecTPz.hFKGRYRfFueGBiFYMiZitazF4gsI71t6MXwy2JjaG2', profile: 'dev user', admin: false}
      ]);
    });
};
