import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static deleteUpdate(id: any) {
    throw new Error('Method not implemented.');
  }
    
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}



  getDashboardByUser(id:any){
    return this.http.get(this.APIUrl+'/crud_dashboard/'+id)
  }
  addNewDashboard(val:any){
    return this.http.post(this.APIUrl+'/crud_dashboard/',val)
  }
  deleteDashboard(id:any){
    return this.http.delete(this.APIUrl+'/crud_dashboard/'+id)
  }
  addSubDashboard(dashboardId:any,subDashboardId:any){
    const val ={
      Dashboard_Id:dashboardId,
      sub_dashboard_Id:subDashboardId
    }
    return this.http.post(this.APIUrl+'/add_sub_dashboard/',val)
  }
  addGraphToDashboard(dashboardId:any,codeId:any){
    const val={
      Dashboard_Id:dashboardId,
      Code_Id:codeId
    }
    return this.http.post(this.APIUrl+'/add_graph_to_dashboard/',val)
  }
  updateDashboardName(dashboardId:any,name:any){
    const val={
      Dashboard_Id:dashboardId,
      Dashboard_Name:name
    }
    return this.http.put(this.APIUrl+'/crud_dashboard/',val)
  }
  getGraphsByDashboardId(id:any){
    return this.http.get(this.APIUrl+'/get_graphs_by_dashboard_Id/'+id)
  }
  deleteGraphFromDashboard(dashboardId:any,graphId:any){
    const val={
      Dashboard_Id:dashboardId,
      Code_Id:graphId
    }
    return this.http.post(this.APIUrl+'/delete_graph_from_dashboard/',val)
  }
}
