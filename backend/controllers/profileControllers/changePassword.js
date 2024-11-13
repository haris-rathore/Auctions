import profileModel from "../../models/profileModel.js";

export default async function changePassword(req, res){
    try{
        const {_username, newPassword, currentPassword} = req.body;
        let profile = await profileModel.findOneAndUpdate({username : _username, password: currentPassword}, {password: newPassword})
        profile = await profileModel.findOne({username: _username, password: newPassword})
        if(!profile){
            res.status(404).json({error: "Error 404: Incorrect Password"})
        }
        else{
        res.status(200).json(profile);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}