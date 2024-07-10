/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


/* Importation: Interface - Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Position } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface - Service */
import { Interface_CmdCToFileData } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';


@Component({
  selector: 'app-s8o1o3-variable',
  templateUrl: './s8o1o3-variable.component.html',
  styleUrls: ['./s8o1o3-variable.component.css']
})
export class S8o1o3VariableComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) { }
  
  @Input() Input_VarL_FonctionId: string | number| null = ''
  ngOnInit(): void {
    this.TS_Active()
  }

  TS_Active(): void { 
    this.TS_GetData_From_File_CommandCenter()
  }
    
  public id_1: string | number = ''
  public id_2: string | number = ''
  public id_3: string | number = ''
  public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
  public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
  public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
  public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []
  TS_GetData_From_File_CommandCenter(): void {
    
      this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Variable().subscribe(data => {
        this.id_1 = data.id_1
        if (this.id_1 === '11_Post_Data_From_TS_Variable_ButtonClick_4') {
          this.id_1 = '11_Post_Data_From_TS_Variable_ButtonClick_5'
        }
      })
      this.TS_GetData_From_DB()
  }
  
  TS_PostData_To_File_CmdC(): void {
    
    const Data_Interface: Interface_CmdCToFileData = {
      id_1: this.id_1,
      id_2: '',
      id_3: '',
      id_4: '',
      tab_1: {},
      tab_2: {},
      tab_3: {},
      tab_4: {},
      tab_5: {},
      tab_6: {}}
    console.log('Start - FileRessources - Data_Interface', Data_Interface)
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_R_To_CmdC(Data_Interface)
  }

  public VarB_FileVarTransfert: boolean = true
  TS_VarTransfertDetail_ButtonClick(): void {
    this.VarB_FileVarTransfert = false
    this.id_1 = '8_Post_Data_From_VarTransfertDetail_1'
    this.TS_PostData_To_File_CmdC() 
  }
  TS_VarTransfert_True(): void {
    this.VarB_FileVarTransfert = true
  }

  public Tab_VarSelect: any[] = []
  public Tab_Type: any[] = []
  TS_GetData_From_DB(): void {
    this.S8o8o1RessourcesService.TS_Sce_GetAllVarTransfertData().subscribe(Tab_Full => {
      this.Tab_VarSelect = Tab_Full.map(item => {
        return { ...item, selectedVarType: item.VarType.FVType_VarType }
      })
    })
    this.S8o8o1RessourcesService.TS_Sce_GetAllTypeData().subscribe(Tab_Full => {
      this.Tab_Type = Tab_Full
    })
  }
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.Tab_VarSelect, event.previousIndex, event.currentIndex)
    }
  }

  public searchText: string = '';
  filterItems(arr: any[]): any[] {
    if (!arr) return []
    if (!this.searchText) return arr
    return arr.filter(item => {
      return item.FVTransf_VarTransfert ? item.FVTransf_VarTransfert.toLowerCase().includes(this.searchText.toLowerCase()) : false
    })
  }

  TS_Add_VarSelect() {
    const Tab_NewLine = {
      FVTransf_VarTransfert: ' ',
      FVTransf_FVType_Type: '1',
    }
    this.S8o8o1RessourcesService.TS_Sce_Post_VarTransfert(Tab_NewLine).subscribe(response => {
      console.log("Réponse du serveur:", response)
      const newId = response.FVTransf_Id
      console.log("ID de la nouvelle ligne:", newId)
      const newVarSelectItem = {
        FVTransf_Id: newId,
        FVTransf_VarTransfert: response.FVTransf_VarTransfert,
        VarType: {
          FVType_Id: response.FVTransf_FVType_Type, 
          FVType_VarType: 'Entier/String', 
        }
      }
      this.Tab_VarSelect.push({ ...newVarSelectItem })
      console.log('this.Tab_VarSelect',this.Tab_VarSelect)
    })
  }

  TS_Remove_VarSelect(index: number) {
    if (this.Tab_VarSelect.length > 0 && index < this.Tab_VarSelect.length) {
      const varTransfertId = this.Tab_VarSelect[index].FVTransf_Id
      this.Tab_VarSelect.splice(index, 1)
      this.S8o8o1RessourcesService.TS_Sce_Delete_VarTransfert(varTransfertId).subscribe(response => {
          console.log("Deleted: ", response)
      }, error => {
          console.error("Error: ", error)
      })
    } 
  }

  public editingIndex: number | null = null
  public tempEditValue: string = ''
  TS_StartEditing(index: number) {
    this.editingIndex = index;
    this.tempEditValue = this.Tab_VarSelect[index].FVTransf_VarTransfert
  }
  
  TS_SaveEditing(index: number) {
    this.Tab_VarSelect[index].FVTransf_VarTransfert = this.tempEditValue
    this.editingIndex = null
  }

  TS_CancelEditing(index: number) {
    setTimeout(() => {
      if (this.editingIndex === index) {
        this.editingIndex = null;
      }
    }, 100)
  } 
 
  TS_Update() {
    this.S8o8o1RessourcesService.TS_Sce_Put_VarTransfert(this.Tab_VarSelect).subscribe(response => {
      console.log(response)
    })
  }

  public Var_Selected: string | number = 1
  TS_VarTransfert_Selected(): void {
    this.Var_Selected = 1
  }
  TS_VarLocalTs_Selected(): void {
    this.Var_Selected = 2
  }
  TS_VarLocalHtml_Selected(): void {
    this.Var_Selected = 3
  }

}
