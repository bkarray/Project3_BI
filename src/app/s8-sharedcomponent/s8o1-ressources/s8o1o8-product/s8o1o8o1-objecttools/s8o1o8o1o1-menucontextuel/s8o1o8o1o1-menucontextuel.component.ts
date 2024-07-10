
/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail_UI } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface */
import { Interface_CmdCToFileData } from '../../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';



@Component({
  selector: 'app-s8o1o8o1o1-menucontextuel',
  templateUrl: './s8o1o8o1o1-menucontextuel.component.html',
  styleUrls: ['./s8o1o8o1o1-menucontextuel.component.css']
})
export class S8o1o8o1o1MenucontextuelComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
    ) 
    {}  




ngOnInit(): void {
}

id_1: string = '';
id_2: string = '';
@Output() Output_MenuC_Close = new EventEmitter<string>();
@Input() Input_VarN_FBtn_Id: string | number | null = '';
TS_SettingsItem() {
  this.Output_MenuC_Close.emit('1');
  this.id_1 = '2_Post_Data_From_FileMenuContextuel_1'
  this.id_2 = String(this.Input_VarN_FBtn_Id)
  this.TS_PostData_To_File_CmdC()
}

TS_DeleteItem() {
    console.log('Supprimer l\'élément');
}

items: any[] = [];
TS_GroupItems(): void {
  const selectedItems = this.items.filter(item => item.isSelected);
  if (selectedItems.length > 1) {
    const group = {
      id: this.TS_GenerateUniqueID(),
      type: 'group',
      children: selectedItems
    };
    this.items = this.items.filter(item => !item.isSelected);
    this.items.push(group);
  } else {
    console.log('Sélectionnez au moins deux éléments pour grouper.');
  }
}
TS_GenerateUniqueID(): string {
  return Math.random().toString(36).substr(2, 9);
}


TS_PostData_To_File_CmdC(): void {

  const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: this.id_2,
    id_3: '',
    id_4: '',
    tab_1: {},
    tab_2: {},
    tab_3: {},
    tab_4: {},
    tab_5: {},
    tab_6: {}
  }
  
  console.log('Start - FileMenuC - TS_PostData_To_File_CmdC: Data_Interface', Data_Interface)
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_MenuC_To_CmdC(Data_Interface)

}


}


