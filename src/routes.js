import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';


const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Iago dos Santos',
    email: 'iagost@outlook.com.br',
    password_hash: '012345',
    provider: false
  });

  return res.json(user);
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

export default routes;
