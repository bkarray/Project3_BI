import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S6o9ServiceService {

  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}

  TS_Sce_GetAllTables(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/URL_GetAllTables/');
  }

  TS_Sce_CreatNewTable(val:any){
    return this.http.post(this.APIUrl+'/URL_CreatNewTable/',val)
  }

  TS_Sce_DeleteTable(tableName: string) {
    return this.http.post(`${this.APIUrl}/URL_DeleteTableByName/`, { tableName });
  }

  TS_Sce_GetFields(tableName: string): Observable<any> {
    return this.http.get(`${this.APIUrl}/URL_Get_Fields/${tableName}/`);
  }
  
  TS_ImportData(tableName: string, selectedFields: string[]): Observable<any> {
    return this.http.post(`${this.APIUrl}/URL_ImportData/`, { tableName, selectedFields });
  }
  TS_Sce_GetTableData(tableName: string): Observable<any> {
    return this.http.get(`${this.APIUrl}/URL_GetTableData/${tableName}/`);
  }

  

  TS_Sce_AddFields(tableData: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/URL_Add_Field/`, tableData);
  }


  TS_Sce_UpdateField(fieldId: string, updateData: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/URL_Update_Field/${fieldId}/`, updateData);
  }

  TS_Sce_AddField(fieldData: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/URL_Add_Field/`, fieldData);
  }

  TS_Sce_DeleteField(fieldId: string): Observable<any> {
    return this.http.delete(`${this.APIUrl}/URL_Delete_Field/${fieldId}/`);
  }


}
