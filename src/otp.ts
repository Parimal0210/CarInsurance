export class Otp {
    customerName:string;
    email: string;
    phoneNumber: number;
    otpCode: number;
    expiryDate: string;
        
    constructor(customerName: string, email: string,  phoneNumber: number, otpCode: number, expiryDate: string){
        this.customerName = customerName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.otpCode = otpCode;
        this.expiryDate = expiryDate;
    }
}