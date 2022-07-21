var db = require("../config/connectDB");

var magazineModels = {

  // create model
  create: function (magazine, result) {
    db.query("INSERT INTO magazines SET ?", magazine, (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },

  // delete model
  delete: function (id, result) {
    db.query(
      "UPDATE magazines SET delete_flg=? WHERE id = ?",
      [1, id],
      (err, res) => {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  },
  
  //update model
  update: function (id, magazine, result) {
    db.query("UPDATE magazines SET name=?,space=?,area=?,dates=? WHERE id =?",
    [ magazine.name,magazine.space,magazine.area,magazine.dates,id] ,(err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },

  // get list model
  list: function(result){
    db.query("SELECT * FROM magazines ", (err,res)=>{
      if(err){
        result(null,err);
      }else{
        result(null, res)
      }
    })
  },

  //get findByID magazine
  findById: function(id,result){
    db.query("SELECT * FROM magazines WHERE id =?",[id],(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  },

  // get Pagination list dat
  pagination: function(startingLimit,resultPage ,result){
    db.query(`SELECT * FROM magazines LIMIT ${startingLimit},${resultPage}`,(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  }

};


module.exports = magazineModels;
