import * as express from 'express';
import {MainController} from './../controllers';

let routers = express.Router();
const controllers = new MainController();
routers.get('/get/currencyData', controllers.getCurrencyData);
routers.post('/post/user', controllers.createFeed);

export = routers;