import profileModel from "../../models/profileModel.js";
import auctionModel from "../../models/auctionModel.js";

export default async function getProfile(req, res){
    try{
        const _username = req.params.id;
        const profile = await profileModel.findOne({username : _username})
        const createdAuctions = await auctionModel.find({creator: _username})
        let wonAuctions = [];
        let curTime = Date.now()
        for(let i = 0; i < profile.items.length; i++){
            let temp = await auctionModel.findById(profile.items[i]);
            if(temp.highestBidder == _username && curTime > temp.ending_time){
                wonAuctions.push(temp);
            }
        }

        let numOfWon = wonAuctions.length;
        const profile2 = await profileModel.findOneAndUpdate({username: _username}, {numOfItems: numOfWon});

        let responseObj = {name: profile2.name, username: profile2.username, password: profile2.password, numOfWon: numOfWon, auctionsCreated: createdAuctions, auctionsWon: wonAuctions};
        if(!profile){
            res.status(404).json({error: "Error 404: NO such profile exists"})
        }
        else{
        res.status(200).json(responseObj);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}