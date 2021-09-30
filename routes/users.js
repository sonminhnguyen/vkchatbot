var express = require('express');
var router = express.Router();
const bot = require('../bots')
const knex = require('../database')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getGroup', async (req, res, next) => {
  const group = await knex.select().table('groups');
  // console.log(group);
  res.send(JSON.stringify(group));
})

router.post('/sendMessage', async (req, res, next) => {
  const { title, group_id, message } = req.body;

  const users = await knex('students').where('students.group', group_id ).select('id_vk')
  await bot.sendMessage(...users, title);
  await bot.sendMessage(...users, message, );
  res.sendStatus(200);
})

module.exports = router;
