import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { router } from './routes/main';
import helmet from 'helmet';

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
})