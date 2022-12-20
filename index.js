console.clear();
import express from 'express';
import dotenv from 'dotenv';
import {USERS_BBDD} from './bbdd.js';

dotenv.config();

const expressApp = express();
const PORT = 3000;

expressApp.use(express.json());
expressApp.use(express.text());

//Obtener detalles de una cuenta a partir del guid
expressApp.get('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const user = USERS_BBDD.find((user) => user.guid === guid);

    if (!user) return res.status(404).send();

    return res.send(user);
});

//Crear cuenta
expressApp.post('/account', (req, res) => {
    const { guid, name } = req.body;

    if(!name || !guid) return res.state(400).send();

    const user = USERS_BBDD.find((user) => user.guid === guid)

    if (user) return res.status(409).send();

    USERS_BBDD.push({
        guid, name
    })

    return res.send();
});

//Actualizar nombre de cuenta
expressApp.patch('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;

    if(!name) return res.state(400).send();

    const user = USERS_BBDD.find((user) => user.guid === guid)

    if (!user) res.status(404).send();

    user.name = name;

    return res.send();
});

//Eliminar cuenta
expressApp.delete('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);

    if (userIndex === -1) res.status(404).send();

    USERS_BBDD.splice(userIndex, 1);

    res.send();
});

expressApp.listen(PORT, () => { 
    console.log('Servidor levantado en el puerto 3000');
});