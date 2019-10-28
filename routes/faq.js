var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');
var {
  query
} = require('./database/mysql');

/**
 * ROUTER: FAQ 등록
 * http://localhost:8081/faq/upload
 * title, conten, author
 */
router.route('/upload')
  .post(async (req, res, next) => {
    const {
      title,
      content,
      author
    } = req.body;
    query(`INSERT INTO faq (title,content,author) VALUES ('${title}','${content}','${author}')`, (result) => {
      console.log(result);
      res.json({
        result: 1
      })
    })
  });

router.route('/list')
  .get(async (req, res, next) => {
    const body = {};
    query(`SELECT * from faq order by id desc`, (result) => {
      console.log(result);
      body.faqList = result;
      body.result =1;
      res.json(body);
    })
  });

router.route('/detail')
  .post(async (req, res, next) => {
    const {faqSeq} = req.body;
    const body = {};
    query(`SELECT * from faq where id='${faqSeq}'`, (result) => {
      console.log(result);
      body.faqDetail = result[0];
      body.result =1;
      res.json(body);
    })
  });

router.route('/delete')
  .post(async (req, res, next) => {
    const {faqSeq} = req.body;
    const body = {};
    query(`DELETE from faq where id='${faqSeq}'`, (result) => {
      console.log(result);
      body.result =1;
      res.json(body);
    })
  });

router.route('/update')
  .post(async (req, res, next) => {
    const {faqSeq,title,content,author} = req.body;
    console.log(req.body);
    const body = {};
    query(`UPDATE faq SET title='${title}',content='${content}', author='${author}' 
    where id='${faqSeq}'`, (result) => {
      console.log(result);
      body.result =1;
      res.json(body);
    })
  });

module.exports = router;
