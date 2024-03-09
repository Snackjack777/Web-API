import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';
 import { insertmovie } from "../model/insert";
export const router = express.Router();

 router.get("/", (req, res) => {
    conn.query('select * from person', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from person where person_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });

  router.put("/:id", (req, res) => {
    let id = +req.params.id;
    let movie: insertmovie = req.body;
    let sql =
      "update  `person` set `name`=?, `profile`=?, `img`=? where `person_id`=?";
    sql = mysql.format(sql, [
      movie.name,
      movie.profile,
      movie.img,
      id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows });
    });
  });


  router.post("/", (req, res) => {
    let movie: insertmovie = req.body;
    let sql =
      "INSERT INTO `person`(`name`, `profile`, `img`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
      movie.name,
      movie.profile,
      movie.img
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, person_id: result.insertId });
    });
  });