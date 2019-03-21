import app from './app';
import db from './models';

const port = process.env.PORT || 3001;

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ​${port}​!`));
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });