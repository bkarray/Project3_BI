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


interface CommunicationData {
  id: string;
  List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[];
  Tab_Object_Recuperate_Id_2?: Interface_Tab_BD_Button_Detail[]; 
  Tab_Object: Interface_Tab_BD_Button_Detail[];
}

interface CommunicationData2 {
  Tab_SelectedItem?: Interface_Tab_BD_Button_Detail[];
}

@Injectable({
  providedIn: 'root'
})
export class S8o8o3SceCommunicationService {
  
  constructor() {}
  



private subject = new BehaviorSubject<CommunicationData>({
  id: '',
  List_VarS_IFU_Recherche: [],
  Tab_Object_Recuperate_Id_2: [],
  Tab_Object: []
});

// Partie 1: Gestion de l'id
getElementById(): Observable<{ id: string }> {
  return this.subject.asObservable().pipe(
    map(data => {
      return {
        id: data.id
      };
    })
  );
}

TS_Sce_Detect_From_FileRessources_To_FileDB$: Observable<{ id: string, List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[] }> = this.subject.asObservable().pipe(
  //tap: Cet opérateur ne transforme pas les données émises par l'Observable.
  tap(({ id, List_VarS_IFU_Recherche }) => this.logData('Terminé - FileService - TS_Sce_Detect_From_FileRessources_To_FileDB', id, List_VarS_IFU_Recherche))
);

TS_Sce_Detect_From_FileDB_To_FileRessources$: Observable<{ id: string, Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[] }> = this.subject.asObservable().pipe(
  //map: Cet opérateur est utilisé pour transformer les données émises par un Observable. 
  map(({ id, Tab_Object_Recuperate_Id_2 }) => {
    const data = Tab_Object_Recuperate_Id_2 || [];
    this.logData('Terminé - FileService - TS_Sce_Detect_From_FileDB_To_FileRessources', id, data);
    return { id, Tab_Object_Recuperate_Id_2: data };
  })
);

TS_Sce_Detect_From_FileRessources_To_FileDraggable$: Observable<{ id: string, Tab_Object: Interface_Tab_BD_Button_Detail[] }> = this.subject.asObservable().pipe(
  //map: Cet opérateur est utilisé pour transformer les données émises par un Observable. 
  map(({ id, Tab_Object }) => {
    const data = Tab_Object || [];
    this.logData('Terminé - FileService - TS_Sce_Detect_From_FileRessources_To_FileDraggable', id, data);
    return { id, Tab_Object: data };
  })
);

TS_Sce_Detect_From_FileRessources_To_FileSettings$: Observable<{ id: string, Tab_Object: Interface_Tab_BD_Button_Detail[] }> = this.subject.asObservable().pipe(
  //map: Cet opérateur est utilisé pour transformer les données émises par un Observable. 
  map(({ id, Tab_Object }) => {
    const data = Tab_Object || [];
    this.logData('Terminé - FileService - TS_Sce_Detect_From_FileRessources_To_FileSettings', id, data);
    return { id, Tab_Object: data };
  })
);

private logData(methodName: string, id: string, data: any): void {
  console.log(`Terminé - FileService - ${methodName}: (Input:id,Data)`, id, data);
}

sendData(id: string, data: Partial<CommunicationData>): void {
  const currentData = this.subject.getValue();
  this.subject.next({ ...currentData, id, ...data });
  this.logData('SendData', id, data);
  console.log('Terminé - FileService - sendData',id)
}

TS_Sce_SendData_From_FileRessources_To_FileDB(id: string, List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileRessources_To_FileDB: (Input:id,List_VarS_IFU_Recherche)', id, List_VarS_IFU_Recherche);
  this.sendData(id, { List_VarS_IFU_Recherche });
}

TS_Sce_SendData_From_FileDB_To_FileRessources(id: string, Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileRessources_To_FileDB: (Input:id,Tab_Object_Recuperate_Id_2)', id, Tab_Object_Recuperate_Id_2);
  this.sendData(id, { Tab_Object_Recuperate_Id_2 });
}

TS_Sce_SendData_From_FileRessources_To_FileDraggable(id: string, Tab_Object: Interface_Tab_BD_Button_Detail[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileRessources_To_FileDraggable: (Input:id,Tab_Object)', id, Tab_Object);
  this.sendData(id, { Tab_Object });
}

TS_Sce_SendData_From_FileRessources_To_FileSettings(id: string, Tab_Object: Interface_Tab_BD_Button_Detail[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileRessources_To_FileSettings: (Input:id,Tab_Object)', id, Tab_Object);
  this.sendData(id, { Tab_Object });
}




private subject_From_FileSettings = new BehaviorSubject<CommunicationData2>({
  Tab_SelectedItem: [],
});

TS_Sce_Detect_From_FileSettings$: Observable<{ Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] }> = this.subject_From_FileSettings.asObservable().pipe(
  map(({ Tab_SelectedItem }) => {
    const data = Tab_SelectedItem || [];
    this.logData_From_FileSettings('Terminé - FileService - TS_Sce_Detect_From_FileDB_To_FileRessources', data);
    return { Tab_SelectedItem: data };
  })
);

private logData_From_FileSettings(methodName: string, data: any): void {
  console.log(`Terminé - FileService - logData_From_FileSettings - ${methodName}: (Input:id,Data)`, data);
}

sendData_From_FileSettings(data: Partial<CommunicationData2>): void {
  const currentData = this.subject_From_FileSettings.getValue();
  this.subject_From_FileSettings.next({ ...currentData, ...data });
  this.logData_From_FileSettings('sendData_From_FileSettings', data);
  console.log('Terminé - FileService - sendData_From_FileSettings')
}

TS_Sce_SendData_From_FileSettings(Tab_SelectedItem: Interface_Tab_BD_Button_Detail[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileSettings: (Tab_SelectedItem)', Tab_SelectedItem);
  const data: Partial<CommunicationData2> = { Tab_SelectedItem };
  this.sendData_From_FileSettings(data);
}

















TS_Sce_Detect_From_FileRessources_To_FileDB1$: Observable<{ id: string, List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[], Tab_Object_Recuperate_Id_2?: Interface_Tab_BD_Button_Detail[] }> = this.subject.asObservable().pipe(
  tap(({ id, List_VarS_IFU_Recherche }) => this.logData('Terminé - FileService - TS_Sce_Detect_From_FileRessources_To_FileDB1', id, List_VarS_IFU_Recherche))
);

getElementObservable(index: number, fieldName: keyof CommunicationData): Observable<{ id: string, Table: any[] }> {
  return this.subject.asObservable().pipe(
    map(data => {
      const fieldData = data[fieldName];
      const element = Array.isArray(fieldData) && fieldData.length > index ? fieldData[index] : undefined;
      return {
        id: data.id,
        Table: element !== undefined ? [element] : []
      };
    }),
    tap(result => {
      if (result.Table.length > 0) {
        this.logData('GetElementObservable1', result.id, result.Table[0]);
      }
    })
  );
}

getElementObservable1(index: number, fieldName: keyof CommunicationData): Observable<{ id: string, Table: any[] }> {
  return this.subject.asObservable().pipe(
    map(data => {
      const fieldData = data[fieldName];
      const element = Array.isArray(fieldData) && fieldData.length > index ? fieldData[index] : undefined;
      return {
        id: data.id,
        Table: element !== undefined ? [element] : []
      };
    }),
    tap(result => {
      if (result.Table.length > 0) {
        this.logData('GetElementObservable1', result.id, result.Table[0]);
      }
    })
  );
}











/*
TS_Sce_Detect_From_FileRessources_To_FileDB$: Observable<{id: string, List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]}> = this.subject.asObservable().pipe(
  //tap: Cet opérateur ne transforme pas les données émises par l'Observable.
  tap(data => {
    const { id, List_VarS_IFU_Recherche } = data;
    console.log('Terminé - FileService - TS_Sce_Detect_From_FileRessources_To_FileDB: (Input:id,List_VarS_IFU_Recherche)', id, List_VarS_IFU_Recherche);

  })
);

// Observable pour détecter les changements des données envoyées de FileDB à FileRessources
TS_Sce_Detect_From_FileDB_To_FileRessources$: Observable<{id: string, Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[]}> = this.subject.asObservable().pipe(
  //map: Cet opérateur est utilisé pour transformer les données émises par un Observable. 
  map(data => {
    const Tab_Object_Recuperate_Id_2 = data.Tab_Object_Recuperate_Id_2 || [];
    console.log('Terminé - FileService - TS_Sce_Detect_From_FileDB_To_FileRessources: (Input:id,List_VarS_IFU_Recherche)', data.id, Tab_Object_Recuperate_Id_2);
    return { id: data.id, Tab_Object_Recuperate_Id_2 };
  })
);

TS_Sce_SendData_From_FileRessources_To_FileDB(id: string, List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileRessources_To_FileDB: (Input:id,List_VarS_IFU_Recherche)', id, List_VarS_IFU_Recherche);
  this.subject.next({id, List_VarS_IFU_Recherche});
};

TS_Sce_SendData_From_FileDB_To_FileRessources(id: string, Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[]): void {
  console.log('Terminé - FileService - TS_Sce_SendData_From_FileRessources_To_FileDB: (Input:id,Tab_Object_Recuperate_Id_2)', id, Tab_Object_Recuperate_Id_2);
  const currentData = this.subject.getValue();
  this.subject.next({ ...currentData, id, Tab_Object_Recuperate_Id_2 });
}
*/








private dataStore: { [key: string]: BehaviorSubject<Interface_Tab_IFU_Recherche[]> } = {};
TS_Sce_ReceiveData_From_FileRessources_To_FileDB_ById(id: string): BehaviorSubject<Interface_Tab_IFU_Recherche[]> | undefined {
  if (!this.dataStore[id]) {
    console.error(`L'ID ${id} n'existe pas dans dataStore.`);
    return undefined;
  }
  return this.dataStore[id];
}







/*
private TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB_Subject = new BehaviorSubject<Interface_Tab_IFU_Recherche[]>([]);
TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB$ = this.TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB_Subject.asObservable();
TS_Sce_SendData_From_FileRessources_To_FileDB(List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[]): void {
  this.TS_Sce_ReceiveData_From_FileRessourcesTo_FileDB_Subject.next(List_VarS_IFU_Recherche);
}
*/


private TS_Sce_ReceiveData_From_FileDB_To_FileRessources_Subject = new BehaviorSubject<Interface_Tab_BD_Button_Detail[]>([]);
TS_Sce_ReceiveData_From_FileDB_To_FileRessources$ = this.TS_Sce_ReceiveData_From_FileDB_To_FileRessources_Subject.asObservable();
/*
TS_Sce_SendData_From_FileDB_To_FileRessources(Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[]): void {
  this.TS_Sce_ReceiveData_From_FileDB_To_FileRessources_Subject.next(Tab_Object_Recuperate_Id_2);
}
*/

private TS_Sce_ReceiveData_From_FileRessourcesTo_FileDraggable_Subject = new BehaviorSubject<Interface_Tab_BD_Button_Detail[]>([]);
TS_Sce_ReceiveData_From_FileRessourcesTo_FileDraggable$ = this.TS_Sce_ReceiveData_From_FileRessourcesTo_FileDraggable_Subject.asObservable();








 

  













private TS_Sce_ActivateData_From_FileDB_Subject = new BehaviorSubject<Interface_Tab_BD_Button_Detail[]>([]);
TS_Sce_ActivateData_From_FileDB$ = this.TS_Sce_ActivateData_From_FileDB_Subject.asObservable();
TS_Sce_SendData_From_FileDB(Tab_Object_Recuperate_Id_2: Interface_Tab_BD_Button_Detail[]): void {
  this.TS_Sce_ActivateData_From_FileDB_Subject.next(Tab_Object_Recuperate_Id_2);
}


List_ReceiveData_To_FileRessources(id: string): BehaviorSubject<any> | undefined {
  return this.dataStore_2[id];
}
  

















  private dataStore2: { [key: string]: BehaviorSubject<any> } = {};
  TS_Sce_SendData_From_FileDatabase_To_OtherFile(id: string, data: any) {
    // Vérifiez si le BehaviorSubject pour cet ID existe déjà, sinon créez-en un nouveau
    if (!this.dataStore2[id]) {
      this.dataStore2[id] = new BehaviorSubject<any>(null);
    }
    this.dataStore2[id].next(data);
  }

  List_SendData_From_FileDatabase_To_OtherFile_ById(id: string): BehaviorSubject<any> | undefined {
    return this.dataStore2[id];
  }


  private dataStore_2: { [key: string]: BehaviorSubject<any> } = {};
  TS_Sce_SendData_From_FileDatabase_To_OtherFile_2(id_2: string, data: any) {
    // Vérifiez si le BehaviorSubject pour cet ID existe déjà, sinon créez-en un nouveau
    if (!this.dataStore_2[id_2]) {
      this.dataStore_2[id_2] = new BehaviorSubject<any>(null);
    }
    this.dataStore_2[id_2].next(data);
  }

  List_SendData_From_FileDatabase_To_OtherFile_ById_2(id: string): BehaviorSubject<any> | undefined {
    return this.dataStore_2[id];
  }

  private dataStore_3: { [key: string]: BehaviorSubject<any> } = {};
  TS_Sce_SendData_From_FilePosition_To_OtherFile_3(id_3: string, data: any) {
    // Vérifiez si le BehaviorSubject pour cet ID existe déjà, sinon créez-en un nouveau
    if (!this.dataStore_3[id_3]) {
      this.dataStore_3[id_3] = new BehaviorSubject<any>(null);
    }
    this.dataStore_3[id_3].next(data);
  }

  List_SendData_From_FilePosition_To_OtherFile_ById_3(id_3: string): BehaviorSubject<any> | undefined {
    return this.dataStore_3[id_3];
  }


private Activate_Sce_SendData_From_FilePosition_Source = new Subject<string | number>();
public Activate_Sce_SendData_From_FilePosition$ = this.Activate_Sce_SendData_From_FilePosition_Source.asObservable();
private dataStore_4: { [key: string]: BehaviorSubject<any> } = {};  
TS_Activate_Sce_SendData_From_FilePosition_To_OtherFile_4(id_4: string | number, data: any) {
  if (!this.dataStore_4[id_4]) {
    this.dataStore_4[id_4] = new BehaviorSubject<any>(data);
    console.error(`L'IDd ${id_4} n'existe pas dans dataStore_4.`);
  } else {
    this.dataStore_4[id_4].next(data);
  }
  console.log("Activate_Sce_SendData_From_FilePosition$ a été déclenché avec l'id:", id_4);
  this.Activate_Sce_SendData_From_FilePosition_Source.next(id_4);

}
List_Activate_SendData_From_FilePosition_To_OtherFile_ById_4(id_4: string): BehaviorSubject<any> | undefined {
  if (!this.dataStore_4[id_4]) {
      console.error(`L'ID ${id_4} n'existe pas dans dataStore_4.`);
      return new BehaviorSubject<any>(null);
  }
  return this.dataStore_4[id_4];
}

private Activate_Sce_SendData_From_FileRessources_Source = new Subject<string | number>();
public Activate_Sce_SendData_From_FileRessources$ = this.Activate_Sce_SendData_From_FileRessources_Source.asObservable();
private dataStore_5: { [key: string]: BehaviorSubject<any> } = {};  
TS_Activate_Sce_SendData_From_FileRessources_To_OtherFile_5(id_5: string | number, data: any) {
  if (!this.dataStore_5[id_5]) {
    this.dataStore_5[id_5] = new BehaviorSubject<any>(data);
    console.error(`L'IDd ${id_5} n'existe pas dans dataStore_5.`);
  } else {
    this.dataStore_5[id_5].next(data);
  }
  this.Activate_Sce_SendData_From_FileRessources_Source.next(id_5);

}
List_Activate_SendData_From_FileRessources_To_OtherFile_ById_5(id_5: string): BehaviorSubject<any> | undefined {
  if (!this.dataStore_5[id_5]) {
      console.error(`L'ID ${id_5} n'existe pas dans dataStore_5.`);
      return new BehaviorSubject<any>(null);
  }
  return this.dataStore_5[id_5];
}




private Activate_Sce_SendData_From_FileDraggable_Source = new Subject<string | number>();
public Activate_Sce_SendData_From_FileDraggable$ = this.Activate_Sce_SendData_From_FileDraggable_Source.asObservable();
private dataStore_6: { [key: string]: BehaviorSubject<any> } = {};  
TS_Activate_Sce_SendData_From_FileDraggable_To_OtherFile_6(id_6: string | number, data: any) {
  if (!this.dataStore_6[id_6]) {
    this.dataStore_6[id_6] = new BehaviorSubject<any>(data);
    console.error(`L'IDd ${id_6} n'existe pas dans dataStore_6.`);
  } else {
    this.dataStore_6[id_6].next(data);
  }
  console.log("Activate_Sce_SendData_From_FilePosition$ a été déclenché avec l'id:", id_6);
  
  this.Activate_Sce_SendData_From_FileDraggable_Source.next(id_6);

}
List_Activate_SendData_From_FileDraggable_To_OtherFile_ById_6(id_6: string): BehaviorSubject<any> | undefined {
  if (!this.dataStore_6[id_6]) {
      console.error(`L'ID ${id_6} n'existe pas dans dataStore_6.`);
      return new BehaviorSubject<any>(null);
  }
  return this.dataStore_6[id_6];
}




private dataSubject1 = new BehaviorSubject<any[]>([]);
  setData(data: any[]) {
    this.dataSubject1.next(data);
  }

  getData(): Observable<any[]> {
    return this.dataSubject1.asObservable();
  }





  
private Activate_Sce_SendData_From_FileDB_Source = new Subject<string | number>();
public Activate_Sce_SendData_From_FileDB$ = this.Activate_Sce_SendData_From_FileDB_Source.asObservable();
private dataStore_7: { [key: string]: BehaviorSubject<any> } = {};  
TS_Activate_Sce_SendData_From_FileDB_To_OtherFile_7(id_7: string | number, data: any) {
  if (!this.dataStore_7[id_7]) {
    this.dataStore_7[id_7] = new BehaviorSubject<any>(data);
    console.error(`L'IDd ${id_7} n'existe pas dans dataStore_7.`);
  } else {
    this.dataStore_7[id_7].next(data);
  }
  console.log("Activate_Sce_SendData_From_FileDB$ a été déclenché avec l'id:", id_7);
  this.Activate_Sce_SendData_From_FileDB_Source.next(id_7);

}
List_Activate_SendData_From_FileDB_To_OtherFile_ById_7(id_7: string): BehaviorSubject<any> | undefined {
  if (!this.dataStore_7[id_7]) {
      console.error(`L'ID ${id_7} n'existe pas dans dataStore_7.`);
      return new BehaviorSubject<any>(null);
  }
  return this.dataStore_7[id_7];
}

private sendDataToRessourcesSource = new BehaviorSubject<any>(null);
public sendDataToRessources$ = this.sendDataToRessourcesSource.asObservable();

TS_SendDataToRessources(data: any): void {
  this.sendDataToRessourcesSource.next(data);
}






 
}








/*

Pour envoyer les données de s8o1-ressources.component.ts à s8o1o9o1o2-position.component.ts via le service, voici ce que vous avez fait :

Dans s8o1o7-draggable.component.ts, vous appelez la méthode TS_Activate_Sce_SendData_From_FileDraggable_To_OtherFile_6 du service pour envoyer les données.

Dans s8o8o3-sce-communication.service.ts, la méthode TS_Activate_Sce_SendData_From_FileDraggable_To_OtherFile_6 prend l'identifiant et les données, les enregistre ou les met à jour dans un BehaviorSubject correspondant.

Dans s8o1o9o1o2-position.component.ts, vous écoutez les changements de données du BehaviorSubject correspondant en utilisant la méthode List_Activate_SendData_From_FileDraggable_To_OtherFile_ById_6.


*/



/*
private Activate_Sce_SendData_From_FileDraggable_Source = new Subject<string | number>();
public Activate_Sce_SendData_From_FileDraggable$ = this.Activate_Sce_SendData_From_FileDraggable_Source.asObservable();
private dataStore_6: Map<string | number, BehaviorSubject<any>> = new Map();

TS_Activate_Sce_SendData_From_FileDraggable_To_OtherFile_6(id_6: string | number, data: any) {
  if (!this.dataStore_6.has(id_6)) {
    this.dataStore_6.set(id_6, new BehaviorSubject<any>(data));
  } else {
    let behaviorSubject = this.dataStore_6.get(id_6);
    if (behaviorSubject) {
      behaviorSubject.next(data); 
    }
  }
  this.Activate_Sce_SendData_From_FileDraggable_Source.next(id_6);
}

List_Activate_SendData_From_FileDraggable_To_OtherFile_ById_6(id_6: string | number): BehaviorSubject<any> | undefined {
  if (!this.dataStore_6.has(id_6)) {
      console.error(`L'ID ${id_6} n'existe pas dans dataStore_6.`);
      return new BehaviorSubject<any>(null);
  }
  return this.dataStore_6.get(id_6);
}
*/




/*
private Activate_Sce_SendData_From_FileDraggable_Source_7 = new Subject<string | number>();
public Activate_Sce_SendData_From_FileDraggable_7$ = this.Activate_Sce_SendData_From_FileDraggable_Source_7.asObservable();
private dataStore_7: { [key: string]: BehaviorSubject<any> } = {};  
TS_Activate_Sce_SendData_From_FileDraggable_To_OtherFile_7(id_6: string | number, data: any) {
  if (!this.dataStore_6[id_6]) {
    console.error(`L'IDd ${id_6} n'existe pas dans dataStore_6.`); 
    this.dataStore_6[id_6] = new BehaviorSubject<any>(data);
  } else {
    this.dataStore_6[id_6].next(data);
  }
  this.Activate_Sce_SendData_From_FileDraggable_Source_7.next(id_6);

}

List_Activate_SendData_From_FileDraggable_To_OtherFile_ById_7(id_6: string): BehaviorSubject<any> | undefined {
  if (!this.dataStore_6[id_6]) {
      console.error(`L'ID ${id_6} n'existe pas dans dataStore_6.`);
      return new BehaviorSubject<any>(null);
  }
  return this.dataStore_6[id_6];
}
*/