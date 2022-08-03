import mongoose from 'mongoose'

const sch = new mongoose.Schema({
    num: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userPw: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isMale: {
        type: Boolean
    },
    friendly: {
        type: Number
    }
})

const userSchema = mongoose.model('Content', sch)

export default userSchema