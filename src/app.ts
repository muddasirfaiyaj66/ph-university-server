import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials:true }));

//application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`
        <div style="display: flex; justify-content: center; align-items: center; text-align: center;color:white;background-color:black; height:100vh; width:full">
          <div>
          <h1 >Welcome to <span style="color:#4ef037">PH</span> <span style="color:yellow">  University</span> <span style="color:#ff0000">Server</span> 😊</h1>
           <p >Please explore the API endpoints at <a href="https://github.com/muddasirfaiyaj66/ph-university-server.git">https://github.com/muddasirfaiyaj66/ph-university-server.git</a></p>
          </div>
        </div>
    
    `);
});
app.use(globalErrorHandler);

//not found route
app.use(notFound);
export default app;
