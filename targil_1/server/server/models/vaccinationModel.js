import mongoose from 'mongoose';

const vaccinationSchema=new mongoose.Schema({
    Ptientid:{
        type:mongoose.Schema.Types.String,
        ref:'patient'
    },
    Date_vaccination:
    {
       type: [{
            date_of_recived:Date,
            manufacturer:String
        }
       ],
       validate:[Limit,'{PATH} exceeds the limit of 4']
    } ,
    date_receiving_positive_result:Date,
    date__of_recovery:
    {
        type: Date,
        validate: [
            {
                validator: function(value) {
                    // בדיקה האם תאריך הקבלת תוצאה חיובית גדול מתאריך החלמה
                    return value>this.date_receiving_positive_result;
                },
                message: 'Date of recovery must be after date of receiving positive result'
            }
        ]
    }


},
{ versionKey: false });
function Limit(val) {
    return val.length <=4;
}

const vaccinationModel=mongoose.model("vaccination",vaccinationSchema);

export default  vaccinationModel;