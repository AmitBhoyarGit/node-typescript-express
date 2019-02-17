import {Request, Response, response} from 'express';

export class MainController {
    constructor(){

    }

    public async getCurrencyData(req : Request, res: Response){
        res.json({data : "70.01"}).status(200);
    }
}