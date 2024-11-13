import express from 'express';
import getAuction from '../controllers/auctionControllers/getAuction.js';
import getAuctions from '../controllers/auctionControllers/getAuctions.js';
import createAuction from '../controllers/auctionControllers/createAuction.js';
import updateAuction from '../controllers/auctionControllers/updateAuction.js';

const router = express.Router();

router.get('/', getAuctions);

router.get("/:id", getAuction);

router.post("/", createAuction);

router.delete("/:id", (req, res)=>{
    res.json({msg: "DELETE a single auction"})
})

router.patch("/", updateAuction);

export default router;