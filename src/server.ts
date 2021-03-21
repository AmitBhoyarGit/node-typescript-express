import { App } from "./app";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config();

class Server {
  private PORT = process.env.PORT || 7777;
  private CONNECTION_URL =
    `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@cluster0.72gck.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  constructor() {
    console.log("Initializing server...");
    this.start();
  }

  private connectMongo = async () => {
    console.log("connecting to mongo database .......");
    mongoose.connect(this.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Mongo db connected on port", this.PORT);
      })
      .catch((error) => console.log(`${error} did not connect`));

    // mongoose.set("useFindAndModify", false);
  };

  private async start() {
    try {
        await this.connectMongo();
    } catch (error) {
        console.log(`${error} did not connect`)
    }
    
    const myApp = new App().app;
    myApp.listen(this.PORT, () => {
      console.log(`Express server listing on port ${this.PORT}`);
    });
  }
}
new Server();
