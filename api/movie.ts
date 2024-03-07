import  mysql  from 'mysql';
import express from "express";
 import { conn } from "../dbconn";
import { insertmovie } from "../model/insert";


export const router = express.Router();


router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select * from movies where movie_id  = ?" , [id], (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    });
  });

  // router.get("/search/fields", (req, res) => {
  //   conn.query(
  //     "select * from movies where (movie_id IS NULL OR movie_id = ?) OR (ttitle IS NULL OR ttitle like ?)",
  //     [ req.query.id, "%" + req.query.name + "%"],
  //     (err, result, fields) => {
  //     if (err) throw err;
  //       res.json(result);
  //     }
  //   );
  // });
  

  router.post("/", (req, res) => {
    let movie: insertmovie = req.body;
    let sql =
      "INSERT INTO `movies`(`ttitle`, `plot`, `poster`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
      movie.ttitle,
      movie.plot,
      movie.poster
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, movie_id: result.insertId });
    });
  });





  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from movies where movie_id = ?", [id], (err, result) => {
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
      "update  `movies` set `ttitle`=?, `plot`=?, `poster`=? where `movie_id`=?";
    sql = mysql.format(sql, [
      movie.ttitle,
      movie.plot,
      movie.poster,
      id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows });
    });
  });



  router.get("/", (req, res) => {
    const searchTerm = req.query.searchTerm;

    // Construct the query with explicit aliases and type inclusion
    const query = `
        SELECT m.ttitle AS movie_title, m.poster, m.plot,
               GROUP_CONCAT(DISTINCT p.name, ' (', s.type, ')') AS stars,
               GROUP_CONCAT(DISTINCT c.name, ' (', cr.type, ')') AS creator
        FROM movies m
        INNER JOIN stars s ON m.movie_id = s.movie_id
        INNER JOIN person p ON s.person_id = p.person_id
        INNER JOIN creators cr ON m.movie_id = cr.movie_id
        INNER JOIN person c ON cr.person_id = c.person_id
        WHERE m.ttitle LIKE '%${searchTerm}%'
        GROUP BY m.ttitle, m.poster, m.plot;
    `;

    conn.query(query, (err, result, fields) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json(result);
    });
});