const express = require("express");
const http = require("http");
const path = require("path");

const {routesInit} = require("./routes/configRoutes")
require("./db/mongoConnect")

const app = express();
// כדי שנוכל לשלוח באדי מצד לקוח
app.use(express.json());
// להגדיר תיקייה סטטית שתיהיה התיקייה בשם פאבליק
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);

server.listen(3001);
// npm install -> כדי להתקין פרוייקט מוכן, שיותקנו בו כל המודולים