var express = require('express');
var router = express.Router();
const bot = require('../bots')
const passport = require('../middleware/passport');
const knex = require('../database')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const auth = require('../middleware/auth')
const SECRET = "any_secret_you_want_to_use"
const axios = require('axios')
var FormData = require('form-data');
var fs = require('fs');
const path = require('path')

require('dotenv').config()
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
}
})
const upload = multer({ 
  storage:storage,
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|rar|zip|doc|docx|pdf)$/)) {
        return cb(new Error('Please upload jpg, jpeg, png, rar, zip, doc, docx, pdf files'))
    }
    cb(undefined, true)
  }
})

router.post('/deleteUpload', 
  // auth, 
  async (req, res, next) => {
  owner_id = await knex("uploads").where("uploads.id_user", req.user.id_user).select("owner_id")
  const response = await bot.execute('docs.delete', {
    // token: process.env.TOKEN,
    owner_id,
    doc_id: req.body.doc_id
  })
  console.log(response);
})

router.post("/upload", 
  // auth,
  upload.single('file'),
  async (req, res, next) => {
    //??
    if(!req.file) {
      return next()
    }
    const url = await bot.execute('docs.getWallUploadServer', {
      group_id: process.env.GROUP_ID
    })

    const filedir = path.join(__dirname, '..', '/uploads');
    const filename = path.join(__dirname, '..', '/uploads', req.file.originalname );

    var form = new FormData();
    form.append('file', fs.createReadStream(filename));

    const upload = await axios.post(url.upload_url, form, {
      headers: {
        ...form.getHeaders(),
      }
    })

    const save = await bot.execute('docs.save', {
      file: upload.data.file,
    })
    console.log(save);
    const uploadDB = {
      id_user: req.user.id_user,
      owner_id: save.doc.owner_id,
      id_doc: save.doc.id,
      title: save.doc.title,
      url: save.doc.url
    }
    await knex('uploads').insert({ ...uploadDB })

    fs.readdir(filedir, (err, files) => {
      if (err) console.log(err);
      for (const file of files) {
          fs.unlink(path.join(filedir, file), err => {
              if (err) console.log(err);
          });
      }
    });

    res.send("success")
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

router.post("/signUp",
  auth,
  async (req, res, next) => {
    if(req.user.admin) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      try {
        await knex("users").insert({
          username: req.body.username,
          password: hashedPassword,
          profile: req.body.profile
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
      const user = {
        username: req.user.username,
        profile: req.user.profile,
        admin: req.user.admin
      }
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
    const users = await knex("users")
    res.send(JSON.stringify(users));
  }
)

router.get("/getDocs",
  auth,
  async (req, res, next) => {
    const docs = await knex("uploads").join("users", "uploads.id_user", "users.id_user").select("uploads.id_user", "id_doc", "title", "url", "profile")
    res.send(JSON.stringify(docs));
  }
)

router.post('/sendMessage',
  auth,
  async (req, res, next) => {
    const { title, group_id, message, profile } = req.body;
    console.log(req.body);
    let users = await knex('students').where('students.group', group_id).select('id_vk')
    users = users.map(user => user.id_vk)
    if (users.length != 0) {
      await bot.sendMessage(users, title);
      await bot.sendMessage(users, message);
      await bot.sendMessage(users, 'Best regards,');
      await bot.sendMessage(users, profile);
      res.sendStatus(200);
    } else {
      res.send('No students in this group')
    }
  }
)

router.post('/update',
  auth,
  async (req, res, next) => {
    const {username, password, newpassword, profile} = req.body;

    const userPassword = await knex('users').where('username', username).select('password').first()
    const isCorrectPassword = await bcrypt.compare(password, userPassword.password) 

    if(isCorrectPassword) {
      const hashedPassword = await bcrypt.hash(newpassword, 10)
      const user = {
        username,
        password: hashedPassword,
        profile
      }
      try {
        await knex('users').where('username', username).update({ ...user })
        res.status(200).send('update success!')
      }
      catch (e) {
        res.status(400).send({ "error": e })
      }
    } else {
      res.status(400).send({ error: 'old password not correct!' })
    }
  }
)
router.post('/remove',
  auth,
  async (req, res, next) => {
    if(req.user.admin) {
      console.log(req.body);
      try {
        await knex('users').where('username', req.body.username).del()
        res.status(200).send('remove success!')
      }
      catch (e) {
        res.send({ "error": e })
      }
    } else {
      res.send({ message: 'You have no permission.' })
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

