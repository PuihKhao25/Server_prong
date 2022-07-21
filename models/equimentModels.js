var db = require("../config/connectDB");

var equimentModels = {
  // create model
  create: function (equipment, result) {
    db.query("INSERT INTO equipments SET?", equipment, (err, res) => {
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
      "UPDATE equipments SET delete_flg=? WHERE id = ?",
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
  update: function (id, equipment, result) {

    db.query("UPDATE equipments SET name=?,place=?,image=?,dates=? WHERE id =?",
    [ equipment.name,equipment.place,equipment.image,equipment.dates,id] ,(err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },

  // get list model
  list: function(result){
    db.query("SELECT * FROM equipments ", (err,res)=>{
      if(err){
        result(null,err);
      }else{
        result(null, res)
      }
    })
  },

  //get findByID equipment
  findById: function(id,result){

    db.query("SELECT * FROM equipments WHERE id =?",[id],(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  },

  // get Pagination list dat
  pagination: function(startingLimit,resultPage ,result){
    db.query(`SELECT * FROM equipments LIMIT ${startingLimit},${resultPage}`,(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  }

};


module.exports = equimentModels;
