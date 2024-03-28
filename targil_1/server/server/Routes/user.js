import express from 'express';
import * as user from '../Controller/users.js';
// import verifyToken from '../middelware/verifyToken.js';
const router = express.Router();

   
router.post('/',user.addUser)
router.get('/:id',user.getUserById)


export default router;