import { Request, Response } from "express";
import * as request from "request";
import Feed from "../models/Feed";

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

  public async getFeed(req: Request, res: Response) {
    const { title } = req.query;
    if (title) {
      try {
        await Feed.find({ title: title }, (err, docs) => {
          if (err) {
            res.status(409).json({ message: err.message });
          } else {
            res.json(docs);
          }
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Please send title as query parameter." });
    }
  }

  public async getAllFeeds(req: Request, res: Response) {
    try {
      await Feed.find( {}, (err, docs) => {
        if (err) {
          res.status(409).json({ message: err.message });
        } else {
          res.json(docs);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }

  public async deleteFeed(req:Request, res:Response){
    const { title } = req.query;
    if (title) {
      try {
        await Feed.deleteOne({ title: title }, null, (err) => {
          if (err) {
            res.status(500).json({ message: err.message });
          } else {
            res.status(200).json({message:`${title} deleted`});
          }
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Please send title as query parameter." });
    }
  }
}
