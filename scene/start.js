const VkBot = require('node-vk-bot-api');
const Scene = require('node-vk-bot-api/lib/scene');
const Stage = require('node-vk-bot-api/lib/stage');

const startScene = new Scene('start', 
  (ctx) => {
    ctx.scene.next();
    ctx.reply('Hello! Select your group', null, Markup
    .keyboard([
      '8191-21',
      '8191-22',
    ])
    .inline(),
  );
  ctx.session.group = ctx.message.text;
  console.log(ctx);
  
  },
  (ctx) => {
    ctx.scene.leave();
    if(ctx.message.text = '8191-21') {
      ctx.reply('Hello to 8191-21')
    } else if (ctx.message.text = '8191-22') {
      ctx.reply('hHello to 8191-22')
    } else {
      ctx.reply('Wrong group! Pls start again and rechoose group.')
    }
  }
)

bot.use(new Stage(startScene).middleware());;


module.exports = ctx.scene.enter('start')