var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');
var { query } = require('./database/mysql');

/**
 * 
 */
router.route('/upload')
  .post(async (req, res, next) => {
    const {title,content,author} = req.body;

    query(`INSERT INTO faq (title,content,author) VALUES ('${title}','${content}','${author}')`,(result)=>{
      console.log(result);
      res.json({result:1})
    })

  });


module.exports = router;
