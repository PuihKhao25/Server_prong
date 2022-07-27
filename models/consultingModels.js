var db = require("../config/connectDB");

var consultingModels = {
  create: function (consulting, result) {
    db.query("INSERT INTO consultings SET ?", consulting, (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },
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
  update: function (id, consulting, result) {
    db.query("UPDATE consultings SET name=?,place=?,image=?,dates=? WHERE id =?",
    [ consulting.name,consulting.place,consulting.image,consulting.dates,id] ,(err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },
  list: function(result){
    db.query("SELECT * FROM consultings ", (err,res)=>{
      if(err){
        result(null,err);
      }else{
        result(null, res)
      }
    })
  },
  findById: function(id,result){
    db.query("SELECT * FROM consultings WHERE id =?",[id],(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  },
  pagination: function(limit,offset ,result){
    db.query(`select * from consultings LIMIT ${limit} OFFSET ${offset}`,(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  }
  
};


module.exports = consultingModels;
