var express = require('express');
var router = express.Router();
const bot = require('../bots')
// const passport = require('passport');
const passport = require('../middleware/passport');
const knex = require('../database')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const auth = require('../middleware/auth')
const SECRET = "any_secret_you_want_to_use"

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/signUp",
  auth,
  async (req, res, next) => {
    if(req.user.admin) {
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
    } else {
      res.send({ message: 'You have no permission.' })
    }
  }
)

router.post("/login",
  passport.authenticate('local'), 
  async (req, res, next) => {
    try {
      user = req.user.username;
      jwt.sign(user, SECRET, (error, token) => {
        res.status(200).send({ user, token })
    })
    }
    catch (e) {
      res.status(400).send()
    }
})

router.get('/getGroups',
  auth,
  async (req, res, next) => {
    const groups = await knex.select().table('groups');
    res.send(JSON.stringify(groups));
  }
)

router.get("/getUsers",
  auth,
  async (req, res, next) => {
    console.log(req.isAuthenticated());
    const users = await knex("users")
    res.json(users)
  }
)

router.post('/sendMessage',
  auth,
  async (req, res, next) => {
    const { title, group_id, message } = req.body;
    let users = await knex('students').where('students.group', group_id).select('id_vk')
    users = users.map(user => user.id_vk)
    if (users.length != 0) {
      await bot.sendMessage(users, title);
      await bot.sendMessage(users, message);
      res.sendStatus(200);
    } else {
      res.send('No students in this group')
    }
  }
)

module.exports = router;

// router.get("/verify", (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1]
//   jwt.verify(token, SECRET, (error, decodedToken) => {
//     if (error) {
//       res.status(401).json({
//         message: "Unauthorized Access!"
//       })
//     } else {
//       res.status(200).json({
//         id: decodedToken.id,
//         username: decodedToken.username
//       })
//     }
//   })
// })

