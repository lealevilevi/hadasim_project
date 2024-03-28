
import mongoose from 'mongoose';
import isIsraeliIdValid from 'israeli-id-validator';

const { Schema } = mongoose;

const patientSchema=new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        validate:{
        validator: isValidIsraeliID,
        message: 'ID is not valid 😡'
        }
    },
    first_name: {
        type: String,
        required: true,

    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        numBulding: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    // בדיקה האם הערך הוא מספר שלם חיובי
                    return Number.isInteger(value) && value > 0;
                },
                message: 'Building number must be a positive integer'
            }
        }
    },
    image: {
        type: String
    },
    birthDate: {
        type: Date,
        required: true,
        validate: [
            {
                validator: function(value) {
                    // בדיקה האם תאריך הלידה קטן מהתאריך הנוכחי
                    return value < new Date();
                },
                message: 'Birth date must be in the past'
            }
        ]
    },
    tel: {
        type: String,
     
    },
    pel: {
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



const patientModel = mongoose.model("patients", patientSchema);

export default patientModel;
