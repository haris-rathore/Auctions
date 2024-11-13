import profileModel from "../../models/profileModel.js";
import auctionModel from "../../models/auctionModel.js";

export default async function createProfile(req, res){
    const {_name, _username, _password} = req.body;
    if(_name){
        try{
            const profile = await profileModel.create({name: _name, username: _username, password: _password, numOfItems: 0, items: []});
            res.status(200).json(profile);
        } catch(error){
            if(error.code === 11000){
                res.status(400).json({error: "duplicate"})
            }
            else{
                res.status(400).json({error: error.message})
            }
        }
    }
    else{
        try{
            const profile = await profileModel.findOne({username : _username, password: _password})
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
    
}