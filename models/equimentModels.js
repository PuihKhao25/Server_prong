var db = require("../config/connectDB");

var equimentModels = {
  create: function (equipment, result) {
    db.query("INSERT INTO equipments SET?", equipment, (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },
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
  update: function (id, equipment, result) {
    db.query(
      "UPDATE equipments SET name=?,place=?,image=?,dates=? WHERE id =?",
      [equipment.name, equipment.place, equipment.image, equipment.dates, id],
      (err, res) => {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  },
  list: function (result) {
    db.query("SELECT * FROM equipments ", (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },
  findById: function (id, result) {
    db.query("SELECT * FROM equipments WHERE id =?", [id], (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
  },
  pagination: function(limit,offset ,result){
    db.query(`select * from equipments LIMIT ${limit} OFFSET ${offset}`,(err,res)=>{
      if(err){
        result (null,err)
      }else{
        result (null,res)
      }
    })
  }
};

module.exports = equimentModels;
