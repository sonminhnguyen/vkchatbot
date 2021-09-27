require('dotenv').config()
const VkBot = require('node-vk-bot-api');
const Context = require('node-vk-bot-api/lib/context');
const Session = require('node-vk-bot-api/lib/session');
const Markup = require('node-vk-bot-api/lib/markup');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const knex = require('./database');

const start = new Scene('start', 
  async (ctx) => {
    const groups = await knex('groups.id_group').from('groups').whereNotIn('groups.id_group', 
                          knex.select('students.group').from('students').where('students.id_vk', ctx.message.peer_id))
    ctx.scene.next();
    ctx.reply('Hello! Select your group', null, Markup
    .keyboard(groups.map(group => group.group_name))
    .oneTime(),
    );
  },
  async (ctx) => {
    let group = await knex('groups').where('group_name', ctx.message.text)
    const student = await knex('students').where('id_vk', ctx.message.peer_id).join('groups', 'students.group', 'groups.id_group')

    ctx.scene.leave();
    if(group.length == 0) {
      ctx.reply('Wrong group! Pls /start again and rechoose group.')
    } else {
      //add to database
      if(student.length == 0) {
        await knex("students").insert({ id_vk: ctx.message.peer_id, group: group[0].id_group })
        ctx.reply(`Welcome to ${group[0].group_name}. /start again to change your group`)
      } else {
        await knex('students').where('id_vk', ctx.message.peer_id).update({ group: group[0].id_group })
        ctx.reply(`You change to group ${ctx.message.text}`)
      }
    }
    
  }
)

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
