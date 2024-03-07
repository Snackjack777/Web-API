import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';
 import { insertmovie } from "../model/insert";
export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from creators', (err, result, fields)=>{
      res.json(result);
    });
  });

  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from creators where creators_id = ?", [id], (err, result) => {
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
      "update  `creators` set `person_id`=?, `movie_id`, `type`=? where `creators_id`=?";
    sql = mysql.format(sql, [
      movie.person_id,
      movie.movie_id,
      movie.type,
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
      "INSERT INTO `creators`(`person_id`, `movie_id`, `type`=?) VALUES (?,?)";
    sql = mysql.format(sql, [
        movie.person_id,
        movie.movie_id,
        movie.type
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, movie_id: result.insertId });
    });
  });