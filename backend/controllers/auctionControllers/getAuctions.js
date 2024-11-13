import auctionModel from "../../models/auctionModel.js";

export default async function getAuctions(req, res){
    try{
        const timeNow = Date.now();
        const auctions = await auctionModel.find({
            ending_time: { $gt: timeNow },
            starting_time: { $lt: timeNow },
          }).sort({createdAt: -1});
        res.status(200).json(auctions);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

