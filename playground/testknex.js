
const knex = require('../database');
const test = async () => {
    // await knex('students').insert([{
    //     id_vk: '123',
    //     group: '12345',
    // }])
    // console.log('success');

    // const group = await knex('groups').where('group_name', '8191-22');
    // if(group.length == 0) {
    //     console.log(group);

    // } else {
    //     console.log('have');
    // }
  const peer_id = 14
  // const group = 1
  // const data = await knex('students').where('id_vk', '13')
  // console.log(data[0].id_vk);
  // console.log(data[0].group);
  // await knex("students")
  //   .insert({id_vk: peer_id, group: group })
  //   .onConflict("id_vk")
  //   .ignore();
  // const group = await knex('groups')
  // console.log(group.map(e => e.group_name));
  // console.log([...group.group_name]);
  // const groups = await knex('groups.id_group').from('groups').whereNotIn('groups.id_group', knex.select('students.group').from('students').where('students.id_vk', peer_id))
  // console.log(groups);
  const user = await knex('users').where('username', 'admin')
  console.log(user);
}


test();