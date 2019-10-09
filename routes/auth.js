var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');

let loginSuccess = {
  "type": 1,
  "code": 1,
  "id": "client@te.com",
  "name": "client",
  "imagePath": null,
  "country": "Korea South",
  "state": "Seoul",
  "language": [
      "DE",
      "EN",
      "KO"
  ],
  "rating": 3.26,
  "jsonType": "login.res.json",
  "result": 1,
  "msg": "login success"
};

router.route('/login')
  .post(async (req, res, next) => {
    let passEmail = req.body.username ===  'mmmqa@gmail.com';
    let passPassword = req.body.password === 'qawsed123!!';
    if(passEmail && passPassword){
      loginSuccess.id = req.body.username;
      res.json(loginSuccess)
    }else if ( passPassword || passEmail ){
      res.json({result:2})    
    }else {
      res.json({result:3})
    }

    console.log(passEmail);
    console.log(passPassword);
  });



module.exports = router;