import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  static deleteUpdate(id: any) {
    throw new Error('Method not implemented.');
  }
  
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}
 
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
  addNewDataset(code_id:any,reponse_id:any){
    return this.http.put(this.APIUrl+'/add_new_data_set/'+code_id+'/'+reponse_id,{})
  }
  updatePrincipleGraph(val:any){
    return this.http.put(this.APIUrl+'/update_principle_graph/',val)
  }
  updateRelatedGraph(val:any){
    return this.http.put(this.APIUrl+'/update_related_graph/',val)
  }
  getCodeById(id:any){
    return this.http.get(this.APIUrl+'/get_code_by_id/'+id)
  }
  getReports(val:any){
    return this.http.post(this.APIUrl+'/get_reports/',val)
  }
  getDecisions(val:any){
    return this.http.post(this.APIUrl+'/get_decisions/',val)
  }
  getActions(val:any){
    return this.http.post(this.APIUrl+'/get_actions/',val)
  }
  updateReport(id:any,val:any){
    return this.http.put(this.APIUrl+'/update_report/'+id,val)
  }
  updateDecision(id:any,val:any){
    return this.http.put(this.APIUrl+'/update_decision/'+id,val)
  }
  addNewReport(idCode:any,val:any){
    return this.http.post(this.APIUrl+'/add_new_Report/'+idCode,val)
  }
  deleteReport(id:any){
    return this.http.delete(this.APIUrl+"/delete_report/"+id)
  }
  deleteDecision(id:any){
    return this.http.delete(this.APIUrl+'/delete_decision/'+id)
  }

  addNewDecision(idReport:any,val:any){
    return this.http.post(this.APIUrl+'/add_new_Decision/'+idReport,val)
  }
  updateAction(id:any,val:any){
    return this.http.put(this.APIUrl+'/update_action/'+id,val)
  }
  deleteAction(id:any){
    return this.http.delete(this.APIUrl+'/delete_action/'+id)
  }
  addNewAction(idDecision:any,val:any){
    return this.http.post(this.APIUrl+'/add_action/'+idDecision,val)
  }
  getCausesOrConsequences(val:any){
    return this.http.post(this.APIUrl+'/get_causes_consequences/',val)
  }
  addCauseToCode(idCode:any,idCause:any){
    return this.http.post(this.APIUrl+'/add_cause_to_code/'+idCode+'/'+idCause,{})
  }
  addConsequenceToCode(idCode:any,idConsequence:any){
    return this.http.post(this.APIUrl+'/add_consequence_to_code/'+idCode+'/'+idConsequence,{})
  }

  deleteCauseFromCode(idCode:any,idCause:any){
    return this.http.delete(this.APIUrl+'/delete_cause_from_code/'+idCode+'/'+idCause)
  }
  deleteConsequenceFromCode(idCode:any,idConsequence:any){
    return this.http.delete(this.APIUrl+'/delete_consequence_from_code/'+idCode+'/'+idConsequence)
  }
  getCodesByDashboardId(id:any){
    return this.http.get(this.APIUrl+'/codes_by_dashboard_Id/'+id)
  }
}
