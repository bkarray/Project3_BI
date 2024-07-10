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

declare global {
  interface Window {
      TS_ShowConsole?: () => void;
  }
}


@Component({
  selector: 'app-s8o1o4-fonction',
  templateUrl: './s8o1o4-fonction.component.html',
  styleUrls: ['./s8o1o4-fonction.component.css']
})
export class S8o1o4FonctionComponent implements OnInit {


  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) { }

  ngOnInit(): void {
    this.TS_Active(); 
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
        if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_4') {
          this.id_1 = '12 _Post_Data_From_TS_Variable_ButtonClick_5'
          this.TS_GetData_From_DB()
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
      tab_6: {}}
    console.log('Start - FileRessources - Data_Interface', Data_Interface)
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_R_To_CmdC(Data_Interface)
  }

  public Tab_Fonction: any[] = []
  public Tab_Type: any[] = []
  TS_GetData_From_DB(): void {
    this.S8o8o1RessourcesService.TS_Sce_GetAllFonctionData().subscribe(Tab_Full => {
      this.Tab_Fonction = Tab_Full
    })
    this.S8o8o1RessourcesService.TS_Sce_GetAllTypeData().subscribe(Tab_Full => {
      this.Tab_Type = Tab_Full
    })
  }
  
  TS_Drop(event: CdkDragDrop<any[]>) {
    console.log(' - Event:', event)
    /*console.log('2 - Event:', event.item.data.FFct_Name)*/
    if (event.previousContainer === event.container) {
      moveItemInArray(this.Tab_Fonction, event.previousIndex, event.currentIndex)
    }
  }

  public VarU_SearchText: string = ''
  TS_FilterItems(arr: any[]): any[] {
    if (!arr) return [];
    if (!this.VarU_SearchText) return arr
    return arr.filter(item => {
      return item.FFct_Name.toLowerCase().includes(this.VarU_SearchText.toLowerCase())
    })
  }
  
  TS_Add_VarSelect() {
    const Tab_NewLine = {
      FFct_Name: 'New Fonction',
      FFct_Texte: ' ',
    }
    this.S8o8o1RessourcesService.TS_Sce_Post_Fonction(Tab_NewLine).subscribe(response => {
      console.log("Réponse du serveur:", response)
      const newId = response.FFct_Id
      console.log("ID de la nouvelle ligne:", newId)
      const newVarSelectItem = {
        FFct_Id: newId,
        FFct_Name: response.FFct_Name,
        FFct_Texte: response.FFct_Texte,
      }
      this.Tab_Fonction.push({ ...newVarSelectItem })
      console.log('this.Tab_Fonction',this.Tab_Fonction)
    })
  }

  public VarL_EditingIndex: number | null = null
  public VarU_TempEditValue: string = ''
  TS_StartEditing(index: number) {
    this.VarL_EditingIndex = index;
    this.VarU_TempEditValue = this.Tab_Fonction[index].FFct_Name
  }
  TS_CancelEditing(index: number) {
    setTimeout(() => {
      if (this.VarL_EditingIndex === index) {
        this.VarL_EditingIndex = null
      }}, 100)
  }
  TS_SaveEditing(index: number) {
    this.Tab_Fonction[index].FFct_Name = this.VarU_TempEditValue
    this.VarL_EditingIndex = null
  }

  TS_Remove_VarSelect(index: number) {
    if (this.Tab_Fonction.length > 0 && index < this.Tab_Fonction.length) {
      const FonctionId = this.Tab_Fonction[index].FFct_Id
      this.Tab_Fonction.splice(index, 1)
      this.S8o8o1RessourcesService.TS_Sce_Delete_Fonction(FonctionId).subscribe(response => {
          console.log("Deleted: ", response)
      }, error => {
          console.error("Error: ", error)
      })
    }
  } 
  
  public VarU_CurrentlySelect: string | number | null = null
  public VarL_FonctionId: string | number | null = ''
  public VarL_FonctionName: string | number | null = ''
  public VarL_FonctionTexte: string | number | null = ''
  TS_SelectItem(item: string, index: number): void {
    this.VarU_CurrentlySelect = index
    this.VarL_FonctionName = item
    const VarLF_Found_FonctionId = this.Tab_Fonction.find(f => f.FFct_Name === item)
    this.VarL_FonctionId = VarLF_Found_FonctionId ? VarLF_Found_FonctionId.FFct_Id : ''
    const VarLF_Found_FonctionTexte = this.Tab_Fonction.find(f => f.FFct_Name === item)
    this.VarL_FonctionTexte = VarLF_Found_FonctionTexte ? VarLF_Found_FonctionTexte.FFct_Texte : ''
  }

  TS_Update() {
    const VarLF_FonctionTexte_ToUpdate = this.Tab_Fonction.find(f => f.FFct_Name === this.VarL_FonctionName)
    if (VarLF_FonctionTexte_ToUpdate) {
      VarLF_FonctionTexte_ToUpdate.FFct_Texte = this.VarL_FonctionTexte
    }
    this.S8o8o1RessourcesService.TS_Sce_Put_Fonction(this.Tab_Fonction).subscribe(response => {
      console.log(response);
    })
  }

  TS_Appliquer() {
    if (typeof this.VarL_FonctionTexte === 'string') {
      /*eval(this.VarL_FonctionTexte)*/
    } else {
      console.error('VarL_FonctionTexte is not a string');
    }
  }

  Var_Checkbox: number | null = null
  Var_SelectFonctionName: number | null = null
  TS_Checkbox(index: number): void {
    this.Var_Checkbox = index;
    const selectedFonction = this.Tab_Fonction.find((_, i) => i === index);
    this.Var_SelectFonctionName = selectedFonction ? selectedFonction.FFct_Name : '';
}

  
  
}




  /*
  public VarB_FileVarTransfert: boolean = true
  TS_VarTransfertDetail_ButtonClick(): void {
    this.VarB_FileVarTransfert = false
    this.id_1 = '8_Post_Data_From_VarTransfertDetail_1'
    this.TS_PostData_To_File_CmdC() 
  }
  TS_VarTransfert_True(): void {
    this.VarB_FileVarTransfert = true
  }
  */
 