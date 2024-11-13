import auctionModel from "../../models/auctionModel.js";
import profileModel from "../../models/profileModel.js";
export default async function updateAuction(req, res){
    const {bid, _username, id} = req.body;
    const bidVal = Number(bid);
    try{
        const auction = await auctionModel.findOneAndUpdate({ _id: id}, {current_price: bidVal, highestBidder: _username});
        const prof = await profileModel.findOne({username: _username})
        let arr = prof.items;
        if(!arr.includes(String(id))){
            arr.push(id);
        }
        const pro = await profileModel.findOneAndUpdate({username: _username}, {items: arr})
        // const prof = await profileModel.findOneAndUpdate({username: _username}, {items: items.append(id)});
        const bi = {bidVal}
        res.status(200).json({bidVal: bidVal});
    } catch(error){
        res.status(400).json({error: error.message})
    }
}