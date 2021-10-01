require('dotenv').config()
const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const start = require('./scene/start');

const bot = new VkBot({
  token: process.env.TOKEN1,
});
const session = new Session();
const stage = new Stage(start);

bot.use(session.middleware());
bot.use(stage.middleware());


bot.command('/start', (ctx) => {
  ctx.scene.enter('start')
});
const group_name = ''
bot.command(`/sendMessage ${group_name}`, async (ctx) => {
  const group = knex.select('id_vk').from('student').where(knex.select('id_group').where('id_group', group_name))
  console.log(group_name);
  // bot.sendMessage(...group, 'test sending mess to all group ')
})



bot.startPolling();

module.exports = bot;
