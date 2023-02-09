const indexR = require("./index");
const usersR = require("./users");
const foodsR = require("./cakes");
const carsR = require("./cars");


exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/cakes",foodsR);
  app.use("/cars",carsR);

}