export class Customer{
    name: string;
    customerId: number;
    vehicles: number;
    policies: number;
    amount: number;
    createdDate: string;
    policyId: number;
    constructor(name: string, customerId: number, vehicles: number, policies: number, amount: number, createdDate: string, policyId: number
        ){
        this.name = name;
        this.customerId = customerId;
        this.vehicles = vehicles;
        this.policies = policies;
        this.amount = amount;
        this.createdDate = createdDate;
        this.policyId = policyId;
    }
}