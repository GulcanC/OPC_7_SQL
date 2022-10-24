const Sequilize = require("sequelize");
const sequilize = new Sequilize("groupmania_sql", "root", "1571256,Gaps", {
  host: "localhost",
  dialect: "mysql",
});

sequilize
  .authenticate()
  .then(() => {
    console.log("yes");
  })
  .catch((err) => {
    console.log("no");
  });
/*  
import { Sequelize } from "sequelize";
export default new Sequelize("groupmania_sql", "root", "1571256,Gaps", {
  dialect: "mysql",
  host: "localhost",
});
 */
