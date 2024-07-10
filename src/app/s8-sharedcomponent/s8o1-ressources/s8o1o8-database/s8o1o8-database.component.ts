/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';

@Component({
  selector: 'app-s8o1o8-database',
  templateUrl: './s8o1o8-database.component.html',
  styleUrls: ['./s8o1o8-database.component.css']
})
export class S8o1o8DatabaseComponent implements OnInit, OnDestroy {

  constructor(
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : s8o8o1-ressources */
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private changeDetector: ChangeDetectorRef,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private s8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    )
    {}
 
  
VarN_Button_Update_Activate: number = 1;

ngOnDestroy(): void {
  if (this.Var_Subscription) {
    this.Var_Subscription.unsubscribe();
  }
}

 ngOnInit() {
  this.TS_GetData_Active(); 

  
  /*
  this.TS_Sce_Get_Ressources_T_Button(this.VarN_Button_Update_Activate); //From DB
  this.Var_Subscription = this.s8o8o4NotifyResourceUpdatedService.List_Notify_UpdateButton_From_UI_To_FileDB.subscribe(() => {
    this.VarN_Button_Update_Activate = 2;
    this.TS_Sce_Get_Ressources_T_Button(this.VarN_Button_Update_Activate); //From User - Click Update
  });
  */
}





private Var_Subscription?: Subscription;
id: string = '';
TS_GetData_Active(): void {
  this.Var_Subscription = this.S8o8o3SceCommunicationService.getElementById()
    .subscribe(data => {
      if (data && data.id) {
        this.id = data.id.toString(); 
        if (this.id === '1') {
          console.log('Terminé - FileDatabase - TS_GetData_Active: id', this.id);
          this.TS_GetData_From_FileRessources();
        }
      }
    });
}

public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = [];
TS_GetData_From_FileRessources(): void {
  this.Var_Subscription = this.S8o8o3SceCommunicationService.TS_Sce_Detect_From_FileRessources_To_FileDB$.subscribe(data => {
    if (data) {
      this.id = data.id;
      this.Tab_IFU_Recherche = data.List_VarS_IFU_Recherche;
      if (this.id === '1') 
      {
        console.log('Terminé - FileDatabase - TS_GetData_From_FileRessources: Tab_IFU_Recherche', this.Tab_IFU_Recherche);
        this.TS_GetData_From_DB();
      }
    }
  });
}

public Tab_BD_Button: Interface_Tab_BD_Button_Detail[] = [];
TS_GetData_From_DB(): void {
  this.S8o8o1RessourcesService.TS_Sce_GetAllButtonData().subscribe(
    (Tab_BD_Button_Full) => {
      this.Tab_BD_Button = Tab_BD_Button_Full;
      console.log('Terminé - FileDatabase - TS_GetData_From_DB: Tab_IFU_Recherche', this.Tab_BD_Button);
      this.TS_Tab_Object()
    },
    (error) => {
      console.error('Erreur lors de la récupération des données:', error);
    }
  );
}

VarB_FileRessources: boolean = false;
TS_Tab_Object(): void {
  this.TS_Tab_Object_Recuperate_All_Id()
  this.TS_Tab_Object_Recuperate_Id_Detail()
  /*this.TS_Tab_Object_Recuperate_Id_of_FrontBehindObject()*/
  /*this.TS_RemoveDuplicates()*/
  this.TS_Calculate()
  this.id = '2'

  console.log('Terminé - FileDatabase - TS_Tab_Object: Input:Tab_BD_Button/Tab_IFU_Recherche - Output:id,Tab_Object_Recuperate_Id', this.Tab_BD_Button, this.Tab_IFU_Recherche, this.Tab_Object_Recuperate_Id,this.id = '2');
  this.S8o8o3SceCommunicationService.TS_Sce_SendData_From_FileDB_To_FileRessources(this.id, this.Tab_Object_Recuperate_Id);
}

private TS_Tab_Object_Recuperate_All_Id(): void {
  let foundNewValue: boolean;
  const existingIDs = new Set(this.Tab_IFU_Recherche.map(ifu => ifu.value));

  do {
    // Commencez en supposant qu'aucune nouvelle valeur ne sera trouvée.
    foundNewValue = false;

    // Utilisez une copie temporaire pour stocker les nouvelles valeurs.
    const newValues: Interface_Tab_IFU_Recherche[] = [];

    // Bouclez sur la copie actuelle de Tab_IFU_Recherche.
    this.Tab_IFU_Recherche.slice().forEach(IfuR_Value => {
      this.Tab_BD_Button.forEach(Tab_BD_Button_Line => {
        if (Tab_BD_Button_Line.FBtn_FrontBehindObject === IfuR_Value.value) {
          const idValue = Tab_BD_Button_Line.FBtn_Id != null ? String(Tab_BD_Button_Line.FBtn_Id) : '';

          // Ajoutez l'ID s'il n'est pas déjà présent.
          if (!existingIDs.has(idValue)) {
            existingIDs.add(idValue);
            newValues.push({ value: idValue });
            foundNewValue = true; // Nous avons trouvé une nouvelle valeur, donc nous continuerons à boucler.
          }
        }
      });
    });

    // Ajoutez les nouvelles valeurs trouvées à Tab_IFU_Recherche.
    this.Tab_IFU_Recherche.push(...newValues);

  } while (foundNewValue); // Continuez tant que de nouvelles valeurs sont ajoutées.

  console.log(3333333333)
  console.log('Terminé6666 - FileDatabase - initiateTraitementA1', this.Tab_IFU_Recherche);
}


public Tab_Object_Recuperate_Id1: Interface_Tab_BD_Button_Detail[] = [];
TS_Tab_Object_Recuperate_Id_Detail(): void {
  this.Tab_BD_Button.forEach((BDBtn_Value) => {
    if (BDBtn_Value.FBtn_Id !== null) {
      this.Tab_IFU_Recherche.forEach((IfuR_Value) => {
        const BDBtn_ValueIdAsString = (BDBtn_Value.FBtn_Id ?? "").toString();
        if (BDBtn_ValueIdAsString === IfuR_Value.value) {
          const newObject: Interface_Tab_BD_Button_Detail = {
            ...BDBtn_Value,
            FBtn_PositionX_1: BDBtn_Value.FBtn_PositionX,
            FBtn_PositionY_1: BDBtn_Value.FBtn_PositionY,
          };
          this.Tab_Object_Recuperate_Id.push(newObject);
        }
      });
    }
  });
  console.log('Terminé - FileDatabase - TS_Tab_Object_Recuperate_Id_Detail', this.Tab_Object_Recuperate_Id);
}

TS_Calculate(): void {
  this.Tab_Object_Recuperate_Id.forEach(item => {
    // Assurez-vous que FBtn_Id et FBtn_FrontBehindObject sont valides
    if (item.FBtn_Id !== null && item.FBtn_FrontBehindObject) {
      // Trouvez l'objet avec FBtn_Id égal à FBtn_FrontBehindObject
      const objFrontBehind = this.Tab_Object_Recuperate_Id.find(obj => obj.FBtn_Id === Number(item.FBtn_FrontBehindObject));

      // Vérifiez si l'objet a été trouvé et que les positions sont des nombres valides
      if (objFrontBehind && !isNaN(Number(item.FBtn_PositionX)) && !isNaN(Number(objFrontBehind.FBtn_PositionX_1))) {
        // Effectuez le calcul et mettez à jour FBtn_PositionX_1
        item.FBtn_PositionX_1 = (Number(item.FBtn_PositionX) + Number(objFrontBehind.FBtn_PositionX_1)).toString();
      }
      // Vérifiez si l'objet a été trouvé et que les positions sont des nombres valides
      if (objFrontBehind && !isNaN(Number(item.FBtn_PositionY)) && !isNaN(Number(objFrontBehind.FBtn_PositionY_1))) {
        // Effectuez le calcul et mettez à jour FBtn_PositionY_1
        item.FBtn_PositionY_1 = (Number(item.FBtn_PositionY) + Number(objFrontBehind.FBtn_PositionY_1)).toString();
      }
    }
  });
  console.log('Terminé - FileDatabase - TS_Calculate', this.Tab_Object_Recuperate_Id);
}





























public Tab_Object_Recuperate_Id: Interface_Tab_BD_Button_Detail[] = [];
TS_Tab_Object_Recuperate_Id2(): void {
  this.Tab_BD_Button.forEach((Tab_BD_Button_Line) => {
    if (Tab_BD_Button_Line.FBtn_Id !== null) {
      this.Tab_IFU_Recherche.forEach((IfuR_Value) => {
        const BDBtn_ValueIdAsString = (Tab_BD_Button_Line.FBtn_Id ?? "").toString();
        if (BDBtn_ValueIdAsString === IfuR_Value.value) {
          const newObject: Interface_Tab_BD_Button_Detail = {
            ...Tab_BD_Button_Line,
            FBtn_PositionX_1: Tab_BD_Button_Line.FBtn_PositionX,
            FBtn_PositionY_1: Tab_BD_Button_Line.FBtn_PositionY,
          };
          this.Tab_Object_Recuperate_Id.push(newObject);
        }
      });
    }
  });
  console.log('Terminé - FileDatabase - TS_Tab_Object_Recuperate_Id');
}
















public TS_Tab_Object_Recuperate_Id(): void {
  this.Tab_IFU_Recherche.forEach((IfuR_Value) => {
    this.rechercherEtTraiter(IfuR_Value.value, new Set<string>());
  });
  console.log('Terminé123123 - FileDatabase - TS_Tab_Object_Recuperate_Id', this.Tab_Object_Recuperate_Id);
}




private rechercherEtTraiter(valueToFind: string, alreadySearched = new Set<string>()): void {
  // Vérifiez si nous avons déjà recherché cette valeur pour éviter la boucle infinie
  if (alreadySearched.has(valueToFind)) {
    return;
  }
  // Marquez cette valeur comme recherchée
  alreadySearched.add(valueToFind);

  this.Tab_BD_Button.forEach((Tab_BD_Button_Line) => {
    if (Tab_BD_Button_Line.FBtn_FrontBehindObject === valueToFind) {
      // Logique de traitement lorsque les conditions sont remplies
      const newObject: Interface_Tab_BD_Button_Detail = {
        ...Tab_BD_Button_Line
      };
      this.Tab_Object_Recuperate_Id.push(newObject);
      // Avant d'effectuer un appel récursif, assurez-vous que la nouvelle valeur à rechercher
      // n'est pas déjà dans le set `alreadySearched`.
      if (!alreadySearched.has(Tab_BD_Button_Line.FBtn_FrontBehindObject)) {
        // Attention : cette partie peut créer une boucle récursive infinie si les conditions ne sont jamais brisées !
        this.rechercherEtTraiter(Tab_BD_Button_Line.FBtn_FrontBehindObject, alreadySearched);
      }
    }
  });
}

/*
      traitement A1:
        pour chaque Tab_IFU_Recherche (IfuR_Value)
        donne moi la liste de ligne de Tab_BD_Button (Tab_BD_Button_Line)
        si on a Tab_BD_Button_Line.FBtn_FrontBehindObject = IfuR_Value
        alors : ajoute la valeur de FBtn_FrontBehindObject qui est dans Tab_BD_Button_Line,  dans la table Tab_IFU_Recherche
      
      et meme pour cette nouvelle valeur tu continue le traitement A1
      Une fois c'est terminé :
        pour chaque valeur de IfuR_Value
          pour chaque valeur de Tab_BD_Button_Line.FBtn_Id
            si on a IfuR_Value = Tab_BD_Button_Line.FBtn_Id
              this.Tab_Object_Recuperate_Id.push(newObject);
*/

TS_Tab_Object_Recuperate_Id_of_FrontBehindObject(): void {
  this.Tab_BD_Button.forEach((BDBtn_Value) => {
    if (BDBtn_Value.FBtn_FrontBehindObject !== null) {
      this.Tab_IFU_Recherche.forEach((IfuR_Value) => {
        const BDBtn_FrontBehindObject = (BDBtn_Value.FBtn_FrontBehindObject ?? "").toString();
        if (BDBtn_FrontBehindObject === IfuR_Value.value) {
          const newObject: Interface_Tab_BD_Button_Detail = {
            ...BDBtn_Value,
            FBtn_PositionX_1: BDBtn_Value.FBtn_PositionX,
            FBtn_PositionY_1: BDBtn_Value.FBtn_PositionY,
          };
          this.Tab_Object_Recuperate_Id.push(newObject);
        }
      });
    }
  });
  console.log('Terminé - FileDatabase - TS_Tab_Object_Recuperate_Id_of_FrontBehindObject');
}

public Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[] = [];
TS_RemoveDuplicates(): void {

  const copiedArray: Interface_Tab_BD_Button_Detail[] = JSON.parse(JSON.stringify(this.Tab_Object_Recuperate_Id));
  const Tab_Object_Recuperate_Id_2 = copiedArray.map(obj => ({
    ...obj,
    FBtn_PositionX_1: obj.FBtn_PositionX,
    FBtn_PositionY_1: obj.FBtn_PositionY,
  }));
  this.Tab_Object_Recuperate_Id_2 = Tab_Object_Recuperate_Id_2.filter((item, index, array) => {
    return array.findIndex(t => t.FBtn_Id === item.FBtn_Id) === index;
  });
  console.log('Terminé - FileDatabase - TS_RemoveDuplicates');
}







/*                                                   --------------------------                                                       */



/*
  this.Var_Subscription = this.S8o8o3SceCommunicationService.TS_Sce_Detect_From_FileRessources_To_FileDB$.subscribe(
    (List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]) => {
      this.id_1 = List_VarS_IFU_Recherche[0].value;
      const observable = this.S8o8o3SceCommunicationService.TS_Sce_ReceiveData_From_FileRessources_To_FileDB_ById(this.id_1);
      if (observable) {
        this.Var_Subscription = observable.subscribe(
          (List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]) => {
*/

            // Faites vos traitements ici
            //this.Tab_IFU_Recherche = List_VarS_IFU_Recherche;
/*
            this.TS_GetData_From_DB();
            this.S8o8o3SceCommunicationService.TS_Sce_SendData_From_FileDB_To_FileRessources(this.id_1, this.Tab_IFU_Recherche);
*/

/*
            console.log(4)
            console.log(this.Tab_IFU_Recherche)
            console.log(5)
          },
          (error) => {
            console.error("Erreur lors de la souscription:", error);
          }
        );
      } else {
        console.error("La méthode n'a pas renvoyé d'observable.");
      }
    }
  );
*/



/*
  private dataSubscription!: Subscription;
  TS_GetData_From_FileRessources2(): void {
    this.S8o8o3SceCommunicationService.TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB$.subscribe(
      List_VarS_IFU_Recherche => {
        this.Tab_IFU_Recherche = List_VarS_IFU_Recherche
        this.TS_GetData_From_DB()
      }
    );
  }
*/



















Get_DB_FBtn_FrontBehindObject: number | null = null;
TS_Recuperate_Id_of_FrontBehindObject(Input_VarS_IFU_Recherche: string | number | null | undefined = null): void {
    const inputNumber = typeof Input_VarS_IFU_Recherche === 'number' ? Input_VarS_IFU_Recherche : parseInt(Input_VarS_IFU_Recherche as string, 10);
    if (typeof inputNumber === 'number' && !isNaN(inputNumber)) {
      this.Get_DB_FBtn_FrontBehindObject = inputNumber;
      this.TS_Activate_Sce_SendData_From_DB_2(this.Get_DB_FBtn_FrontBehindObject)
    } else {
      console.error('FBtn_FrontBehindObject doit être un nombre');
    }
} 
  


TS_Activate_Sce_SendData_From_DB_2(Get_DB_FBtn_FrontBehindObject: number): void {   
    /*this.S8o8o1RessourcesService.TS_Sce_GetButton_FBtn_FrontBehindObject_From_DB_To_UI(Get_DB_FBtn_FrontBehindObject.toString()).subscribe(buttonDetails => {    
      buttonDetails.forEach((button) => {       
        const buttonId = button.FBtn_Id ?? null;
        const Tab_ButtonDetailsToSend: Interface_Tab_BD_Button_Detail = {
          FBtn_Id: buttonId,
          FBtn_FrontBehindObject: button.FBtn_FrontBehindObject,
          FBtn_PositionX: button.FBtn_PositionX,
          FBtn_PositionY: button.FBtn_PositionY,
          FBtn_PositionX_1: '',
          FBtn_PositionY_1: '',
          };
        this.Tab_BD_Button.push(Tab_ButtonDetailsToSend); // Ajoutez les données au tableau
        if (buttonId) {
          
          this.TS_Recuperate_Id_of_FrontBehindObject(buttonId) 
        }      
      })
    }, error => {
      if (error.status === 404) {
        console.log('Erreur 404 accepté :', error);
      } else {
        console.log('A Vérifier Erreur - Une erreur est survenue lors de la récupération des détails du bouton', error);
      }
    });*/
}


  
  Get_DB_FBtn_Id: number | null = null;
  TS_Recuperate_Id(Input_VarS_IFU_Recherche: string | number | null | undefined = null) {

      const inputNumber = typeof Input_VarS_IFU_Recherche === 'number' ? Input_VarS_IFU_Recherche : parseInt(Input_VarS_IFU_Recherche as string, 10);
      if (typeof inputNumber === 'number' && !isNaN(inputNumber)) {
        this.Get_DB_FBtn_Id = inputNumber;
        this.TS_Activate_Sce_SendData_From_DB(this.Get_DB_FBtn_Id)
      } else {
        console.error('Get_DB_FBtn_Id doit être un nombre');
      }
 
  }

  TS_Activate_Sce_SendData_From_DB(Get_DB_FBtn_Id: number): void { 

    /*this.S8o8o1RessourcesService.TS_Sce_GetButton_From_DB_To_UI(Get_DB_FBtn_Id).subscribe(buttonDetails => {         
      const Tab_ButtonDetailsToSend: Interface_Tab_BD_Button_Detail = 
      {
        FBtn_Id: buttonDetails.FBtn_Id ?? null,
        FBtn_FrontBehindObject: buttonDetails.FBtn_FrontBehindObject,
        FBtn_PositionX: buttonDetails.FBtn_PositionX,
        FBtn_PositionY: buttonDetails.FBtn_PositionY,
        FBtn_PositionX_1: '',
        FBtn_PositionY_1: '',
      }      
      this.Tab_BD_Button.push(Tab_ButtonDetailsToSend);
    });*/
  }


  
























/* TS_Activate_Sce_SendData_From_FileRessources(): void {
    this.S8o8o3SceCommunicationService.data$.subscribe(data_Input_VarS_IFU_Recherche => { 
        this.TS_Activate_Sce_GetAllData_FromDB() 
        this.TS_Recuperate_Id(data_Input_VarS_IFU_Recherche);
        this.TS_Recuperate_Id_of_FrontBehindObject(data_Input_VarS_IFU_Recherche?.toString() || '');
    });
      this.TS_Activate_Sce_SendData_To_FileRessources()
  }
*/






TS_Activate_Sce_SendData_From_FileRessources(): void {
  /*
  this.S8o8o3SceCommunicationService.TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB$
  this.dataSubscription = this.S8o8o3SceCommunicationService.TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB$.subscribe(
    List_VarS_IFU_Recherche => {
      this.Tab_IFU_Recherche = List_VarS_IFU_Recherche
    }
  );
  console.log(775)
  console.log(this.Tab_IFU_Recherche )

  this.TS_Activate_Sce_GetAllData_FromDB(this.Tab_IFU_Recherche).subscribe({
    next: data => console.log('Data:', data),
    error: error => console.error('Error:', error),
    complete: () => console.log('Completed')
  });
  */

/*
    .pipe(
      switchMap(Tab_Data_Full => {
        const List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[] = Tab_Data_Full.map(Valeur => {
          return { value: Valeur.value }; 
        });
        console.log(115)
        console.log(List_VarS_IFU_Recherche)
        console.log(116)
        return this.TS_Activate_Sce_GetAllData_FromDB(List_VarS_IFU_Recherche);
      })
    )
    .subscribe(() => {
      this.TS_Activate_Sce_SendData_To_FileRessources();
    });

    setTimeout(() => {
      console.log('4444444');
      const boutonRecherche = this.Tab_BD_Button.find(Tab_BD_Button_Value => Tab_BD_Button_Value.FBtn_Id === 4);
      if (boutonRecherche) {
        console.log(boutonRecherche);
      } else {
        console.log('Aucun bouton trouvé avec FBtn_Id = 4');
      }
      console.log('5555555');
    }, 5000);

*/
}



TS_Activate_Sce_GetAllData_FromDB(List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]): Observable<any> {
  console.log(6666);
  
  console.log('List_VarS_IFU_Recherche (Entrée):', List_VarS_IFU_Recherche);
  return new Observable((observer: Observer<any>) => {
    console.log('Souscription à TS_Sce_GetAllButtonData');
    this.S8o8o1RessourcesService.TS_Sce_GetAllButtonData().subscribe(
      Tab_Data_Full => 
        {
          console.log('Données reçues de TS_Sce_GetAllButtonData:', Tab_Data_Full);
          this.Tab_BD_Button = Tab_Data_Full;
          console.log('Filtrage des boutons');
          const Tab_Data_Filtre = this.Tab_BD_Button.filter(
                                        Tab_BD_Button_Filter => List_VarS_IFU_Recherche.some(
                                                              List_VarS_IFU_Recherche_Some => parseInt(List_VarS_IFU_Recherche_Some.value) === Tab_BD_Button_Filter.FBtn_Id)
                                                      );



          if (Tab_Data_Filtre.length > 0) {
            console.log('Boutons trouvés:', Tab_Data_Filtre);
          } else {
            console.log('Aucun bouton trouvé');
          }
          
          
          console.log(77777);
          console.log(List_VarS_IFU_Recherche);
          console.log(Tab_Data_Filtre);
          console.log(this.Tab_BD_Button);
          console.log(55555);
          observer.next(Tab_Data_Full);
          observer.complete();
        },
    );

  });
  
}






/*

TS_Sce_Get_Ressources_T_Button2(): void {
  
  this.S8o8o3SceCommunicationService.data$.subscribe(data_Input_VarS_IFU_Recherche => {
    //console.log('Données reçues:', data_Input_VarS_IFU_Recherche);
    
    this.TS_Recuperate_Id(data_Input_VarS_IFU_Recherche);
    this.TS_Recuperate_Id_of_FrontBehindObject(data_Input_VarS_IFU_Recherche?.toString() || '');
    //console.log('Last:', this.Tab_BD_Button)
    
    console.log(126)
    console.log(this.Tab_BD_Button)

    this.S8o8o3SceCommunicationService.sendTabButtons(this.Tab_BD_Button);

  });
}
*/

  /* 
    2.1 Communication avec s8o1o7-draggable
  */
  @Input() Input_VarS_IFU_Recherche: string = '';
  @Output() Output_from_VarS_IFU_FrontBehindObject = new EventEmitter<string>();
  TS_UpdateOutputValue(value: string) {
      this.Output_from_VarS_IFU_FrontBehindObject.emit(value); 
  }
  @Input() Input_Tab_ActualDataPosition: any[] = [];

  /* 
  2. Get Data & Send 
    Source Data : 
      - DB : (TS_Sce_GetButton_From_DB_To_UI)
      - Update-User - File UI/Position.. :
        - List_Notify_UpdateButton_From_UI_To_FileDB
      

    Send to Files: (TS_Sce_SendData_From_FileDatabase_To_OtherFile)
      s8o1o9o1o1-ui
      s8o1o9o1o2-position
  */

  /* # 1 Id */
  
  /* # 2 Object */
  Get_DB_FBtn_Object: string = '';
  /* # 3 Input */
  /* # 3.1 Attachment */
  /* # 3.2 UI */
  Get_DB_FBtn_Name: string = '';
  Get_DB_FBtn_Label: string = '';
  Get_DB_FBtn_Style: string = ''; 
  Get_DB_FBtn_Size: string = '';  
  Get_DB_FBtn_Color: string = '';
  Get_DB_FBtn_BackgroundColor: string = '';
  Get_DB_FBtn_Border: string = '';
  /* # 3.3 Position */
  Get_DB_FBtn_FrontBehind: string = '';
  
  Get_DB_FBtn_PositionX: string = '';
  Get_DB_FBtn_PositionY: string = '';
  /* # 4 Output */
  /* # 4.1 Treatment */
  Get_DB_FBtn_TreatmentButton: string = '';
  Get_DB_FBtn_TreatmentType: string = '';
  Get_DB_FBtn_InputButtonAction3: string = '';


  /* # 1 Id */
  Get_DB_FBtn_Id_2: number | null = null;
  /* # 3.3 Position */
  Get_DB_FBtn_FrontBehind_2: string = '';
  Get_DB_FBtn_FrontBehindObject_2: string = '';
  Get_DB_FBtn_PositionX_2: string = '';
  Get_DB_FBtn_PositionY_2: string = '';






 /* Partie 1 : Get Data */
/* Traitement Get/Input Variables - Get Data From DB */
  @Output() Output_from_FileDB_Get_DB_FBtn_Position: EventEmitter<any[]> = new EventEmitter<any[]>();
  TS_Sce_Get_Ressources_T_Button(VarN_Button_Update_Activate: number) {
    if (this.Input_VarS_IFU_Recherche !== null) {
      this.Get_DB_FBtn_Id = parseInt(this.Input_VarS_IFU_Recherche.toString(), 10);
      } else {
          this.Get_DB_FBtn_Id = null;
      }
    if (typeof this.Get_DB_FBtn_Id === 'number') {
      this.S8o8o1RessourcesService.TS_Sce_GetButton_From_DB_To_UI(this.Get_DB_FBtn_Id).subscribe(buttonDetails =>  
          {
            /* # 1 Id */
            this.Get_DB_FBtn_Id = buttonDetails.FBtn_Id ?? null;
            /* # 2 Object */
            this.Get_DB_FBtn_Object = buttonDetails.FBtn_Object;
            /* # 3 Input */
            /* # 3.1 Attachment */
            /* # 3.2 UI */
            this.Get_DB_FBtn_Name = buttonDetails.FBtn_Name;
            this.Get_DB_FBtn_Label = buttonDetails.FBtn_Label;
            this.Get_DB_FBtn_Style = buttonDetails.FBtn_Style;
            this.Get_DB_FBtn_Size = buttonDetails.FBtn_Size;
            this.Get_DB_FBtn_Color = buttonDetails.FBtn_Color;
            this.Get_DB_FBtn_BackgroundColor = buttonDetails.FBtn_BackgroundColor;
            this.Get_DB_FBtn_Border = buttonDetails.FBtn_Border;
            /* # 3.3 Position */
            this.Get_DB_FBtn_FrontBehind = buttonDetails.FBtn_FrontBehind;
            this.Get_DB_FBtn_FrontBehindObject = parseInt(buttonDetails.FBtn_FrontBehindObject, 10);
            this.Get_DB_FBtn_PositionX = buttonDetails.FBtn_PositionX;
            this.Get_DB_FBtn_PositionY = buttonDetails.FBtn_PositionY;
            /* # 4 Output */
            /* # 4.1 Treatment */
            this.Get_DB_FBtn_TreatmentButton = buttonDetails.FBtn_TreatmentButton;
            this.Get_DB_FBtn_TreatmentType = buttonDetails.FBtn_TreatmentType;
            this.Get_DB_FBtn_InputButtonAction3 = buttonDetails.FBtn_InputButtonAction3; 

            const buttonDetailsToSend = {
              id: this.Get_DB_FBtn_Id,
              object: this.Get_DB_FBtn_Object,
              name: this.Get_DB_FBtn_Name,
              label: this.Get_DB_FBtn_Label,
              style: this.Get_DB_FBtn_Style,
              size: this.Get_DB_FBtn_Size,
              color: this.Get_DB_FBtn_Color,
              backgroundColor: this.Get_DB_FBtn_BackgroundColor,
              border: this.Get_DB_FBtn_Border,
              FrontBehind: this.Get_DB_FBtn_FrontBehind,
              FrontBehindObject: this.Get_DB_FBtn_FrontBehindObject,
              PositionX: this.Get_DB_FBtn_PositionX,
              PositionY: this.Get_DB_FBtn_PositionY,
            }; 

      this.S8o8o3SceCommunicationService.TS_Sce_SendData_From_FileDatabase_To_OtherFile(this.Input_VarS_IFU_Recherche, buttonDetailsToSend);

      const values = [
        this.Get_DB_FBtn_Id,
        this.Get_DB_FBtn_FrontBehind,
        this.Get_DB_FBtn_FrontBehindObject,
        this.Get_DB_FBtn_PositionX,
        this.Get_DB_FBtn_PositionY
      ];
      
      this.Output_from_FileDB_Get_DB_FBtn_Position.emit(values);
    
      if (VarN_Button_Update_Activate === 1) {
        this.TS_Sce_Get_Ressources_T_Button_2(this.Get_DB_FBtn_FrontBehindObject?.toString() ?? null);
        this.Output_from_VarS_IFU_FrontBehindObject.emit(this.Get_DB_FBtn_FrontBehindObject?.toString() ?? null);
      }
      
      VarN_Button_Update_Activate = 1; 

    });

  } else {
    console.error('Invalid Get_DB_FBtn_Id value:', this.Get_DB_FBtn_Id);
  }
  }


 


  
  TS_Sce_Get_Ressources_T_Button_2(Get_DB_FBtn_FrontBehindObject: string) { {
    console.log(Get_DB_FBtn_FrontBehindObject)
    if (Get_DB_FBtn_FrontBehindObject !== null) {
      console.log(Get_DB_FBtn_FrontBehindObject)
      this.Get_DB_FBtn_Id_2 = parseInt(Get_DB_FBtn_FrontBehindObject.toString(), 10);
      } else {
          this.Get_DB_FBtn_Id_2 = null;
      }
    if (typeof this.Get_DB_FBtn_Id_2 === 'number') {
      this.S8o8o1RessourcesService.TS_Sce_GetButton_From_DB_To_UI(this.Get_DB_FBtn_Id_2).subscribe(buttonDetails =>  
          {
            /* # 1 Id */
            this.Get_DB_FBtn_Id_2 = buttonDetails.FBtn_Id ?? null;
            /* # 3.3 Position */
            this.Get_DB_FBtn_FrontBehind_2 = buttonDetails.FBtn_FrontBehind;
            this.Get_DB_FBtn_FrontBehindObject_2 = buttonDetails.FBtn_FrontBehindObject;
            this.Get_DB_FBtn_PositionX_2 = buttonDetails.FBtn_PositionX;
            this.Get_DB_FBtn_PositionY_2 = buttonDetails.FBtn_PositionY;

            const buttonDetailsToSend = {
              id_2: this.Get_DB_FBtn_Id,
              FrontBehind_2: this.Get_DB_FBtn_FrontBehind_2,
              FrontBehindObject_2: this.Get_DB_FBtn_FrontBehindObject_2,
              PositionX_2: this.Get_DB_FBtn_PositionX_2,
              PositionY_2: this.Get_DB_FBtn_PositionY_2,
            };
            
            this.S8o8o3SceCommunicationService.TS_Sce_SendData_From_FileDatabase_To_OtherFile(Get_DB_FBtn_FrontBehindObject, buttonDetailsToSend);
          });
      } 
    else 
      {
        console.error('Invalid Get_DB_FBtn_Id_2 value:', this.Get_DB_FBtn_Id_2);
      }
  }



}


}


