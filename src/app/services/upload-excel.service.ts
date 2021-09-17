import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadExcelService {
private upload_excelfile_url = "http://49.248.214.214:8080/rebate_data/uploadExcelFile";

constructor(private httpClient: HttpClient) { }

 upload(file:any):Observable<any>{
   const formData = new FormData();

   formData.append("file", file, file.name);

   return this.httpClient.post(this.upload_excelfile_url, formData)
 }
}
