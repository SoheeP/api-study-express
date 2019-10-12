var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');
var {db} = require('./database/mysql');


/**
 * ROUTER: 백엔드 로그인 
 */
router.route('/login')
  .post(async (req, res, next) => {
    const email = req.body.username;
    const password = req.body.password;

    //로그인 데이터베이스
    db.query(`select * from user where email ="${email}" and password = "${password}"`,
     function(error, results, fields){
      if(error) throw error;
      let result_data;
      if(results.length > 0){
        result_data = _.omit(results[0], ['password']);
        res.json(result_data);
      } else {
        result_data = {result:2}
        res.json(result_data)
      }
      console.log(result_data);
    })
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