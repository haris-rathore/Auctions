import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    numOfItems: {
        type: Number,
        required: true
    },
    items: {
        type: [String],
        required: true
    }
},{timestamps: true})

let profileModel = mongoose.model("profile", profileSchema);

export default profileModel;