export class CustomerDetails{
   name: string;
   email: string;
   mobileNumber: string;
   address1: string;
   city: string;
   province: string;
   postalCode: string;
   idNumber: string;

    constructor(name: string,  email: string, mobileNumber: string,  address1: string, city: string, province: string, postalCode: string,  idNumber: string){
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address1 = address1;
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
        this.idNumber = idNumber;
    }
}