var express = require('express');
var router = express.Router();
const bot = require('../bots')
const knex = require('../database')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = "any_secret_you_want_to_use"
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/getUsers", async (req, res, next) => {
  const users = await knex("users")
  res.json(users)
})

//test
router.post("/newuser", async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  try {
    await knex("users").insert({
      username: req.body.username,
      password: hashedPassword
    })
    res.status(200).send("success")
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post("/login", async (req, res, next) => {
  const user = await knex('users').where('username', req.body.username).first()
  if (!user) {
    res.status(401).json({
      error: "No user by that name"
    })
  } else {
    const isAuthenticated = await bcrypt.compare(req.body.password, user.password)
    if (!isAuthenticated) {
      res.status(401).json({
        error: "Unauthorized Access!"
      })
    } 
    else {
      jwt.sign(user, SECRET, (error, token) => {
        res.status(200).json({ token })
      })
    }
  }
})

router.get('/logout', (req, res, next) => {

})

router.get("/verify", (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, SECRET, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        message: "Unauthorized Access!"
      })
    } else {
      res.status(200).json({
        id: decodedToken.id,
        username: decodedToken.username
      })
    }
  })
})

router.get('/getGroups', async (req, res, next) => {
  const groups = await knex.select().table('groups');
  res.send(JSON.stringify(groups));
})

router.post('/sendMessage', async (req, res, next) => {
  const { title, group_id, message } = req.body;
  let users = await knex('students').where('students.group', group_id).select('id_vk')
  users = users.map(user => user.id_vk)
  if(users.length != 0) {
    await bot.sendMessage(users, title);
    await bot.sendMessage(users, message);
    res.sendStatus(200);
  } else {
    res.send('No students in this group')
  }
})

module.exports = router;
