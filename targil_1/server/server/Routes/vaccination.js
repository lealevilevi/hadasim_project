import express from 'express';
import * as vaccination from '../Controller/vaccination.js';
// import verifyToken from '../middelware/verifyToken.js';
const router = express.Router();

   
router.post('/',vaccination.addVaccination)
router.put('/',vaccination.updateVaccination)
router.get('/:id',vaccination.getVaccinationByPatientId)
router.delete('/:id',vaccination.deleteVaccination)
router.get('/',vaccination.getVaccinations)

export default router;
