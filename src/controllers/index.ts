import { Request, Response } from "express";
import * as request from "request";
import Feed from "../models/Feed"

export class MainController {
  constructor() {}

  public async getCurrencyData(req: Request, res: Response) {
    //res.json({data : "70.01"}).status(200);
    request(
      {
        uri: "https://api.exchangeratesapi.io/latest?base=USD",
        qs: {},
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          res.json(body);
        } else {
          res.json(error);
        }
      }
    );
  }

  public async createFeed(req: Request, res: Response) {
    console.log(req.body);

    const { title, message, selectedFile, creator, tags } = req.body;
    const newFeed = new Feed({
      title: title,
      message: message,
      creator: creator,
      tags: tags,
      selectedFile: selectedFile,
    });

    try {
      await newFeed.save();
      res.status(201).json(newFeed);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
}
