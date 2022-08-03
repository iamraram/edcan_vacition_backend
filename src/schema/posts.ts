import mongoose from 'mongoose'

const sch = new mongoose.Schema({
    num: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    comment: {
        type: Array<String>,
    }
})

const postsSchema = mongoose.model('Content', sch)

export default postsSchema