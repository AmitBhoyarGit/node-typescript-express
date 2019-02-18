import {App} from './app'
class Server {
    private PORT = process.env.PORT || 7777;
    constructor(){
        console.log("Initializing server...");
        this.start();
    }

    private start(){
        let myApp = new App().app;
        myApp.listen(this.PORT, () =>{
            console.log(`Express server listing on port ${this.PORT}`)
        })
    }
}

new Server();