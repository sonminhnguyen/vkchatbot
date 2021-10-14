// const callAPI = async (method, params = {}) => {
//   Object.assign(params, {
//     access_token: process.env.TOKEN1,
//     v: 5.131
//   })
//   const { data } = await axios.post(`https://api.vk.com/method/${method}`, stringify(params));
//   return data;
// }

// const connectPoll = async () => {
//   const settings = {
//     token: process.env.TOKEN1,

//   }
//   if (!settings.group_id) {
//     const { response } = await api('groups.getById', {
//       access_token: settings.token,
//     });
//     settings.group_id = response[0].id;
//   }
  
//   const { response } = await api('groups.getLongPollServer', {
//     group_id: settings.group_id,
//     access_token: settings.token,
//   });
//   // console.log(response);
//   Object.assign(settings, { ...response })
//   // const res2 = await axios(`${settings.server}?act=a_check&key=${settings.key}&ts=${settings.ts}&wait=25`)
//   // console.log(res2);
// }
// connectPoll();



// const getChatId = async () => {
//   const res = await callAPI('messages.getDialogs', {

//   })
//   console.log(res.response.items);
// }
// // getChatId();

// const isAllowGroupsMessages = async () => {
//   const params = {
//     group_id: '207311749',
//     user_id: '674765662'
//   }
//   const res = await callAPI('messages.isMessagesFromGroupAllowed', params)
//   console.log(res);
// }
// // isAllowGroupsMessages();

// const message = async () => {
//   const method = 'messages.send'
//   const params = {
//     peer_id: '6441755',
//     message: 'testbot',
//     random_id: Date.now(),
//   }
//   const getpeer_id = await callAPI('messages.getConversations')

//   console.log(getpeer_id.response.items);
//   // const data = await callAPI(method, params);
//   // console.log(data);
// }
// message();


// // const reqUserRight = async () => {
// //   const data = await callAPI("showSettingsBox", 8214);
// //   console.log(data);
// // }
// // reqUserRight();

const VkBot = require('node-vk-bot-api');
const multer = require('multer')
const sharp = require('sharp')
require('dotenv').config()
const fs = require('fs')

// const app = express();
const bot = new VkBot({
  token: process.env.TOKEN,
});

// const upload = multer({
//   //dest: 'avatars',
//   limits: {
//       fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//           return cb(new Error('Please upload jpg, jpeg or png files'))
//       }
//       cb(undefined, true)
//   }
// })
const { VK } = require('vk-io');

const vk = new VK({
	token: process.env.TOKEN
});

const func = async() => {
  // const res = await bot.execute('docs.getWallUploadServer', {
  //   group_id: '207360925'
  // })
  // console.log(res.upload_url);
  // var image = 'avatars/' + 'lab1' + '.doc';
  // const file = fs.createReadStream(image, 'base64') 
  // console.log(file);
  const upload = await bot.execute('docs.save', {
    "file": "674765662|207360925|-1|505536|f27c2a796f|jpg|45134|EG2lWXUFvug.jpg|392cbb1e19bfab22971ea6a8a2ae44aa|3b9690990f677e8ad76f5daae6076579|m_f27c2a796f||m:130x100,s:100x75,x:604x579,y:807x773,o:648x621|eyJkaXNrIjoiMzMifQ=="
  })
  console.log(upload);
  // const attachment = await vk.upload.messagePhoto({
  //   peer_id: 674765662,
  //   source: {	
  //     value: './avatars/testimage.jpg'
  //   }
  // });
  // console.log(attachment);
} 
func();