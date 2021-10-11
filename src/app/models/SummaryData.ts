import { Timestamp } from "rxjs/internal/operators/timestamp";

export class SummaryData{

    summaryDataId:number;
    month:number;
    year:number;
    customersCount:number;
    vehiclesCount:number;
    totalRefund:number;
    created_on:Date;

    constructor(){}
}