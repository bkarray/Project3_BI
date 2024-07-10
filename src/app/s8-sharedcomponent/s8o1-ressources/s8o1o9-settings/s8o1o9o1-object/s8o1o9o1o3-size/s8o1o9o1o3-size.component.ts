
import { Component, OnInit, SimpleChanges } from '@angular/core';

/* Importation : Composant Angular */
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

/* Importation : s8o8o1-ressources */
import { S8o8o1RessourcesService } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';


/* Importation : Table T_Button */
import { T_Button } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

/* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
import { Renderer2, ElementRef } from '@angular/core';  

@Component({
  selector: 'app-s8o1o9o1o3-size',
  templateUrl: './s8o1o9o1o3-size.component.html',
  styleUrls: ['./s8o1o9o1o3-size.component.css']
})
export class S8o1o9o1o3SizeComponent implements OnInit {

  constructor(
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : s8o8o1-ressources */
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    /* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
    private el: ElementRef,
    private renderer: Renderer2,
    ) 
    {}  

  ngOnInit(): void {
  }


  /* Input position for drag & drop */
  @Input() position: any;


  /* Debut : Get Data from Table Ressources_t_button & Put on Front end */

  /* Input FBtn from Table Ressources_t_button */

  /* # 1 Id */
  /* # 2 Object */
  /* # 3 Input */
  /* # 3.1 Attachment */
  /* # 3.2 UI */
  /* # 3.3 Position */
  /* # 4 Output */
  /* # 4.1 Treatment */

  @Input() VarInputoShowParts: string[] = [];
  @Input() FBtn_Id: number | null = null;
  @Input() FBtn_Name: string = '';

  /* # 1 Id */
  @Input() Get_FBtn_Id: string | number | null = null;
  /* # 2 Object */
  @Input() Get_FBtn_Object: string = '';
  /* # 3 Input */
  /* # 3.1 Attachment */
  /* # 3.2 UI */
  @Input() Get_FBtn_Name: string = '';
  @Input() Get_FBtn_Label: string = '';
  @Input() Get_FBtn_Style: string = ''; 
  @Input() Get_FBtn_Size: string = '';  
  @Input() Get_FBtn_Color: string = '';
  @Input() Get_FBtn_BackgroundColor: string = '';
  @Input() Get_FBtn_Border: string = '';
  /* # 3.3 Position */
  @Input() Get_FBtn_FrontBehind: string = '';
  @Input() Get_FBtn_FrontBehindObject: string = '';
  @Input() Get_FBtn_PositionX: string = '';
  @Input() Get_FBtn_PositionY: string = '';
  /* # 4 Output */
  /* # 4.1 Treatment */
  @Input() Get_FBtn_TreatmentButton: string = '';
  @Input() Get_FBtn_TreatmentType: string = '';
  @Input() Get_FBtn_InputButtonAction3: string = '';

  
  
  
  
  

  /* Variable String */

  /* # 1 Id */
  VarS_InputButtonId: string | number | null = null;
  /* # 2 Object */
  VarS_InputButtonObject: string = '';
  /* # 3 Input */
  /* # 3.1 Attachment */
  /* # 3.2 UI */
  VarS_InputButtonName: string = '';
  VarS_InputButtonLabel: string = '';
  VarS_InputButtonStyle: string = '';
  VarS_InputButtonSize: string = '';
  VarS_InputButtonColor: string = '';
  VarS_InputButtonBgColor: string = '';
  VarS_InputButtonBorder: string = '';
  /* # 3.3 Position */
  VarS_InputButtonFrontBehind: string = '';
  VarS_InputButtonFrontBehindObject: string = '';
  VarS_InputButtonPositionX: string = '';
  VarS_InputButtonPositionY: string = '';
  /* # 4 Output */
  /* # 4.1 Treatment */
  VarS_InputButtonAction1: string = '';
  VarS_InputButtonAction2: string = '';
  VarS_InputButtonAction3: string = '';

  

  
  


  /* Variable String */
  VarS_FBtn_Name: string = 'New Name';
  /* # 1 Id */
  Post_FBtn_Id: number | null = null;
  /* # 2 Object */
  Post_FBtn_Object: string = '';
  /* # 3 Input */
  /* # 3.1 Attachment */
  /* # 3.2 UI */
  Post_FBtn_Name: string = '';
  Post_FBtn_Label: string = '';
  Post_FBtn_Style: string = ''; 
  Post_FBtn_Size: string = '';  
  Post_FBtn_Color: string = '';
  Post_FBtn_BackgroundColor: string = '';
  Post_FBtn_Border: string = '';
  /* # 3.3 Position */
  Post_FBtn_FrontBehind: string = '';
  Post_FBtn_FrontBehindObject: string = '';
  Post_FBtn_PositionX: string = '';
  Post_FBtn_PositionY: string = '';
  /* # 4 Output */
  /* # 4.1 Treatment */
  Post_FBtn_TreatmentButton: string = '';
  Post_FBtn_TreatmentType: string = '';
  Post_FBtn_InputButtonAction3: string = '';

  
  ngOnChanges(changes: SimpleChanges): void {
    const changeMapping: { [key: string]: (val: any) => void } = {
      'FBtn_Id': (val: any) => console.log('FBtn_Id changed to:', val),
      /* # 1 Id */
      'Get_FBtn_Id': (val: any) => this.VarS_InputButtonId = val,
      /* # 2 Object */
      'Get_FBtn_Object': (val: any) => this.VarS_InputButtonName = val,
      /* # 3 Input */
      /* # 3.1 Attachment */
      /* # 3.2 UI */
      'Get_FBtn_Name': (val: any) => this.VarS_InputButtonName = val,
      'Get_FBtn_Label': (val: any) => this.VarS_InputButtonLabel = val,
      'Get_FBtn_Style': (val: any) => this.VarS_InputButtonStyle = val,
      'Get_FBtn_Size': (val: any) => this.VarS_InputButtonSize = val,
      'Get_FBtn_Color': (val: any) => this.VarS_InputButtonColor = val,
      'Get_FBtn_BackgroundColor': (val: any) => this.VarS_InputButtonBgColor = val,
      'Get_FBtn_Border': (val: any) => this.VarS_InputButtonBorder = val,
      /* # 3.3 Position */
      'Get_FBtn_FrontBehind': (val: any) => this.VarS_InputButtonName = val,
      'Get_FBtn_FrontBehindObject': (val: any) => this.VarS_InputButtonName = val,
      'Get_FBtn_PositionX': (val: any) => this.VarS_InputButtonName = val,
      'Get_FBtn_PositionY': (val: any) => this.VarS_InputButtonName = val,
      /* # 4 Output */
      /* # 4.1 Treatment */
      'Get_FBtn_TreatmentButton': (val: any) => this.VarS_InputButtonAction1 = val,
      'Get_FBtn_TreatmentType': (val: any) => this.VarS_InputButtonAction2 = val,
      'Get_FBtn_InputButtonAction3': (val: any) => this.VarS_InputButtonAction3 = val
    };

    for (let prop in changes) {
        if (changes.hasOwnProperty(prop) && changeMapping[prop]) {
            changeMapping[prop](changes[prop].currentValue);
        }
    }
}

  /* Fin : Get Data from Table Ressources_t_button & Put on Front end */

 
  @Input() VarInputoShowPartsEnable: string[] = [];

  @Output() styleChanged = new EventEmitter<string>();
  @Output() VarS_Output_InputButtonLabel = new EventEmitter<string>();
  @Output() VarS_Output_InputButtonColor = new EventEmitter<string>();
  @Output() VarS_Output_InputButtonBgColor = new EventEmitter<string>();
  @Output() VarS_Output_InputButtonBorder = new EventEmitter<string>();

 
 


 VarB_Enable: boolean = true;
 VarB_Disable: boolean = false;

 


/* Debut Steps Creation Button */

public VarS_ObjectSelected: string = '';
@Output() VarS_ObjectSelectedChange = new EventEmitter<string>();

TS_ObjectChange(event: any) {
    this.VarS_ObjectSelected = event.target.value;
    this.VarS_ObjectSelectedChange.emit(this.VarS_ObjectSelected);
}



/* 2 boutons 'Input' et 'Output' */

VarB_DataSelected: boolean = false;
VarB_TreatmentSelected: boolean = false;

VarB_InputSelected: boolean = false;
TS_ShowInputOptions() {
  this.VarB_InputSelected = !this.VarB_InputSelected;
  this.VarB_DataSelected = !this.VarB_InputSelected;
  this.VarB_AttachmentSelected = false;
  this.VarB_UiSelected = false;
}

TS_ShowDataOptions() {
  this.VarB_DataSelected = !this.VarB_DataSelected;
  this.VarB_InputSelected = !this.VarB_DataSelected;
  this.VarB_TreatmentSelected = false;
}

    /* si je clique sur 'Input' */

        /* Variable Boolean */
        VarB_ButtonCreated: boolean = false;
        /* Pop up Form se crée */
        TS_OnSubmit() {
          this.VarB_ButtonCreated = true;
          console.log(this.VarB_ButtonCreated)
        } 
            
            VarB_AttachmentSelected: boolean = false;
            VarB_UiSelected: boolean = false;
            VarB_PositionSelected: boolean = false;

            /* Button 'Attachment' */
            TS_ShowAttachmentOptions() {
              this.VarB_AttachmentSelected = true;
              this.VarB_UiSelected = false;
              this.VarB_PositionSelected = false;
            }
                

            /* Button 'UI' */
            TS_ShowUIOptions() {
              this.VarB_AttachmentSelected = false;
              this.VarB_UiSelected = true;
              this.VarB_PositionSelected = false;
            }

            /* Button 'UI' */
            TS_ShowPositionOptions() {
              this.VarB_AttachmentSelected = false;
              this.VarB_UiSelected = false;
              this.VarB_PositionSelected = true;
            }

            /* Si je clique sur 'Attachment' */
                    /* Your attachment related code */

            /* Si je clique sur 'UI' */

                /* Your UI related code */  
                    /* Name and Label */
                    /* Style and Size */
                    TS_OnStyleChange() {
                      console.log("Style changed to:", this.VarS_InputButtonStyle);
                      this.styleChanged.emit(this.VarS_InputButtonStyle);
                    }
                    /* Color, Background-Color, and Border */

            /* Si je clique sur 'Position' */
            
                /* Your UI related code */  
                    /* FrontBehind */
                    TS_OnFrontBehindInputChange() {
                      this.styleChanged.emit(this.VarS_InputButtonFrontBehind);
                    }
                    /* FrontBehindObject */
                    TS_OnFrontBehindObjectInputChange() {
                      this.styleChanged.emit(this.VarS_InputButtonFrontBehindObject);
                    }
                    /* PositionX */
                    /* PositionY */




            /* Submit Button */


    /* Si je clique sur 'Output' */

        /* Pop up Form se crée */
        /* TS_OnSubmit() {} */
        
            /* Button 'Treatment' */
            TS_ShowTreatmentOptions() {
              this.VarB_TreatmentSelected = true;
            }
                /* Si je clique sur 'Treatment' */
                    /* Your treatment related code */
                        /* Treatment Button, Treatment Type,InputButtonAction3 */

            /* Submit Button */

/* Fin Steps Creation Button */



}
