
/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail_UI } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface */
import { Interface_CmdCToFileData } from '../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

@Component({
  selector: 'app-s8o1o9o3-cmdcenter',
  templateUrl: './s8o1o9o3-cmdcenter.component.html',
  styleUrls: ['./s8o1o9o3-cmdcenter.component.css']
})
export class S8o1o9o3CmdcenterComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
    private el: ElementRef,
    private renderer: Renderer2,
    ) 
    {}  

@Input() InputVarN_Selected: string | number = ''
  ngOnInit(): void {
    this.TS_Object_Active();
  }
  
  TS_Object_Active(): void {
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
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_CmdCenter3().subscribe(data => {
      this.id_1 = data.id_1
      if (this.id_1 === '10_Post_Data_From_CmdCenter_2') {
        console.log('10.2 - CmdCenter3 - From CmdC to CmdCenter3 - TS_Sce_Detect') 
        if (data.tab_3.Tab_SelectedItem !== undefined) {
          this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
        }
        this.TS_ShowTable()
      }
    })
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
      tab_6: {}
    }
  
    console.log('Start - FileObject', Data_Interface)
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdCenter3_To_CmdC(Data_Interface)
  
  }

  
public Var_Selected: string | number = ''
TS_CmdCenter_Origin() {
  this.Var_Selected = 1
  this.id_1 = '10_Post_Data_From_CmdCenter_1'
  this.TS_GetData_From_DB()
}
TS_CmdCenter_From() {
  this.Var_Selected = 2
  this.id_1 = '10_Post_Data_From_CmdCenter_1'
  this.TS_GetData_From_DB()
}
TS_CmdCenter_To() {
  this.Var_Selected = 3
  this.id_1 = '10_Post_Data_From_CmdCenter_1'
  this.TS_GetData_From_DB()
}
TS_CmdCenter_All() {
  this.Var_Selected = 0
  this.id_1 = '10_Post_Data_From_CmdCenter_1'
  this.TS_GetData_From_DB()
}

public Tab: any[] = []
TS_GetData_From_DB(): void {
  this.S8o8o1RessourcesService.TS_Sce_GetAllCmdCenterData().subscribe(Tab_BD_Button_Full => {
    console.log('Résultat', Tab_BD_Button_Full)
    this.Tab = Tab_BD_Button_Full
    this.TS_PostData_To_File_CmdC()
  })
}

public Tab2: any[] = []
TS_ShowTable() {
  if (this.Var_Selected === 1) {
    console.log('1:',this.Tab_SelectedItem[0].FBtn_Id) 
    console.log('2',this.Tab) 
    if (this.Tab_SelectedItem.length > 0 && this.Tab_SelectedItem[0].FBtn_Id !== undefined) {
      const filterValue = this.Tab_SelectedItem[0].FBtn_Id
      const filteredTab = this.Tab.filter(item => String(item.FCmdC_FBtn_Origin) === String(filterValue))
      this.Tab = filteredTab
    }
  }
  if (this.Var_Selected === 2) {
    console.log('3:',this.Tab_SelectedItem[0].FBtn_Id) 
    console.log('4',this.Tab) 
    if (this.Tab_SelectedItem.length > 0 && this.Tab_SelectedItem[0].FBtn_Id !== undefined) {
      const filterValue = this.Tab_SelectedItem[0].FBtn_Id
      const filteredTab = this.Tab.filter(item => String(item.FCmdC_FBtn_From) === String(filterValue))
      this.Tab = filteredTab
    }
  }
  if (this.Var_Selected === 3) {
    console.log('5:',this.Tab_SelectedItem[0].FBtn_Id) 
    console.log('6',this.Tab) 
    if (this.Tab_SelectedItem.length > 0 && this.Tab_SelectedItem[0].FBtn_Id !== undefined) {
      const filterValue = this.Tab_SelectedItem[0].FBtn_Id
      const filteredTab = this.Tab.filter(item => String(item.FCmdC_FBtn_To) === String(filterValue))
      this.Tab = filteredTab
    }
  }
}




drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(this.Tab, event.previousIndex, event.currentIndex);
  }
}

TS_Add_VarSelect() {
  console.log('this.Tab_SelectedItem',this.Tab_SelectedItem)
  const Tab_NewLine = {
    FCmdC_Id: '',
    FCmdC_FBtn_Origin: this.Tab_SelectedItem[0].FBtn_Id,
    FCmdC_Ordre: '',
    FCmdC_FFct_From: '',
    FCmdC_FBtn_From: '',
    FCmdC_FBtn_To: '',
    FCmdC_FFct_To: '',
  }
  this.S8o8o1RessourcesService.TS_Sce_Post_CmdCenter(Tab_NewLine).subscribe(response => {
    console.log("Réponse du serveur:", response)
    const newId = response.FCmdC_Id;
    console.log("ID de la nouvelle ligne:", newId)
    const newVarSelectItem = {
      FCmdC_Id: newId,
      FCmdC_FBtn_Origin: response.FCmdC_FBtn_Origin,
      FCmdC_Ordre:  response.FCmdC_Ordre,
      FCmdC_FFct_From:  response.FCmdC_FFct_From,
      FCmdC_FBtn_From:  response.FCmdC_FBtn_From,
      FCmdC_FBtn_To:  response.FCmdC_FBtn_To,
      FCmdC_FFct_To:  response.FCmdC_FFct_To
    }
    this.Tab.push(newVarSelectItem)
    console.log('this.Tab', this.Tab)
  })
}

TS_Remove_VarSelect(index: number) {
  if (this.Tab.length > 0 && index < this.Tab.length) {
    const VarLocalTSId = this.Tab[index].FCmdC_Id
    this.Tab.splice(index, 1)
    console.log('VarLocalTSId',VarLocalTSId)
    console.log('Tab',this.Tab)
    this.S8o8o1RessourcesService.TS_Sce_Delete_CmdCenter(VarLocalTSId).subscribe(response => {
        console.log("Deleted: ", response)
    }, error => {
        console.error("Error: ", error)
    })
  }
}

public VarL_EditingIndex0: string | number | null = ''
public VarL_EditingIndex1: string | number | null = ''
public VarL_EditingIndex2: string | number | null = ''
public VarU_TempEditValue0: string | number | null = ''
public VarU_TempEditValue1: string | number | null = ''
public VarU_TempEditValue2: string | number | null = ''

TS_StartEditing0(index: number) {
  this.VarL_EditingIndex0 = index
  this.VarU_TempEditValue0 = this.Tab[index].FCmdC_FBtn_From
}
TS_StartEditing1(index: number) {
  this.VarL_EditingIndex1 = index
  this.VarU_TempEditValue1 = this.Tab[index].FCmdC_FBtn_From
}
TS_StartEditing2(index: number) {
  this.VarL_EditingIndex2 = index
  this.VarU_TempEditValue2 = this.Tab[index].FCmdC_FBtn_To
}
TS_CancelEditing(index: number) {
  setTimeout(() => {
    setTimeout(() => {
      if (this.VarL_EditingIndex0 === index) {
        this.VarL_EditingIndex0 = null
      }}, 100)
    if (this.VarL_EditingIndex1 === index) {
      this.VarL_EditingIndex1 = null
    }}, 100)
    setTimeout(() => {
      if (this.VarL_EditingIndex2 === index) {
        this.VarL_EditingIndex2 = null
      }}, 100)
}
TS_SaveEditing0(index: number) {
  this.Tab[index].FCmdC_Ordre = this.VarU_TempEditValue0
  this.VarL_EditingIndex0 = null
}
TS_SaveEditing1(index: number) {
  this.Tab[index].FCmdC_FBtn_From = this.VarU_TempEditValue1
  this.VarL_EditingIndex1 = null
}
TS_SaveEditing2(index: number) {
  this.Tab[index].FCmdC_FBtn_To = this.VarU_TempEditValue2
  this.VarL_EditingIndex2 = null
}

TS_Update() {
  console.log('this.Tab',this.Tab)
  this.S8o8o1RessourcesService.TS_Sce_Put_CmdCenter(this.Tab).subscribe(response => {
      console.log(response);
  })
}

public Var_BtnSelected: string | number = ''
TS_OpenFonction(index: number) {
  this.Var_BtnSelected = '1'
  this.id_1 = '12_Post_Data_From_TS_Variable_ButtonClick_1'
  this.TS_PostData_To_File_CmdC() 
}




}

  