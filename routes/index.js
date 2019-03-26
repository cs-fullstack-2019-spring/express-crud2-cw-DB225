var express = require('express');
var router = express.Router();
var PostSchema = require('../models/PostSchema');

/* GET home page. All our entries are here*/
router.get('/', function(req, res, next) {
  PostSchema.find({}, (error, results) => {
    if (error) return console.log(error);
    else {
      res.render('index', {title: 'Express', allEntries: results})
    }
  });
});

//...................Create a new post..............................
router.get('/createData', (req, res) =>{
  res.render('create');
});

// Save the new data in the index page
router.get('/saveData', (req, res) =>{
  PostSchema.create({
    userId: req.query.userId,
    id: req.query.id,
    title: req.query.title,
    body: req.query.body
  }, (error) =>{
    if (error) res.send(error);
    else res.redirect('/');
  })
});
//...................................................................



//......Update an existing album and send him to the index page.......
router.get('/updateData', (req, res) =>{
  res.render('update');
});

router.get('/updated', (req, res) =>{
  PostSchema.updateOne(
      {userId: req.query.userId},
      {id: req.query.id,
      title: req.query.title,
      body: req.query.body},(error) =>{
        if (error) res.render('error');
        else res.redirect("/");
      })
});
//...................................................................



// ..............delete the page.....................................
router.get('/delete', (req, res) =>{
  res.render('delete');
});

router.get('/deleteEntry', (req, res) =>{
  PostSchema.deleteOne({userId:req.query.userId}, (error) =>{
    if (error) res.send('error');
    else res.redirect('/');
  })
});
//....................................................................

module.exports = router;
