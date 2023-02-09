const express = require("express");
const {CarModel} = require("../models/carModel")
const router = express.Router();

// ?page=1&sort=
router.get("/", async(req,res) => {
  let perPage = 5;
  // אוספים את הקוואי פייג' אם לא קיים בכתובת
  // הערך ברירת המחדל שלו יהיה 0
  let page = req.query.page - 1 || 0;
  let sort = req.query.sort || "_id";
  let reverse = (req.query.reverse == "yes") ? 1 : -1;

  try{
    let data = await CarModel
    .find({})
    // limit - הגבלה של רשומות מצוגות בבקשה
    .limit(perPage)
    // skip - על כמה רשומות לדלג בשביל עמודים
    .skip(page * perPage) 
    // sort - מיון , כאשר אחד מייצג מקטן לגדול
    // ומינוס אחד מייצג מהגדול לקטן
    // reverse -> אם יהיה 1 או מינוס 1 לפי הקווארי למעלה
    // [] -> כדי לאסוף את הערך במשתנה סורט ואל את סורט כמאפיין
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// /search?s=
router.get("/search", async(req,res) => {
    try{
      let search = req.query.s;
      // SELECT * FROM cars WHERE car LIKE %searchExp% OR car_color LIKE %searchExp%
      // searchExp = דואג לשלוף את המדיע כביטוי ולא כסטרינג
      // ככה שבחיפוש גם אם רק חלק מהביטוי מופיע ימצא אותו
      // "i - מבטל את הקייס סינסטיב, של אותיות גודלות/קטנות"
      let searchExp = new RegExp(search,"i")
      let data = await CarModel.find({$or:[{car:searchExp},{car_color:searchExp}]}).limit(20);
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })

module.exports = router;