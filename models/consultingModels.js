var db = require("../config/connectDB");

var consultingModels = {

  // create model
  create: function (consulting, result) {
    db.query("INSERT INTO consultings SET ?", consulting, (err, res) => {
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
      "UPDATE consultings SET delete_flg=? WHERE id = ?",
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
 
    db.query("UPDATE consultings SET name=?,place=?,image=?,dates=? WHERE id =?",
    [ magazine.name,magazine.place,magazine.image,magazine.dates,id] ,(err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },

  // get list model
  list: function(result){
    db.query("SELECT * FROM consultings ", (err,res)=>{
      if(err){
        result(null,err);
      }else{
        result(null, res)
      }
    })
  },

  //get findByID magazine
  findById: function(id,result){

    db.query("SELECT * FROM consultings WHERE id =?",[id],(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  },

  // get Pagination list dat
  pagination: function(startingLimit,resultPage ,result){
    db.query(`SELECT * FROM consultings LIMIT ${startingLimit},${resultPage}`,(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  }

};


module.exports = consultingModels;
