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
    return this.http.get(this.APIUrl+'/getAllFields/'+id).toPromise()
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
  creatChoice(val:any){
    return this.http.post(this.APIUrl+'/crud_choices/',val);
  }
  correctChoice(val:any){
    return this.http.put(this.APIUrl+'/crud_choices/',val);
  }
  getChoicesFromField(id:any){
    return this.http.get(this.APIUrl+'/crud_choices/'+id);
  }
  deleteChoice(id:any){
    return this.http.delete(this.APIUrl+'/crud_choices/'+id);
  }
  getChoices(id:any){
    return this.http.get(this.APIUrl+'/getChoices/'+id)
  }
  giveInformationOnChoice(val:any){
    return this.http.post(this.APIUrl+'/giveInformationOnChoice/',val)
  }


  createFileExcelRef(val:any){
    return this.http.post(this.APIUrl+'/crud_excelFile/',val)
  }


  getFilesFrom(id:any){
    return this.http.get(this.APIUrl+'/crud_excelFile/'+id)
  }


  deleteAllRows(id:any){
    return this.http.get(this.APIUrl+'/deleteAllRows/'+id)
  }
  deleteUploadRows(val:any){
    return this.http.post(this.APIUrl+'/deleteUploadRows/',val)
  }

  filesUploaded(id:any){
    return this.http.get(this.APIUrl+'/filesUploaded/'+id)
  }


  uploadFile(val:any){
    return this.http.post(this.APIUrl+'/uploadFile/',val)
  }
  ColumnNames(id:any){
    return this.http.get(this.APIUrl+'/ColumnNames/'+id)
  }
  uploadData(id:any,val:any){
    return this.http.post(this.APIUrl+'/uploadData/'+id,val)
  }
  getCount(idR:any,val:any){
    return this.http.post(this.APIUrl+'/getCount/'+idR,val)
  }
  deleteFile(){
    return this.http.delete(this.APIUrl+'/crud_excelFile/')
  }
  exportData(id:any){
    return this.http.get(this.APIUrl+'/export_excelFile/'+id,{ responseType: 'blob' })
  }
  compileCode(val:any,id:any){
    return this.http.post(this.APIUrl+'/compile_code/'+id,val)
  }
  saveCode(val:any){
    return this.http.post(this.APIUrl+'/save_code/',val)
  }

  getCodes(id:any){
    return this.http.get(this.APIUrl+'/crud_code/'+id)
  }
  correctCode(id:any,val:any){
    return this.http.post(this.APIUrl+'/correct_code/'+id,val)
  }
  deleteCode(id:any){
    return this.http.delete(this.APIUrl+'/crud_code/'+id)

  }
  addFirstRow(id:any){
    return this.http.get(this.APIUrl+'/add_first_row/'+id)
  }


  getGroups(){
    return this.http.get(this.APIUrl+'/crud_group/');
  }
  getFormsByGroups(val:any){
    return this.http.post(this.APIUrl+'/get_forms_by_group/',val)
  }

  creatGroup(val:any){
    return this.http.post(this.APIUrl+"/crud_group/",val)
  }
  createRelationFormGroup(val:any){
    return this.http.post(this.APIUrl+'/create_relation_form_group/',val).toPromise()
  }
  getOneField(id:any){
    return this.http.get(this.APIUrl+'/get_one_field/'+id)
  }
  deleteGroup(id:any,idTo:any){
    return this.http.delete(this.APIUrl+"/crud_group/"+id+"/"+idTo)
  }
  getRestForms(val:any){
    return this.http.post(this.APIUrl+'/get_rest_of_forms/',val)
  }
  checkFormGroups(id:any){
    return this.http.get(this.APIUrl+'/check_form_groups/'+id)
  }
  deleteGroupFormRelation(idG:any,idF:any){
    return this.http.delete(this.APIUrl+"/delete_group_form_relation/"+idG+"/"+idF)
  }
}
