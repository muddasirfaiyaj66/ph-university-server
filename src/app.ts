
import express from 'express';
import cors from 'cors';
import { Application} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1',router)


app.use(globalErrorHandler)

//not found route
app.use(notFound)
export default app;