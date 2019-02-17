import {Request, Response} from 'express';
import * as request from 'request'

export class MainController {
    constructor(){

    }

    public async getCurrencyData(req : Request, res: Response){
        //res.json({data : "70.01"}).status(200);
            request({
              uri: 'https://api.exchangeratesapi.io/latest?base=USD',
              qs: {
              }
            }, (error, response, body)=>{
                if (!error && response.statusCode === 200) {
                    res.json(body);
                  } else {
                    res.json(error);
                  }
            })

        }
}