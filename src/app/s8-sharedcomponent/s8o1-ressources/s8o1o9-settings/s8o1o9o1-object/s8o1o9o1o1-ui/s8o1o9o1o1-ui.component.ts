
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
  selector: 'app-s8o1o9o1o1-ui',
  templateUrl: './s8o1o9o1o1-ui.component.html',
  styleUrls: ['./s8o1o9o1o1-ui.component.css']
})

export class S8o1o9o1o1UiComponent implements OnInit {

    

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

@Input() Input_Var_Selected: string | number = ''

ngOnInit(): void {
    this.TS_UI_Active();
}

TS_UI_Active(): void {
    this.TS_GetData_From_File_CommandCenter()
}

public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public id_4: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []
TS_GetData_From_File_CommandCenter(): void {
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_UI().subscribe(data => {
        this.id_1 = data.id_1.toString()
        if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_12') {
            this.id_1 = '2_Post_Data_From_FileMenuContextuel_13'
            console.log('2.12 - FileUI - From CmdC to UI - TS_Sce_Detect') 
            if (data.tab_3.Tab_SelectedItem !== undefined) {
                this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
              }
            this.TS_IFU_UI() 
        }

        if (this.id_1 === '3_Post_Data_From_FileObject_4') {
            this.id_1 = '3_Post_Data_From_FileObject_5'
            console.log('3.4 - FileUI - From CmdC to UI - TS_Sce_Detect') 
            if (data.tab_3.Tab_SelectedItem !== undefined) {
              this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
            }
            this.TS_IFU_UI() 
        }

        if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_2') {
            this.id_1 = '4_Post_Data_From_FileSettings_SelectedItem_3'
            console.log('4.3 - FileUI - From CmdC to UI - TS_Sce_Detect') 
            if (data.tab_3.Tab_SelectedItem !== undefined) {
              this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
            }
            this.TS_IFU_UI() 
        }

    })
}

TS_PostData_To_File_CmdC(): void {

    const TabToSend_Tab_SelectedItem_Update: Partial<Interface_CommunicationData> = {
        Tab_SelectedItem_Update: this.Tab_SelectedItem_Update
    }

    const Data_Interface: Interface_CmdCToFileData = {
      id_1: this.id_1,
      id_2: '',
      id_3: '',
      id_4: '',
      tab_1: {},
      tab_2: {},
      tab_3: {},
      tab_4: TabToSend_Tab_SelectedItem_Update,
      tab_5: {},
      tab_6: {}
    }

    console.log('End - FileUI', Data_Interface); 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_UI_To_CmdC(Data_Interface)

}


TS_IFU_UI(): void {
    this.TS_UpdateEmptyValuesToZero()
    this.VarN_IFU_Name = this.Tab_SelectedItem[0].FBtn_Name
    this.VarS_IFU_Label = this.Tab_SelectedItem[0].FBtn_Label
    this.VarS_IFU_Style = this.Tab_SelectedItem[0].FBtn_Style
    this.VarS_IFU_Size = this.Tab_SelectedItem[0].FBtn_Size
    this.VarS_IFU_Color = this.Tab_SelectedItem[0].FBtn_Color
    this.VarS_IFU_BgColor = this.Tab_SelectedItem[0].FBtn_BackgroundColor
    this.VarS_IFU_Border = this.Tab_SelectedItem[0].FBtn_Border
    this.TS_PostData_To_File_CmdC()
}

private TS_UpdateEmptyValuesToZero(): void {
    this.Tab_SelectedItem.forEach(item => {
        Object.keys(item).forEach(key => {
            if (item[key] === '' || item[key] == null) {
                item[key] = 0;
            }
        });
    });
}

TS_Sce_Update_Ressources_T_Button() { 
    if (this.Tab_SelectedItem && this.Tab_SelectedItem.length > 0) {
        console.log('this.FBtn_Id', this.Tab_SelectedItem[0].FBtn_Id);
        const { FBtn_PositionX_1, FBtn_PositionY_1, ...rest } = this.Tab_SelectedItem[0];
        const newItem = {
            ...rest,
            FBtn_Name: this.VarN_IFU_Name,
            FBtn_Label: this.VarS_IFU_Label,
            FBtn_Style: this.VarS_IFU_Style,
            FBtn_Size: this.VarS_IFU_Size,
            FBtn_Color: this.VarS_IFU_Color,
            FBtn_BackgroundColor: this.VarS_IFU_BgColor,
            FBtn_Border: this.VarS_IFU_Border,
        };
        this.Tab_SelectedItem_Update = [newItem];
    } else {
        console.error('No selected item with a valid FBtn_Id to update.');
    }
    this.id_1 = '5_Post_Data_From_FileUI_Update_1'
    console.log('Final - 5_Post_Data_From_FileUI_Update - FileCmdC - Data_Interface')
    this.TS_PostData_To_File_CmdC()
}


/*
    this.id_1 = '3_Post_Data_From_FileUI_Update_1'
    this.id_2 = String(this.Tab_SelectedItem[0].FBtn_Id);
    const TabToSend_Tab_SelectedItem_Update: Partial<Interface_CommunicationData> = {
        Tab_SelectedItem_Update: this.Tab_SelectedItem_Update
    }
    const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: this.id_2,
    id_3: '',
    id_4: '',
    tab_1: {},
    tab_2: {},
    tab_3: TabToSend_Tab_SelectedItem_Update,
    tab_4: {},
    tab_5: {},
    tab_6: {}}
    console.log('Start - FileUI - TS_PostData_To_File_CmdC', Data_Interface);
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_UI_To_CmdC(Data_Interface);*/



















VarN_IFU_Name: string = '';
VarS_IFU_Label: string = ''; 
VarS_IFU_Style: string = '';
VarS_IFU_Size: string = '';
VarS_IFU_Color: string = '';
VarS_IFU_BgColor: string = '';
VarS_IFU_Border: string = '';
private Var_Subscription?: Subscription;
TS_GetData_From_FileSettings(): void {
  this.Var_Subscription = this.S8o8o3SceCommunicationService.TS_Sce_Detect_From_FileSettings$.subscribe(data => {
    if (data) {
      this.Tab_SelectedItem = data.Tab_SelectedItem;
      this.VarN_IFU_Name = this.Tab_SelectedItem[0].FBtn_Name;
      this.VarS_IFU_Label = this.Tab_SelectedItem[0].FBtn_Label;
      this.VarS_IFU_Style = this.Tab_SelectedItem[0].FBtn_Style;
      this.VarS_IFU_Size = this.Tab_SelectedItem[0].FBtn_Size;
      this.VarS_IFU_Color = this.Tab_SelectedItem[0].FBtn_Color;
      this.VarS_IFU_BgColor = this.Tab_SelectedItem[0].FBtn_BackgroundColor;
      this.VarS_IFU_Border = this.Tab_SelectedItem[0].FBtn_Border;
      console.log('Terminé - FileUI - TS_Sce_Detect_From_FileSettings: Tab_SelectedItem', this.Tab_SelectedItem);
    }
  });

}










/* Valeur initial Recherche */
@Input() Input_VarS_IFU_Recherche: string | number | null = null;


private Var_DataSubscription: Subscription = new Subscription();

TS_Get_Data_From_FileDatabase(){
    if (this.Input_VarS_IFU_Recherche !== null) {
        const dataObservable = this.S8o8o3SceCommunicationService.List_SendData_From_FileDatabase_To_OtherFile_ById(String(this.Input_VarS_IFU_Recherche));
        if (dataObservable) {
        this.Var_DataSubscription = dataObservable.subscribe((data: any)  => {
            if (data) {
            this.TS_UpdateComponentProperties(data);
            }
        });
        }
    } 
}

private TS_UpdateComponentProperties(data: any): void {
    this.VarN_IFU_Name = data.name;
    this.VarS_IFU_Label = data.label;
    this.VarS_IFU_Style = data.style;
    this.VarS_IFU_Size = data.size;
    this.VarS_IFU_Color = data.color;
    this.VarS_IFU_BgColor = data.backgroundColor;
    this.VarS_IFU_Border = data.border;
}

@Output() Output_from_VarN_IFU_Name = new EventEmitter<string>();
TS_Change_VarN_IFU_Name() {
    this.Output_from_VarN_IFU_Name.emit(this.VarN_IFU_Name);
    this.S8o8o2SceDatabaseService.TS_Sce_Get_Copy_ButtonData().subscribe((data: any) => {
        console.log("Valeur UI 1 ",  data); // ici vous aurez toujours la dernière version de buttonData
        console.log("Valeur UI 2 ",  this.VarN_IFU_Name);
    });
} 

Var_Recherche: string | number | null = null;


}

