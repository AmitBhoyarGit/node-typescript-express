import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as routers from './routes'
export class App {
    public app : express.Application;
    constructor(){
        this.app = express();
        this.setRouters();
    }

    private configApp(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }

    private setRouters(){
        this.app.use(routers)
    }
}
