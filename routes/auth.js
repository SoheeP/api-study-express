var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');
var {
  db,
  query
} = require('./database/mysql');
// const uuidv3 = require('uuid/v3');
const moment = require('moment');
const geoip = require('geoip-lite');
const dns = require('dns');
const os = require('os');

/**
 * ROUTER: 백엔드 로그인 
 */
router.route('/login')
  .post(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //로그인 데이터베이스
    db.query(`select * from user where email ="${email}" and password = "${password}"`,
      async function (error, results, fields) {
        if (error) throw error;
        let result_data;
        if (results.length > 0) {
          result_data = _.omit(results[0], ['password']);
          result_data.result = 1;
          let ip = '207.97.227.239';
          var geo = geoip.lookup(ip);
          let device = req.device.type.toUpperCase();
          let nowTime = moment().format('YYYY/MM/DD hh:mm:ss');
          let userSeq = result_data.seq;
          db.query(`insert into log (client_seq, country, login,ip,device) values("${userSeq}","${geo.country}","${nowTime}","${ip}","${device}")`)
          res.json(result_data);
        } else {
          result_data = {
            result: 2
          };
          res.json(result_data)
        }
        console.log(result_data);
      })
  });

/**
 * ROUTER: 백엔드 회원가입 
 */
router.route('/signup')
  .post(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const phone = req.body.phone;
    const verification = req.body.verification;
    let verify;

    // console.log(email);
    // console.log(email);
    // console.log(password);
    // console.log(username);
    // console.log(phone);
    // console.log(verification);

    // 1번은 회원 가입 완료
    // 2번은 뭐인가 떄문에 에러.
    // 3번은 인증이 안됬다.
    // 4번은 중복체크 
    let result;
    console.log(verification);
    if (verification.length === 0) {
      result = { result: 3}
      res.json(result)
    } else {
      verify = 1
      db.query(`select * from user where email="${email}"`, (err, results) => {
        if (err) throw err;
        console.log(results);
        if (results.length > 0) {
          res.json({ result: 4 })
        } else {
          //회원가입 데이터베이스
          db.query(`insert into user (email, password, username, phone, verification,seq)  
            values ( "${email}", "${password}", "${username}", "${phone}", "${verify}", "${verification}" )`,
            function (error, results, fields) {
              if (error) {
                result = { result: 2 };
                res.json(result);
                console.log(error);
              } else {
                result = { result: 1 };
                res.json(result)
                console.log(results);
              }
            })

        }
      });
    }
  });


/**
 * ROUTER: withdrawal
 */
router.route('/withdrawal')
  .post(async (req, res, next) => {
    let seq = req.body.seq;
    query(`DELETE FROM user WHERE seq="${seq}"`, (result) => {
      console.log(result);
      res.json({
        result: 1
      })
    });
  });

/**
 * ROUTER: email Check
 */
router.route('/email/check')
  .post(async (req, res, next) => {
    let email = req.body.email;
    console.log(email);
    query(`SELECT * FROM user WHERE email="${email}"`, (result) => {
      console.log(result);
      if(result.length > 0){
        res.json({result: 1})
      }else{
        res.json({result: 2})
      }
    });
  });

  
module.exports = router;


// NOTE: 기존의 더미 데이터
// let loginSuccess = {
//   "type": 1,
//   "code": 1,
//   "id": "client@te.com",
//   "name": "client",
//   "imagePath": null,
//   "country": "Korea South",
//   "state": "Seoul",
//   "language": [
//       "DE",
//       "EN",
//       "KO"
//   ],
//   "rating": 3.26,
//   "jsonType": "login.res.json",
//   "result": 1,
//   "msg": "login success"
// };


// let passEmail = req.body.username ===  'mmmqa@gmail.com';
// let passPassword = req.body.password === 'qawsed123!!';
// if(passEmail && passPassword){
//   loginSuccess.id = req.body.username;
//   res.json(loginSuccess)
// }else if ( passPassword || passEmail ){
//   res.json({result:2})    
// }else {
//   res.json({result:3})
// }
// 01050172132

// console.log(passEmail);
// console.log(passPassword);