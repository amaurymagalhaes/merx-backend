import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TransactionController from './app/controllers/TransactionController';
import BalanceController from './app/controllers/BalanceController';
import FriendshipController from './app/controllers/FriendshipController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/balance/:id', BalanceController.show);
routes.post('/balance', BalanceController.store);
routes.post('/friendship', FriendshipController.store);
routes.get('/friendship/:id', FriendshipController.show);
routes.delete('/friendship/:id', FriendshipController.delete);
routes.get('/user/byId/:id', UserController.showId);
routes.get('/user/byUsername/:username', UserController.showUser);
routes.get('/transaction/:id', TransactionController.show);
routes.post('/transaction', TransactionController.store);
routes.get('/transactions', TransactionController.index);
routes.put('/users', UserController.update);

export default routes;
