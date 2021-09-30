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

const message = async () => {
  const method = 'messages.send'
  const params = {
    peer_id: '6441755',
    message: 'testbot',
    random_id: Date.now(),
  }
  const getpeer_id = await callAPI('messages.getConversations')

  console.log(getpeer_id.response.items);
  // const data = await callAPI(method, params);
  // console.log(data);
}
message();


// // const reqUserRight = async () => {
// //   const data = await callAPI("showSettingsBox", 8214);
// //   console.log(data);
// // }
// // reqUserRight();