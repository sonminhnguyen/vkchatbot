// const fetch = require("node-fetch");
const fetch = require("isomorphic-fetch");
const axios = require('axios');
// import axios from 'axios';

// import fetch from 'isomorphic-fetch';

const test = async () => {
    const message = {
        name: 'message text'
      };
    // fetch("http://localhost:3000/sendMessage",
    // {
    //     method: "POST",
    //     // body: JSON.stringify(message)
    //     body: message
    // }).then(() => console.log('Created'))
    //   .catch(err => {
    //     console.error(err);
    //   });
    axios.post(`http://localhost:3000/sendMessage`, { message })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}
test();