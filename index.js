import app from './app';
import db from './models';

const port = process.env.PORT || 3001;
const connectDb = async (retries = 5) => {
  while (retries) {
    try {
      await db.sequelize.sync()
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};
connectDb();

app.listen(port, () => console.log(`App listening on port ​${port}​!`));
    console.log("Connection has been established successfully.");

