import auctionModel from "../../models/auctionModel.js";

export default async function createAuction(req, res){
    const {_username, title, description, startingPrice, startTime, endTime} = req.body;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const startTimeUnix = startDate.getTime();
    const endTimeUnix = endDate.getTime();
    try{
        const auction = await auctionModel.create({creator: _username, title, description, starting_price: startingPrice, current_price: -1, starting_date: startDate, ending_date: endDate, starting_time: startTimeUnix, ending_time: endTimeUnix, highestBidder: ''});
        res.status(200).json(auction);
    } catch(error){
        res.status(400).json({error: error.message})
    }
}