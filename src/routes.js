import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TransactionsController from './app/controllers/TransactionsController';
import BalanceController from './app/controllers/BalanceController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/balance/:id', BalanceController.show);
routes.post('/balance', BalanceController.store);
routes.get('/user/byId/:id', UserController.showId);
routes.get('/user/byUsername/:username', UserController.showUser);
routes.get('/transaction/:id', TransactionsController.show);
routes.post('/transactions', TransactionsController.store);
routes.get('/transactions', TransactionsController.index);
routes.put('/users', UserController.update);

export default routes;
