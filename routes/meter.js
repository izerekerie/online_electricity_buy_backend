import express from 'express'

import {getMeters,getMeter,createMeter,updateMeter,deleteMeter,} from '../controllers/meterController'
const router=express.Router();

router.get('/',getMeter)
router.get('/:id',getMeter)
router.post('/',createMeter)
router.patch('/:id',updateMeter)
router.delete('/:id',deleteMeter)

export default router