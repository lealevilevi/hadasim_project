export type Patient={
    id:string,
    first_name:string,
    last_name:string,
    address:{
        city:string,
        street:string,
        numBulding:number

    },
    image:string,
    birthDate:Date,
    tel:string,
    pel:string
}

export type Vaccination=
{
    Ptientid:string
    Date_vaccination:
    
       [
        {
            date_of_recived:Date,
            manufacturer:string
        }
       ],
    
    date_receiving_positive_result:Date,
    date__of_recovery:Date
}
export type User=
{
    id:string,
    password:string
}

export type AuthUser=
{
    user:User,
    token:string
}
