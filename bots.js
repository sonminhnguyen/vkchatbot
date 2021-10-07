require('dotenv').config()
const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const start = require('./scene/start');
const knex = require('./database');

const bot = new VkBot({
  token: process.env.TOKEN,
});
const session = new Session();
const stage = new Stage(start);

bot.use(session.middleware());
bot.use(stage.middleware());


bot.command('/start', (ctx) => {
  ctx.scene.enter('start')
});

bot.command('/end', async (ctx) => {
  await knex('students').where('id_vk', ctx.message.peer_id).del()
  ctx.reply('Thanks for using!')
})

bot.startPolling();

module.exports = bot;
