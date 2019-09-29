var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.route('/movie')
  .get(async (req, res, next) => {
    console.log(req.query, 'queryqueryqueryqueryquery');
    let query_arr = _.reduce(req.query, (arr, val, key) => {
      arr.push(`${key}=${val}`)
      return arr;
    }, []);
    let get_query = query_arr.join('&');

    axios.get(`https://yts.tl/api/v2/list_movies.json?${get_query}`)
      .then((response) => {
        console.log(response.data);
        res.json(response.data)
      })
  });


router.route('/login')
  .post(async (req, res, next) => {
    res.json('success')
  });



module.exports = router;