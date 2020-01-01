import {Schema, model} from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Need name']
    },
    amount: {
        type: Number,
        default: 1
    }
});

export default model('Items', schema);
