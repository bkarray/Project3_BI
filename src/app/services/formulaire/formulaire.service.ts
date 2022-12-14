import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {
  static deleteUpdate(id: any) {
    throw new Error('Method not implemented.');
  }
  
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}
  getAllFormulaire(){
    return this.http.get(this.APIUrl+'/formulaire/')
  }
  addNewFormulaire(val:any){
    return this.http.post(this.APIUrl+'/formulaire/',val)
  }
  getReponsesByFormulaire(id:any){
    return this.http.get(this.APIUrl+'/reponses/'+id) 
  }
  getServices(id:any){
    return this.http.get(this.APIUrl+'/services/'+id)
  }
  getFormulaireById(id:any){
    return this.http.get(this.APIUrl+'/formulaire/'+id)
  }
  creatNewTable(val:any){
    return this.http.post(this.APIUrl+'/creatTable/',val)
  }
  deleteTable(id:any){
    return this.http.post(this.APIUrl+'/deleteTable/'+id,{})
  }
  addNewfields(val:any){
    return this.http.post(this.APIUrl+'/addFields/',val)
  }
  addForeignKey(val:any){
    return this.http.post(this.APIUrl+'/addForeignKey/',val)
  }
  getServicesByformulaire(id:any){
     return this.http.get(this.APIUrl+'/servicesByFormulaire/'+id);
  }
  creatNewService(val:any){
    return this.http.post(this.APIUrl+'/services/',val)
  }
  updateService(val:any){
    return this.http.put(this.APIUrl+'/services/',val)
  }
  creatNewReponce(val:any){
    return this.http.post(this.APIUrl+'/reponses/',val)
  }
  getReponseById(id:any){
   return this.http.get(this.APIUrl+'/reponseById/'+id)
  }
  getServicesByReponse(id:any,val:any){
    return this.http.post(this.APIUrl+'/servicesByReponse/'+id,val)
  }
  updateReponse(val:any){
    return this.http.put(this.APIUrl+'/reponses/',val)
  }
  getFields(id:any){
    return this.http.get(this.APIUrl+'/fields/'+id)
  }
  postField(val:any){
    return this.http.post(this.APIUrl+'/fields/',val)
  }
  getTables(id:any){
    return this.http.get(this.APIUrl+'/table/'+id)
  }
  getAllTables(){
    return this.http.get(this.APIUrl+'/table/')
  }
  getAllInformation(val:any):Observable<any[]> {
    return this.http.post<any[]>(this.APIUrl+'/getAll/',val)
  }
  getInfoSup(val:any):Observable<any[]> {
    return this.http.post<any[]>(this.APIUrl+'/getBySup/',val)
  }
  getAllFields(id:any){
    return this.http.get(this.APIUrl+'/getAllFields/'+id)
  }
  getFieldsInArchive(id:any){
    return this.http.get(this.APIUrl+'/getFieldsInArchive/'+id)
  }
  updateField(val:any){
    return this.http.put(this.APIUrl+'/fields/',val)
  }
  creatFieldToServ(val:any){
    return this.http.post(this.APIUrl+'/fields/',val)   
  }
  workingServices(id:any){
    return this.http.get(this.APIUrl+'/workingServices/'+id)
  }
  getServsExamples(){
    return this.http.get(this.APIUrl+'/servsExamples/')
  }
  deleteFormulaire(id:any){
    return this.http.delete(this.APIUrl+'/formulaire/'+id)
  }
  updateFieldPlace(id:any,val:any){
    return this.http.put(this.APIUrl+'/updateFieldPlace/'+id,val)
  }
  creatRelationUserServ(val:any){
    return this.http.post(this.APIUrl+'/relationUserServ/',val)
  }
  getUsersofServ(id:any){
    return this.http.get(this.APIUrl+'/getUsersofServ/'+id)
  }
  upDateFieldVal(val:any){
    return this.http.post(this.APIUrl+'/updateRow/',val)
  }
  addNewRow(val:any){
    return this.http.post(this.APIUrl+'/addRow/',val)
  }
  updateReponseEtap(id:any,val:any){
    return this.http.put(this.APIUrl+'/updateReponseEtap/'+id,val)
  }
  putServInArchive(id:any){
    return this.http.delete(this.APIUrl+'/putServInArchive/'+id)
  }
  putFieldInArchive(val:any){
    return this.http.put(this.APIUrl+'/putFieldInArchive/',val)
  }
  deleteServUserRelation(val:any){
    return this.http.post(this.APIUrl+'/deleteServUser/',val)
  }
  sendMail(id:any){
    return this.http.post(this.APIUrl+'/sendMail/'+id,{})
  }
  updateServName(val:any){
    return this.http.put(this.APIUrl+'/updateServName/',val)
  }
  putReponseInArchive(id:any){
    return this.http.get(this.APIUrl+'/putReponseInArchive/'+id)
  }
  verifierUserWork(id:any){
    return this.http.get(this.APIUrl+'/verifierUserWork/'+id)
  }

  getLastUpdate(id:any){
    return this.http.get(this.APIUrl+'/refresh/'+id)
  }
  deleteUpdate(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.APIUrl+'/notifEdit/'+id)
  }
  addNewUpdate(val:any){
    return this.http.post(this.APIUrl+'/notifEdit/',val)
  }
  sendOneMail(id:any,val:any){
    return this.http.post(this.APIUrl+'/sendOneMail/'+id,val)
  }
  deleteRowInTable(val:any){
    return this.http.post(this.APIUrl+'/deleteRowInTable/',val);
  }
  getServExampleByName(val:any){
  return this.http.post(this.APIUrl+'/getServExampleByName/',val);
  }
  getFieldOutOfArchive(val:any){
    return this.http.post(this.APIUrl+'/getFieldOutOfArchive/',val);
  }
  getDataList(val:any){
    return this.http.post(this.APIUrl+'/getDataList/',val);
  }
}
