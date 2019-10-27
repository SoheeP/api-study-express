// /board/free/upload


var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');
var {
  query
} = require('./database/mysql');
var {
  // page
} = require('./database/query');
const moment = require('moment');

async function boardListPageQuery(page, callback) {
  return await query(`SELECT COUNT(*) as cnt FROM board`, (result) => {
    var page_size = 5;
    //페이징의 갯수 : 1 ~ 10개 페이지
    var page_rows_size = 10;
    // 페이지 row의 개수

    let totalPageCount = result[0].cnt;
    let curPage = page;
    if (totalPageCount < 0) totalPageCount = 0;

    var totalPage = Math.ceil(totalPageCount / page_rows_size); // 전체 페이징 수
    if (totalPage < page_size) {
      page_size = totalPage;
    }
    var totalSet = Math.ceil(totalPage / page_size);
    var curSet = Math.ceil(curPage / page_size)
    var startPage = ((curSet - 1) * page_size) + 1
    var endPage = (startPage + page_size) - 1;
    if (totalPage < endPage) {
      endPage = totalPage
    }
    if (curPage < 0) {
      no = 0
    } else {
      no = (curPage - 1) * 10
    }
    var result2 = {
      page: +curPage,
      page_rows_size,
      page_size,
      totalPage,
      totalSet,
      curSet,
      startPage,
      endPage
    };
    callback(result2)
  })

}


// /free/detail/:boardSeq
router.route('/free/detail')
  .post(async (req, res, next) => {
    let body = {};
    const {
      boardSeq
    } = req.body;

    query(`SELECT * FROM board where seq = ${boardSeq}`, (result) => {
      const data = result[0];
      body.boardDetail = data;
      body.result = 1;
      console.log(body);
      res.json(body);
    })

  });

// /board/free/list
// params : page :1

router.route('/free/list')
  .post(async (req, res, next) => {
    console.log('in');
    console.log(req.body);
    const {
      page
    } = req.body;
    let offset = (+page - 1) * 10;
    let body = {};

    boardListPageQuery(page, async (pageInfo) => {
      await query(`SELECT * from board order by seq desc limit ${offset},10  `, (result) => {
        console.log(result);
        body.result = 1;
        body.boardList = result;
        body.pageData = pageInfo
        console.log(body.pageData);
        res.json(body)
      })
    })
  });

/**
 * userSeq, title, content, author
 */
router.route('/free/upload')
  .post(async (req, res, next) => {
    const {
      userSeq,
      title,
      content,
      author
    } = req.body;

    query(`INSERT INTO board (userSeq, title,content,author) VALUES 
    ('${userSeq}','${title}','${content}','${author}')`, (result) => {
      console.log(result);
      res.json({
        result: 1
      })
    })

  });


router.route('/free/delete')
  .post(async (req, res, next) => {
    const {
      boardSeq: seq,
      userSeq
    } = req.body;
    console.log(seq, userSeq);
    let body = {};
    query(`delete from board where seq='${seq}' and userSeq='${userSeq}' `, (result) => {
      console.log(result);
      body.result = 1;
      res.json(body)
    })

  });


router.route('/free/modify')
  .post(async (req, res, next) => {
    const {boardSeq: seq,userSeq,title,content} = req.body;
    console.log(seq, userSeq);
    let body = {};
    let date = moment().format('YYYY-MM-DD hh:mm:ss');
    query(`update board SET title='${title}', content='${content}',date='${date}'  where seq='${seq}' and userSeq='${userSeq}'`, (result) => {
      console.log(result);
      console.log(result.changedRows,'result.changeRows');

      if(+result.changedRows === 1){
        body.result = 1;
      }else{
        body.result = 2;
      }
      res.json(body)
    })

  });

module.exports = router;
