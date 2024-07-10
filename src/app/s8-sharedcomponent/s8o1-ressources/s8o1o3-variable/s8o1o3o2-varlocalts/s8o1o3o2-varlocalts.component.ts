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
import { Interface_Tab_IFU_Recherche } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Position } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface - Service */
import { Interface_CmdCToFileData } from '../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';
@Component({
  selector: 'app-s8o1o3o2-varlocalts',
  templateUrl: './s8o1o3o2-varlocalts.component.html',
  styleUrls: ['./s8o1o3o2-varlocalts.component.css']
})
export class S8o1o3o2VarlocaltsComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) { }
  
  ngOnInit(): void {
    this.TS_Active()

  }

  
  @Input() Input_VarL_FonctionId: string | number| null = ''
  public Var_Selected: string | number = ''
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Input_VarL_FonctionId'] && this.Tab_VarLocalTS) {
      this.TS_GetData_From_DB()  
      setTimeout(() => {
        this.Tab_VarLocalTS = this.Tab_VarLocalTS.filter(vl => 
          vl.Fonction && vl.Fonction.FFct_Id === this.Input_VarL_FonctionId)
      }, 100)
    } 
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

  public Tab_VarLocalTS: any[] = []
  public Tab_Fonction: any[] = []
  public Tab_Type: any[] = []
  TS_GetData_From_DB(): void {
    this.S8o8o1RessourcesService.TS_Sce_GetAllVarLocalTSData().subscribe(Tab_Full => {
      this.Tab_VarLocalTS = Tab_Full
      console.log('this.Tab_VarLocalTS', this.Tab_VarLocalTS)
    })
    this.S8o8o1RessourcesService.TS_Sce_GetAllFonctionData().subscribe(Tab_Full => {
      this.Tab_Fonction = Tab_Full
    })
    this.S8o8o1RessourcesService.TS_Sce_GetAllTypeData().subscribe(Tab_Full => {
      this.Tab_Type = Tab_Full
    })
    setTimeout(() => {
      this.Tab_VarLocalTS = this.Tab_VarLocalTS.filter(vl => 
        vl.Fonction && vl.Fonction.FFct_Id === this.Input_VarL_FonctionId)
    }, 100)
  }

/*
  TS_Drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.Tab_VarLocalTS, event.previousIndex, event.currentIndex)
    }
  }
*/

  public VarU_SearchText: string = '';
  TS_FilterItems(arr: any[]): any[] {
    if (!arr) return []
    if (!this.VarU_SearchText) return arr
    return arr.filter(item => {
      return item.FVTransf_VarTransfert ? item.FVTransf_VarTransfert.toLowerCase().includes(this.VarU_SearchText.toLowerCase()) : false
    })
  }

  TS_Add_VarSelect() {
    console.log('this.Input_VarL_FonctionId',this.Input_VarL_FonctionId)
    const Tab_NewLine = {
      FVLocalTS_VarLocalTS: 'NouvelleValeur',
      FVLocalTS_FVType_Type: '1', 
      FVLocalTS_FFct_Id: String(this.Input_VarL_FonctionId) 
    }
    this.S8o8o1RessourcesService.TS_Sce_Post_VarLocalTS(Tab_NewLine).subscribe(response => {
      console.log("Réponse du serveur:", response)
      const newId = response.FVLocalTS_Id;
      console.log("ID de la nouvelle ligne:", newId)
      const varTypeItem = this.Tab_Type.find(item => item.FVType_Id.toString() === Tab_NewLine.FVLocalTS_FVType_Type)
      const fonctionItem = this.Tab_Fonction.find(item => item.FFct_Id.toString() === Tab_NewLine.FVLocalTS_FFct_Id)
      const newVarSelectItem = {
        FVLocalTS_Id: newId,
        FVLocalTS_VarLocalTS: response.FVLocalTS_VarLocalTS,
        VarType: varTypeItem ? {
          FVType_Id: varTypeItem.FVType_Id,
          FVType_VarType: varTypeItem.FVType_VarType
        } : {},
        Fonction: fonctionItem ? {
          FFct_Id: fonctionItem.FFct_Id,
          FFct_Name: fonctionItem.FFct_Name
        } : {}
      }
      this.Tab_VarLocalTS.push(newVarSelectItem);
      console.log('this.Tab_VarLocalTS', this.Tab_VarLocalTS);
    })
  }


  public VarL_EditingIndex: number | null = null
  public VarU_TempEditValue: string = ''
  TS_StartEditing(index: number) {
    this.VarL_EditingIndex = index;
    this.VarU_TempEditValue = this.Tab_VarLocalTS[index].FVLocalTS_VarLocalTS
    console.log('this.VarU_TempEditValue',this.VarU_TempEditValue)
  }
  TS_CancelEditing(index: number) {
    setTimeout(() => {
      if (this.VarL_EditingIndex === index) {
        this.VarL_EditingIndex = null
      }}, 100)
  }
  TS_SaveEditing(index: number) {
    this.Tab_VarLocalTS[index].FVLocalTS_VarLocalTS = this.VarU_TempEditValue
    console.log('this.VarU_TempEditValue',this.VarU_TempEditValue)
    console.log('this.Tab_VarLocalTS[index].FVLocalTS_VarLocalTS',this.Tab_VarLocalTS[index].FVLocalTS_VarLocalTS )
    this.VarL_EditingIndex = null
  }

  TS_Remove_VarSelect(index: number) {
    if (this.Tab_VarLocalTS.length > 0 && index < this.Tab_VarLocalTS.length) {
      const VarLocalTSId = this.Tab_VarLocalTS[index].FVLocalTS_Id
      this.Tab_VarLocalTS.splice(index, 1)
      console.log('VarLocalTSId',VarLocalTSId)
      console.log('Tab_VarLocalTS',this.Tab_VarLocalTS)
      this.S8o8o1RessourcesService.TS_Sce_Delete_VarLocalTS(VarLocalTSId).subscribe(response => {
          console.log("Deleted: ", response)
      }, error => {
          console.error("Error: ", error)
      })
    }
  }

  TS_Update() {
    this.S8o8o1RessourcesService.TS_Sce_Put_VarLocalTS(this.Tab_VarLocalTS).subscribe(response => {
        console.log(response);
    })
  }

  TS_VarTransfert_Selected(): void {
    this.Var_Selected = 1
  }
  TS_VarLocalTs_Selected(): void {
    this.Var_Selected = 2
  }
  TS_VarLocalHtml_Selected(): void {
    this.Var_Selected = 3
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


  

}
