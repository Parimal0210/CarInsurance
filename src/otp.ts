export class Otp {
    name:string;
    email: string;
    mobileNumber: number;
    code: number;
    expiryDate: string;
    expiry:number;
        
    constructor(name: string, email: string,  mobileNumber: number, code: number, expiryDate: string,expiry:number){
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.code = code;
        this.expiryDate = expiryDate;
        this.expiry = expiry;
    }
}