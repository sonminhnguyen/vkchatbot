
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'admin', password: '$2b$10$CKDSGm9BC/E7f.lvxv2By.UnxuV8n4AWj/plBLJAYFeFLUNmthpKO', profile: 'Son Nguyen', admin: true },
        { username: 'dev', password: '$2b$10$37AQlecTPz.hFKGRYRfFueGBiFYMiZitazF4gsI71t6MXwy2JjaG2', profile: 'dev user', admin: false },
        { username: 'Isaf', password: '$2b$10$hddIs.DBypp78tqtsMJVtOszWdYuOsFLVbi9BcdQOg9Yg9WIySlge', profile: 'Isaf819122', admin: false }
      ]);
    });
};
