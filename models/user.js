import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true 
    },
    password: {
        type: String,
        unique: true,
        required: true 
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", schema);

export default User;
