import express from "express";
 import { conn } from "../dbconn";
 import  mysql  from 'mysql';
 import { insertmovie } from "../model/insert";
export const router = express.Router();
  

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
  
