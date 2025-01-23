import express from 'express';
import waterRouters from './water.js';
import authRouters from './auth.js';

const routers = express.Router();
routers.use('/users', authRouters);
routers.use('/water', waterRouters);

export default routers;
