import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';
 import { insertmovie } from "../model/insert";
export const router = express.Router();

// Path params
// router.get("/:id", (req, res) => {
//     res.send("Get in imdb.ts id: " + req.params.id);
//   });

//Query params
// router.get("/", (req, res) => {
//     if (req.query.id) {
//       res.send("Get in imdb.ts Query id: " + req.query.id);
//     } else {
//       res.send("Get in imdb");
//     }
//   });

  // Body String
//   router.post("/", (req, res) => {
//     let body = req.body; 
//     res.send("Get in imdb.ts body: " + body);
//   });

  // router.get("/", (req, res) => {
  //   conn.query('select * from movies', (err, result, fields)=>{
  //     res.json(result);
  //   });
  // });

  

  router.get("/", (req, res) => {
    conn.query('SELECT `movie_id`, `title`, `plot`, `poster` FROM `movies` WHERE 1', (err, result, fields)=>{
      if (err) {
        res.status(500).json({ error: err.message });
        res.json(result);
        return;
      }
      res.json(result);
    });
  });
  
