import express, {Router} from 'express';
import {config} from 'dotenv';
import http, {Server} from 'http';
import InitRouter from './routes';

config();

class App {
    private readonly PORT: number;
  
    private readonly MODE: string;
  
    private readonly app: express.Application;
  
    private readonly router: Router;
  
    private readonly server: Server;
  
    constructor() {
      this.PORT = Number(process.env.PORT) || 8080;
      this.MODE = process.env.NODE_ENV || 'development';
      this.app = express();
      this.router = Router();
      this.app.use(this.router);
      this.server = http.createServer(this.app);
      this.connect();
      this.listen();
    }
  
    private listen(): void {
      this.server.listen(this.PORT, () => {
        console.log(`App is listening on the port ${this.PORT} on ${this.MODE} mode`);
      });
    }
  
    private async connect(): Promise<void> {
  
      new InitRouter(this.app);
    }
  }
  
  const app = new App();
  
  process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
  });
  
  process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
  });
  
