var express = require('express');
var router = express.Router();
var {db} = require('./database/mysql');

/* GET users listing. */
// router.get('/mypage', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET users listing. */
router.get('/mypage', function(req, res, next) {
  let seq = req.query.seq;
  console.log(seq);
  console.log('ibnin');

  db.query(`select * from log where client_seq="${seq}" limit 5`,(err,results)=>{
    if(err) throw err;
    
    let logResult=JSON.parse(JSON.stringify(results)) 
    res.json({log:logResult})
  })

  // res.send('respond with a resource');
});


module.exports = router;
