import express from 'express'
import { getMeter } from '../controllers/meterController.js';
// import {getMeters,getMeter,createMeter,updateMeter,deleteMeter,} from '../controllers/meterController'
export const  meterRoutes=express.Router();

meterRoutes.get('/',getMeters)
meterRoutes.get('/:id',getMeter)
meterRoutes.post('/',createMeter)
meterRoutes.patch('/:id',updateMeter)
meterRoutes.delete('/:id',deleteMeter)
export default {
    meterRoutes: express.Router()
  }