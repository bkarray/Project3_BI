/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy, OnChanges } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem,  } from '@angular/cdk/drag-drop';
import * as XLSX from 'xlsx';

import { S6o9ServiceService } from '../../../../s6-projet/s6o9-service/s6o9-service.service';

/* Importation : Interface */
import { Interface_DraggableItem } from '../../../s6-projet.component'
import { Interface_Type } from '../../../s6-projet.component'
@Component({
  selector: 'app-s6o5o5o3-alltable',
  templateUrl: './s6o5o5o3-alltable.component.html',
  styleUrls: ['./s6o5o5o3-alltable.component.css']
})
export class S6o5o5o3AlltableComponent implements OnInit {

  constructor(
    private s6o9Service: S6o9ServiceService,
    private cdr: ChangeDetectorRef
    ) {}


    
  TS_AllTableDansBD() {
    this.s6o9Service.TS_Sce_GetAllTables().subscribe(
      data => {
        console.log('Liste des tables:', data)
      },
      error => {
        console.error('Erreur lors de la récupération des tables', error)
      }
    )
  }





  
  @Input() Input_TabList_DraggableItem: Interface_DraggableItem[] = []
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Input_TabList_DraggableItem'] && changes['Input_TabList_DraggableItem'].currentValue) {
      // Mettez à jour Var_NameTable ici en fonction des nouvelles valeurs de Input_TabList_DraggableItem
      // Exemple : utiliser le nom du premier élément de la liste, si disponible
      this.Var_NameTable = changes['Input_TabList_DraggableItem'].currentValue.length > 0 
                      ? changes['Input_TabList_DraggableItem'].currentValue[0].InterfDI_Content 
                      : '';
    }
  }
  

  Var_NameTable: string = '';
  VarB_EditMode: boolean = false;


  Tab_AllField: Array<{ 
    VarAF_NameField: string, 
    VarAF_SelectedType: string, 
    VarAF_IsPrimaryKey: boolean, 
    VarAF_IsSecondaryKey: boolean, 
    VarAF_IsEditable: boolean,
    VarAF_TempCell_1: string,
    VarAF_IsEditing: boolean,
    VarAF_IsEditingType: boolean,
    VarAF_NameField_Copy: string, 
    VarAF_SelectedType_Copy: string
  }> = [];

  VarB_EditingNomTable: boolean = false

  TS_AddRow() {
    this.Tab_AllField.push({ 
      VarAF_NameField: '', 
      VarAF_SelectedType: 'entier', 
      VarAF_IsPrimaryKey: false, 
      VarAF_IsSecondaryKey: false, 
      VarAF_IsEditable: false,
      VarAF_TempCell_1: '',
      VarAF_IsEditing: false,
      VarAF_IsEditingType: false,
      VarAF_NameField_Copy: '', 
      VarAF_SelectedType_Copy:'entier'
    })
  }

  TS_DeleteRow(index: number) {
    if (index >= 0 && index < this.Tab_AllField.length) {
      this.Tab_AllField.splice(index, 1)
    }
  }

  TS_EditRow() {
    this.VarB_EditMode = !this.VarB_EditMode
  }



  TS_SaveRow(Tab_FieldLine: any) {
    Tab_FieldLine.VarAF_IsEditable = false;
    Tab_FieldLine.VarAF_NameField = Tab_FieldLine.VarAF_TempCell_1
  }

 



  TS_StartEditing(Tab_FieldLine: any) {
    Tab_FieldLine.VarAF_IsEditing = true;
    console.log(' Tab_FieldLine.VarAF_IsEditing', Tab_FieldLine.VarAF_IsEditing)
  }
  TS_StopEditing(Tab_FieldLine: any) {
    Tab_FieldLine.VarAF_IsEditing = false;
  }

  TS_StartEditingType(Tab_FieldLine: any) {
    Tab_FieldLine.VarAF_IsEditingType = true;
    console.log(' Tab_FieldLine.VarAF_IsEditingType', Tab_FieldLine.VarAF_IsEditingType)
  }
  TS_StopEditingType(Tab_FieldLine: any) {
    Tab_FieldLine.VarAF_IsEditingType = false;
  }


  TS_StartEditingNomTable() {
    this.VarB_EditingNomTable = true
    console.log('this.VarB_EditingNomTable', this.VarB_EditingNomTable)
  }
  
  TS_StopEditingNomTable() {
    this.VarB_EditingNomTable = false
  }


  TS_AddField() {
    for (const Tab_FieldLine of this.Tab_AllField) {
  
      const fieldData = {
        Table_Name: this.Var_NameTable,
        Field_Name: Tab_FieldLine.VarAF_NameField,
        Field_Type: Tab_FieldLine.VarAF_SelectedType
      };
  
      this.s6o9Service.TS_Sce_AddFields(fieldData)
        .subscribe(
          (response: any) => {
            console.log(`Champ '${Tab_FieldLine.VarAF_NameField}' ajouté avec succès:`, response);
            // Vous pouvez effectuer des actions supplémentaires ici, comme actualiser la liste des champs
          },
          (error: any) => {
            console.log(`Erreur lors de l'ajout du champ '${Tab_FieldLine.VarAF_NameField}':`, error);
            // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur
          }
        );
    }
  }

  TS_GetFieldFromTableBD() {
    this.s6o9Service.TS_Sce_GetFields(this.Var_NameTable)
      .subscribe(
        (TabBD_AllField: any) => {
          console.log('Champs récupérés avec succès:', TabBD_AllField)
          this.Tab_AllField = []
          TabBD_AllField.forEach((TabBD_Field: any) => {
            this.Tab_AllField.push({
              VarAF_NameField: TabBD_Field.Field_Name, 
              VarAF_SelectedType: TabBD_Field.Field_Type, 
              VarAF_IsPrimaryKey: TabBD_Field.Field_IsKey, 
              VarAF_IsSecondaryKey: false, 
              VarAF_IsEditable: true, 
              VarAF_TempCell_1: TabBD_Field.Field_Name,
              VarAF_IsEditing: false,
              VarAF_IsEditingType: false,
              VarAF_NameField_Copy: TabBD_Field.Field_Name, 
              VarAF_SelectedType_Copy: TabBD_Field.Field_Type,
            });
          });
        },
        (error: any) => {
          console.log('Erreur lors de la récupération des champs:', error);
          // Gérer l'erreur ici
        }
      )
      setTimeout(() => {
        console.log('this.Tab_AllField', this.Tab_AllField)
      }, 1000)
     
  }

  existingFields: string[] = []; // This will store the existing fields for comparison
  TS_Update_FieldTable() {
    this.Tab_AllField.forEach((field) => {
      const fieldInDB = this.fieldExistsInDB(field.VarAF_NameField_Copy);

      if (field.VarAF_NameField !== field.VarAF_NameField_Copy && field.VarAF_NameField_Copy) {
        // Case: Update field name
        if (fieldInDB) {
          this.updateFieldName(field);
        }
      } else if (!field.VarAF_NameField_Copy && !fieldInDB) {
        // Case: Add new field
        this.addFieldToDB(field);
      } else if (!fieldInDB && field.VarAF_NameField_Copy) {
        // Case: Delete field
        this.deleteFieldFromDB(field);
      }
    });
  }
  updateFieldName(field: any) {
    this.s6o9Service.TS_Sce_UpdateField(field.VarAF_NameField_Copy, { Field_Name: field.VarAF_NameField })
      .subscribe(
        response => {
          console.log('Field updated successfully', response);
        },
        error => {
          console.error('Error updating field', error);
        }
      );
  }

  addFieldToDB(field: any) {
    this.s6o9Service.TS_Sce_AddFields({ ...field, Table_Name: this.Var_NameTable })
      .subscribe(
        response => {
          console.log('Field added successfully', response);
        },
        error => {
          console.error('Error adding field', error);
        }
      );
  }

  deleteFieldFromDB(field: any) {
    this.s6o9Service.TS_Sce_DeleteField(field.VarAF_NameField)
      .subscribe(
        response => {
          console.log('Field deleted successfully', response);
        },
        error => {
          console.error('Error deleting field', error);
        }
      );
  }

  fieldExistsInDB(fieldName: string): boolean {
    return this.existingFields.includes(fieldName);
  }

  
  

 /*
  startEditingType(Tab_FieldLine: any) {
    // Activez l'édition du type lors d'un double-clic
    Tab_FieldLine.VarAF_IsEditingType = true;

    // Déclenchez la détection de changement manuellement
    this.cdr.detectChanges();
  }*/

}


/*


*/