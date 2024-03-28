
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema=new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        validate:{
        validator: isValidIsraeliID,
        message: 'ID is not valid 😡'
        }
    },
    password: {
        type: String,
        required: true,
    }
}, { versionKey: false });

export  function isValidIsraeliID(id) {
    // Check if ID is 9 digits
    if (!/^\d{9}$/.test(id)) {
        return false;
    }

    // Calculate check digit
    var sum = 0;
    for (var i = 0; i < 9; i++) {
        var digit = parseInt(id.charAt(i));
        var weight = (i % 2 === 0) ? 1 : 2;
        var product = digit * weight;
        sum += (product > 9) ? product - 9 : product;
    }

    // Check if the remainder is 0
    return sum % 10 === 0;
}

const userModel = mongoose.model("users", userSchema);

export default userModel;