import express from 'express';
import * as patients from '../Controller/patients.js';
import middlewareWrapper from 'cors';
// import verifyToken from '../middelware/verifyToken.js';
const router = express.Router();
import middelware from '../middelware/upload.js';
import upload from '../middelware/upload.js';
import verifyToken from '../middelware/verifyToken.js';
router.post('/', upload.single('image') ,patients.addPatient)

router.put('/',verifyToken,patients.updatePatient)
router.get('/:id',patients.getPatientById)
router.get('/',verifyToken,patients.getPatients)
router.delete('/:id',verifyToken,patients.deletePatient)
router.get('/:image/:id',verifyToken,patients.getImageById)
export default router;