import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    starting_price: {
        type: Number,
        required: true
    },
    current_price: {
        type: Number,
        required: true
    },
    starting_time: {
        type: Number,
        required: true
    },
    ending_time: {
        type: Number,
        required: true
    },
    starting_date: {
        type: Date,
        required: true
    },
    ending_date: {
        type: Date,
        requied: true
    },
    highestBidder: {
        type: String
    }
},{timestamps: true})

let auctionModel = mongoose.model("auction", auctionSchema);

export default auctionModel;