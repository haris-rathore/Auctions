import auctionModel from "../../models/auctionModel.js";

export default async function getAuction(req, res){
    try{
        const { id } = req.params;
        const auction = await auctionModel.findById(id);
        if(!auction){
            res.status(404).json({error: "Error 404: NO such auction exists"})
        }

        res.status(200).json(auction);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}