console.clear();
import dotenv from 'dotenv';
import express from 'express';
import accountRouter from './routes/account.js';

dotenv.config();

const expressApp = express();
const PORT = parseInt(process.env.PORT);

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use("/account", accountRouter);


expressApp.listen(PORT, () => { 
    console.log('Servidor levantado en el puerto: ' + PORT);
});