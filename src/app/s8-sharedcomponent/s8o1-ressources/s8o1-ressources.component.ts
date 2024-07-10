/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface - Service */
import { Interface_CmdCToFileData } from '../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

import { DataRow } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Tab_Buttons_Detail } from '../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

@Component({
  selector: 'app-s8o1-ressources',
  templateUrl: './s8o1-ressources.component.html',
  styleUrls: ['./s8o1-ressources.component.css']
})


export class S8o1RessourcesComponent implements OnInit {

constructor
  (
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
    private router: Router,
    private renderer: Renderer2
  ) 
  {
    this.fonctionnalites = Object.keys(this.Tab_Role[0])

    
    // Récupérer toutes les propriétés de Tab_Role
    const allProperties = []
    for (const key in this.Tab_Role[0]) {
      if (Object.hasOwnProperty.call(this.Tab_Role[0], key)) {
        const properties = Object.keys(this.Tab_Role[0][key])
        allProperties.push(...properties)
      }
    }
    // Ajouter toutes les propriétés à la ligne "All" de Tab_Balises
    this.Tab_Balises[0][2] = allProperties

  }

ngOnInit(): void {
  this.TS_GestionData_Active()
}

TS_GestionData_Active(): void { 
  this.TS_GetData_From_File_CommandCenter_Tab()
}
  
public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []
TS_GetData_From_File_CommandCenter_Tab(): void {
  
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_R().subscribe(data => {
      this.id_1 = data.id_1

      if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_2') {
        this.id_1 = '2_Post_Data_From_FileMenuContextuel_3'
        if (this.List_VarS_IFU_Recherche[1] !== undefined) {
          this.TS_PostData_To_File_CmdC()
        }  
      }

      if (this.id_1 === '5_Post_Data_From_FileUI_Update_2') {
        this.id_1 = '5_Post_Data_From_FileUI_Update_3'
        if (this.List_VarS_IFU_Recherche[1] !== undefined) {
          this.TS_PostData_To_File_CmdC()
        }  
      }

    })

}

TS_PostData_To_File_CmdC(): void {
  
  const dataToSend: Partial<Interface_CommunicationData> = {
    List_VarS_IFU_Recherche: this.List_VarS_IFU_Recherche
  };
  const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: '',
    id_3: '',
    id_4: '',
    tab_1: dataToSend,
    tab_2: {},
    tab_3: {},
    tab_4: {},
    tab_5: {},
    tab_6: {}}
  console.log('Start - FileRessources - Data_Interface', Data_Interface)
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_R_To_CmdC(Data_Interface)

}



/*
  1. Visuel HTML
*/ 
public Var_BtnSelected: string | number = ''
TS_CmdCenter_ButtonClick(): void {
  this.Var_BtnSelected = '1'
  this.id_1 = '7_Post_Data_From_FileRessources_CmdCenter_1'
  this.TS_PostData_To_File_CmdC() 
}

TS_Services_ButtonClick(): void {
  this.Var_BtnSelected = '2'
  this.id_1 = '6_Post_Data_From_FileRessources_Services_1'
  this.TS_PostData_To_File_CmdC() 
}

TS_VarTransfert_ButtonClick(): void {
  this.Var_BtnSelected = '3'
  this.id_1 = '11_Post_Data_From_TS_Variable_ButtonClick_1'
  console.log('teste',  this.id_1,this.Var_BtnSelected  )
  this.TS_PostData_To_File_CmdC() 
}

TS_Variable_ButtonClick(): void {
  this.Var_BtnSelected = '3'
  this.id_1 = '11_Post_Data_From_TS_Variable_ButtonClick_1'
  this.TS_PostData_To_File_CmdC() 
}

TS_Fonction_ButtonClick(): void {
  this.Var_BtnSelected = '4'
  this.id_1 = '12_Post_Data_From_TS_Variable_ButtonClick_1'
  this.TS_PostData_To_File_CmdC() 
}


/* 
  1.1 Recherche Principale
*/
public VarS_IFU_Recherche_Principale: string = 'GetButton';
public VarS_ObjectInput: string = '';
@Output() VarS_ObjectSelectedChange = new EventEmitter<string>();
TS_Change_VarS_IFU_Recherche_Principale(event: any) {
    this.VarS_ObjectInput = event.target.value;
    this.VarS_ObjectSelectedChange.emit(this.VarS_ObjectInput);
}
/* 
  1.2 Recherche
*/
TS_Change_List_VarS_IFU_Recherche(index: number, event: any) {
  this.List_VarS_IFU_Recherche[index].value = event.target.value;
}

TS_Remove_VarS_IFU_Recherche(index: number) {
  if (this.List_VarS_IFU_Recherche.length > 1) {
    this.List_VarS_IFU_Recherche.splice(index, 1);
  } else {
    alert("Vous devez avoir au moins un champ de recherche.");
  }
}
/* 
  1.3 Add
*/
TS_Add_VarS_IFU_Recherche() {
  this.List_VarS_IFU_Recherche.push({ value: '' });
}

/*
  2. Visuel HTML - Other Fonction
*/ 

/*
  2.1 GetButton
*/ 
TS_GetData_ButtonClick(): void {
  this.VarB_FileCmdCenter = true
  this.id_1 = '1_Post_Data_From_FileRessources_GetButton_1'
  this.TS_PostData_To_File_CmdC() 
}

public VarB_FileCmdCenter: boolean = false
public id: string = '';
public List_VarS_IFU_Recherche: any[] = [{ value: '' }]

/*************************************************************************************************************************************************************************************************/

public VarU_SearchBalise: string = ''
public VarU_SearchBaliseSuggestions: string[] = []
TS_UpdateSearchBalise(): void {
  if (this.VarU_SearchBalise) {
    const searchTerm = this.VarU_SearchBalise.toLowerCase()
    this.VarU_SearchBaliseSuggestions = this.Tab_Balises
      .filter(b => typeof b[0] === 'string' && b[0].toLowerCase().includes(searchTerm) 
                  || typeof b[1] === 'string' && b[1].toLowerCase().includes(searchTerm))
      .map(b => `${b[0]}: ${b[1]}`)
  } else {
    this.VarU_SearchBaliseSuggestions = []
  }
}

public VarU_SelectedBalise: string = ''
public VarTab_SelectedAttributes: SelectedAttribute[] = []
public VarU_AttributeValues: {[key: string]: string} = {}
TS_SelectSuggestion(suggestion: string): void {
  this.VarU_SearchBalise = suggestion.split(':')[0].trim()
  this.VarU_SelectedBalise = this.VarU_SearchBalise
  this.VarU_SearchBaliseSuggestions = []
  this.TS_ShowFunctionalityAttributes(this.VarU_SelectedFunctionality)
}

public VarU_SearchAttribute: string = ''
public VarU_SearchAttributeSuggestions: string[] = []
TS_UpdateSearchAttribute(): void {
  if (this.VarU_SearchAttribute) {
    const searchTerm = this.VarU_SearchAttribute.toLowerCase()
    this.VarU_SearchAttributeSuggestions = []
    this.Tab_Role.forEach(role => {
      for (let category in role) {
        for (let attribute in role[category]) {
          const attrString = attribute + ": " + role[category][attribute]
          if (attrString.toLowerCase().includes(searchTerm)) {
            this.VarU_SearchAttributeSuggestions.push(attrString)
          }
        }
      }
    })
  } else {
    this.VarU_SearchAttributeSuggestions = []
  }
}

public VarU_SelectedAttribute: string = ''
TS_SelectAttributeSuggestion(suggestion: string): void {
  this.VarU_SearchAttribute = suggestion.split(':')[0].trim()
  this.VarU_SelectedAttribute = this.VarU_SearchAttribute
  this.VarU_SearchAttributeSuggestions = []

  this.VarU_SelectedFunctionality = this.getFunctionalityForAttribute(this.VarU_SelectedAttribute)
  this.TS_ShowFunctionalityAttributes(this.VarU_SelectedFunctionality)

}

getFunctionalityForAttribute(attributeName: string): string {
  let foundFunctionality = '';
  for (const categoryKey in this.Tab_Role[0]) {
    const category = this.Tab_Role[0][categoryKey];
    if (category.hasOwnProperty(attributeName)) {
      foundFunctionality = categoryKey;
      break; // Sortir de la boucle dès qu'on trouve la catégorie
    }
  }
  return foundFunctionality;
}

public VarU_SelectedFunctionality: string = ''
public fonctionnalites: string[] = []
// Méthode pour afficher les attributs de la fonctionnalité sélectionnée
TS_ShowFunctionalityAttributes(fonctionnalite: string): void {
  this.VarU_SelectedFunctionality = fonctionnalite;
  this.VarTab_SelectedAttributes = [];

  const functionalityAttributes = this.Tab_Role[0][fonctionnalite];
  const details = this.Tab_Role[1].Details; // Récupérer les détails pour la vérification
  const associatedAttributes = this.Tab_Balises.find(balise => balise[0] === this.VarU_SelectedBalise);

  if (functionalityAttributes && associatedAttributes) {
    for (const key in functionalityAttributes) {
      if (functionalityAttributes.hasOwnProperty(key)) {
        if (associatedAttributes[2].includes(key)) {
          const value = functionalityAttributes[key];
          const showDetailButton = details[key] === '1'
          const detailValue = details[key]
          let detailButtonText = '';
          if (detailValue === '1') {
            detailButtonText = 'Details1';
          } else if (detailValue === '2') {
            detailButtonText = 'Details2';
          }
          const attributeObject: SelectedAttribute = {
            key, 
            value, 
            valueVisible: false, 
            userInput: '', 
            showDetailButton,
            showTextArea: false, // Initialisez la propriété showTextArea
            textAreaInput: '', // Initialisez la propriété textAreaInput
            detailButtonText, // Définir le texte du bouton
          }
          this.VarTab_SelectedAttributes.push(attributeObject);
        }
      }
    }
  }
}

TS_FunctionalitySelected(fonctionnalite: string): boolean {
  return this.VarU_SelectedFunctionality === fonctionnalite;
}


// Méthode pour afficher la description de l'attribut lorsque le curseur survole l'attribut
showAttributeDescription(description: string): void {
  // Mettez à jour la visibilité de la description de l'attribut
  this.VarTab_SelectedAttributes.forEach(attr => {
      attr.valueVisible = attr.value === description;
  });
}

// Méthode pour masquer la description de l'attribut lorsque le curseur quitte l'attribut
hideAttributeDescription(): void {
  // Masquez toutes les descriptions d'attributs
  this.VarTab_SelectedAttributes.forEach(attr => {
      attr.valueVisible = false
  })
}
// Définition des tables de données (Tab_Balises et Tab_Role)



showDetail(attributeKey: string): void {
  this.VarTab_SelectedAttributes = this.VarTab_SelectedAttributes.map(attr => {
    if (attr.key === attributeKey) {
      return { ...attr, showTextArea: !attr.showTextArea }; // Bascule la visibilité du textarea
    }
    return attr;
  });
}


public Tab_Role: any[] = [
  {
    "InformationsGenerales": {
      "id": "Identifiant unique pour l'élément",
      "name": "Nom de l'élément, utilisé pour référencer dans les formulaires",
      "value": "Valeur associée à l'élément (comme pour les entrées de formulaire)",
      "type": "Type de l'élément (utilisé dans les balises comme <input>, <button>)"
    },
    "StylesApparence": {
      "class": "Classe CSS pour le style de l'élément",
      "style": "Styles CSS en ligne",
      "width": "Largeur de l'élément",
      "height": "Hauteur de l'élément",
      "align": "Alignement de l'élément (obsolète en HTML5)",
      "background-color": "Couleur de fond de l'élément (obsolète en HTML5)",
      "color": "Couleur du texte de l'élément"
    },
    "PositionnementStructure": {
      "colspan": "Nombre de colonnes qu'une cellule de tableau doit couvrir",
      "rowspan": "Nombre de lignes qu'une cellule de tableau doit couvrir",
      "frame": "Bordure de la table (obsolète en HTML5)",
      "rules": "Règles de la bordure dans le tableau (obsolète en HTML5)"
    },
    "ComportementInteraction": {
      "onclick": "Événement déclenché par un clic gauche",
      "onrightclick": "Événement déclenché par un clic droit",
      "ondblclick": "Événement déclenché par un double clic",
      "disabled": "Désactive l'élément",
      "autofocus": "Focus automatique sur l'élément lors du chargement de la page",
      "tabindex": "Ordre de tabulation pour les éléments focusables",
      "oncontextmenu": "Événement déclenché par un clic droit (souvent pour les menus contextuels)",
      "onmousedown": "Événement lorsqu'un bouton de la souris est enfoncé",
      "onmouseup": "Événement lorsqu'un bouton de la souris est relâché",
      "onmouseover": "Événement lorsqu'une souris passe au-dessus de l'élément",
      "onmouseout": "Événement lorsqu'une souris quitte l'élément",
      "onmousemove": "Événement lors du mouvement de la souris sur l'élément",
      "onmouseenter": "Événement lorsqu'une souris entre dans l'élément",
      "onmouseleave": "Événement lorsqu'une souris quitte l'élément",
      "onkeydown": "Événement lorsqu'une touche du clavier est enfoncée",
      "onkeyup": "Événement lorsqu'une touche du clavier est relâchée",
      "onkeypress": "Événement lorsqu'une touche du clavier est pressée et relâchée"
    },
    "LiensReferences": {
      "href": "Hyperlien vers une autre ressource",
      "src": "Source de la ressource pour les balises comme <img>, <script>",
      "cite": "Référence à une source citée pour <blockquote>, <q>, <del>, <ins>",
      "formaction": "URL pour l'envoi du formulaire (pour les éléments de type submit)"
    },
    "AccessibiliteInternationalisation": {
      "alt": "Texte alternatif pour les images",
      "lang": "Langue de l'élément",
      "title": "Titre de l'élément, souvent affiché comme infobulle",
      "dir": "Direction du texte (ltr, rtl)"
    },
    "FormulairesEntrees": {
      "placeholder": "Texte d'indication pour les champs de saisie",
      "required": "Indique si le champ est obligatoire dans un formulaire",
      "formmethod": "Méthode HTTP pour l'envoi du formulaire (GET, POST)",
      "formenctype": "Type d'encodage des données du formulaire"
    },
    "AttributsObsolètes": {
      "cellpadding": "Espace entre le contenu des cellules et leurs bordures (obsolète en HTML5)",
      "cellspacing": "Espace entre les cellules (obsolète en HTML5)"
    },
    "AttributsSpecifiquesBalise": {
      "scope": "Portée des en-têtes pour les cellules de tableau",
      "reversed": "Inverse l'ordre des éléments de liste ordonnée",
      "target": "Spécifie où ouvrir le lien", "rel": "Relation avec la cible",
      "alt": "Texte alternatif pour les images",
      "action": "URL du formulaire", "method": "Méthode d'envoi du formulaire", "enctype": "Type d'encodage des données du formulaire",
      "placeholder": "Indication pour les champs de saisie", "type": "Type du champ de saisie",
      "form": "Forme associée au bouton", "formaction": "Action du formulaire pour le bouton", "formmethod": "Méthode d'envoi du formulaire pour le bouton", "formenctype": "Type d'encodage des données pour le bouton", 
      "formnovalidate": "Désactive la validation du formulaire pour le bouton", "formtarget": "Cible pour l'envoi du formulaire pour le bouton"
    },
    "ImportationFichiers": {
      "type": "Spécifie le type de l'élément input, 'file' pour l'importation de fichiers",
      "accept": "Définit les types de fichiers acceptés pour l'input de type 'file'",
      "multiple": "Permet la sélection de plusieurs fichiers dans un input de type 'file'",
      "src": "Utilisé dans les balises <img>, <iframe>, <script> pour spécifier la source du fichier",
      "href": "Utilisé dans les balises <a> et <link> pour spécifier le chemin d'un fichier ou d'une ressource",
      "download": "Attribut pour les balises <a>, indiquant que le lien est pour télécharger un fichier"
    },
    "FonctionnalitésAvancées": {
      "userSelect": "CSS : Contrôle la possibilité de sélectionner du texte",
      "onScreenCapture": "Imaginaire : Un événement pour détecter une capture d'écran",
      "onVideoCapture": "Imaginaire : Un événement pour détecter une capture vidéo",
      "onTextSelect": "Imaginaire : Un événement pour détecter la sélection de texte"
    }
  },
  {
    "Details": {
      "class": "1",
      "style": "1"
    }
  }
]

public Tab_Balises: any[] = [
  ["button", "Toutes les Attributs", []],
  ["div", "Utilisé pour définir une division ou une section dans un document HTML.", ["id", "class", "style", "title"]],
  ["button", "Représente un bouton cliquable, utilisé pour soumettre des formulaires ou pour déclencher des événements de script.", ["id", "name", "type", "onclick", "onrightclick", "ondblclick", "disabled", "style", "class", "autofocus", "tabindex"]],
  ["td", "Définit une cellule dans un tableau, qui contient des données.", ["colspan", "rowspan", "style", "align", "background-color"]],
  ["tr", "Définit une rangée dans un tableau.", ["style", "align", "background-color"]],
  ["table", "Utilisé pour créer un tableau.", ["style", "width", "height", "align", "background-color", "cellpadding", "cellspacing"]],
  ["th", "Définit une cellule d'en-tête dans un tableau.", ["scope", "colspan", "rowspan", "style", "align", "background-color"]],
  ["ul", "Définit une liste non ordonnée.", ["style", "class"]],
  ["ol", "Définit une liste ordonnée.", ["reversed", "style", "class"]],
  ["li", "Définit un élément de liste dans les listes ordonnées ou non ordonnées.", ["style", "class"]],
  ["a", "Définit un hyperlien.", ["href", "target", "rel", "style", "class", "title"]],
  ["span", "Utilisé pour regrouper des éléments en ligne à des fins de style.", ["id", "class", "style", "title"]],
  ["p", "Définit un paragraphe.", ["id", "class", "style", "title"]],
  ["h1", "Définit un en-tête de niveau 1, le plus important.", ["id", "class", "style", "title"]],
  ["h2", "Définit un en-tête de niveau 2.", ["id", "class", "style", "title"]],
  ["h3", "Définit un en-tête de niveau 3.", ["id", "class", "style", "title"]],
  ["h4", "Définit un en-tête de niveau 4.", ["id", "class", "style", "title"]],
  ["h5", "Définit un en-tête de niveau 5.", ["id", "class", "style", "title"]],
  ["h6", "Définit un en-tête de niveau 6, le moins important.", ["id", "class", "style", "title"]],
  ["img", "Utilisé pour intégrer des images.", ["src", "alt", "width", "height", "style", "class", "title"]],
  ["form", "Définit un formulaire HTML pour la saisie de l'utilisateur.", ["action", "method", "name", "id", "class", "style", "title", "enctype", "autocomplete", "novalidate"]],
  ["input", "Définit un champ de saisie pour un formulaire.", ["type", "name", "value", "placeholder", "id", "class", "style", "title", "disabled", "required", "min", "max", "step", "pattern", "size"]],
  ["label", "Définit une étiquette pour un élément input.", ["for", "id", "class", "style", "title"]],
  ["textarea", "Définit un champ de texte multiligne.", ["name", "rows", "cols", "placeholder", "id", "class", "style", "title", "disabled", "required"]],
  ["select", "Utilisé pour créer une liste déroulante.", ["name", "id", "class", "style", "title", "disabled", "required"]],
  ["option", "Définit une option dans une liste déroulante.", ["value", "selected", "disabled"]],
  ["br", "Insère un saut de ligne.", []],
  ["hr", "Insère une ligne horizontale.", ["style", "class"]],
  ["header", "Utilisé pour définir un en-tête pour un document ou une section.", ["id", "class", "style"]],
  ["footer", "Définit le pied de page d'un document ou d'une section.", ["id", "class", "style"]],
  ["nav", "Utilisé pour définir une section de navigation.", ["id", "class", "style"]],
  ["section", "Définit une section dans un document.", ["id", "class", "style"]],
  ["article", "Utilisé pour définir un contenu indépendant ou autonome.", ["id", "class", "style"]],
  ["aside", "Définit un contenu à part du contenu principal, souvent présenté comme une barre latérale.", ["id", "class", "style"]],
  ["figure", "Utilisé pour marquer du contenu comme une illustration ou un diagramme.", ["id", "class", "style"]],
  ["figcaption", "Fournit une légende pour le contenu de <figure>.", ["id", "class", "style"]],
  ["main", "Spécifie le contenu principal d'un document.", ["id", "class", "style"]],
  ["iframe", "Utilisé pour intégrer une autre page HTML dans la page actuelle.", ["src", "width", "height", "name", "id", "class", "style", "title", "frameborder", "allow", "allowfullscreen"]],
  ["blockquote", "Utilisé pour définir une citation longue.", ["cite", "id", "class", "style"]],
  ["q", "Pour une citation en ligne.", ["cite", "id", "class", "style"]],
  ["pre", "Affiche le texte exactement tel qu'il est écrit dans le code HTML, préservant les espaces et les sauts de ligne.", ["id", "class", "style"]],
  ["code", "Utilisé pour définir un fragment de code informatique.", ["id", "class", "style"]],
  ["em", "Met l'accent sur le texte (généralement en italique).", ["id", "class", "style"]],
  ["strong", "Donne de l'importance au texte (généralement en gras).", ["id", "class", "style"]],
  ["small", "Utilisé pour du texte en petite taille.", ["id", "class", "style"]],
  ["mark", "Surligne le texte.", ["id", "class", "style"]],
  ["del", "Représente un texte qui a été supprimé.", ["cite", "datetime", "id", "class", "style"]],
  ["ins", "Représente un texte qui a été ajouté.", ["cite", "datetime", "id", "class", "style"]],
  ["sub", "Définit un texte en indice.", ["id", "class", "style"]],
  ["sup", "Définit un texte en exposant.", ["id", "class", "style"]],
  ["b", "Pour le texte en gras, bien que généralement remplacé par <strong> pour une meilleure sémantique.", ["id", "class", "style"]],
  ["i", "Pour le texte en italique, bien que généralement remplacé par <em> pour une meilleure sémantique.", ["id", "class", "style"]],
  ["details", "Permet de créer un widget déroulant contenant des informations supplémentaires.", ["open", "id", "class", "style"]],
  ["summary", "Définit un titre visible pour <details>.", ["id", "class", "style"]],
  ["meter", "Utilisé pour afficher une mesure dans une plage connue (comme la consommation de disque).", ["value", "min", "max", "low", "high", "optimum", "id", "class", "style"]],
  ["progress", "Affiche une barre de progression.", ["value", "max", "id", "class", "style"]]
]



public VarU_ButtonContent: string = ''
@ViewChild('htmlContainer', { static: false }) container!: ElementRef
TS_CreateHtmlElement(): void {
  if (this.VarU_SelectedBalise) {
      // Crée l'élément
      const elem = this.renderer.createElement(this.VarU_SelectedBalise)
      
      // Si la balise sélectionnée est un bouton, ajoutez le contenu
      if (this.VarU_ButtonContent) {
          const text = this.renderer.createText(this.VarU_ButtonContent)
          this.renderer.appendChild(elem, text)
      }
      
      // Ajoute les attributs à l'élément
      Object.keys(this.VarU_AttributeValues).forEach(attr => {
          this.renderer.setAttribute(elem, attr, this.VarU_AttributeValues[attr])
      })
      // Ajoute l'élément au conteneur
      this.renderer.appendChild(this.container.nativeElement, elem)
  }
}

updateAttribute(attribut: SelectedAttribute, event: Event): void {
  const input = event.target as HTMLInputElement; // TypeScript comprend maintenant que target est un input
  attribut.userInput = input.value; // Aucune erreur ici car value est une propriété d'HTMLInputElement
}



updateSelectedBaliseAndAttributes(balise: string, attributes: {[key: string]: string}): void {
  this.VarU_SelectedBalise = balise;
  this.VarU_AttributeValues = attributes;
}

Tab_Attributs: Attributs = {
  "div": ["class", "id", "style"],
  "button": [
    "type",         // Spécifie le type de bouton ('button', 'submit', 'reset')
    "onclick",      // JavaScript à exécuter lors du clic sur le bouton
    "disabled",     // Désactive le bouton s'il est présent
    "name",         // Nom du bouton, utile lors de l'envoi d'un formulaire
    "value",        // Valeur associée au bouton, transmise avec le formulaire
    "class",        // Classe CSS pour le style du bouton
    "id",           // Identifiant unique pour le bouton
    "style",        // Styles CSS en ligne
    "title",        // Informations supplémentaires affichées comme une infobulle
    "autofocus",    // Spécifie que le bouton doit être automatiquement focalisé lorsque la page est chargée
    "form",         // Identifiant du formulaire auquel le bouton est associé
    "formaction",   // URL pour l'envoi du formulaire (pour le type 'submit')
    "formenctype",  // Type d'encodage des données du formulaire (pour le type 'submit')
    "formmethod",   // Méthode HTTP pour l'envoi du formulaire (pour le type 'submit')
    "formnovalidate", // Indique que le formulaire ne doit pas être validé lors de sa soumission
    "formtarget",   // Cible pour l'affichage de la réponse après l'envoi du formulaire (pour le type 'submit')
    "accesskey",    // Raccourci clavier pour accéder au bouton
    "tabindex",     // Ordre de tabulation du bouton
  ],
  "td": ["colspan", "rowspan"],
  "tr": [],
  "table": [
    "border",        // Définit l'épaisseur de la bordure de la table
    "cellpadding",   // Définit l'espace entre le contenu des cellules et leurs bordures
    "cellspacing",   // Définit l'espace entre les cellules
    "width",         // Définit la largeur de la table
    "height",        // Définit la hauteur de la table
    "align",         // Définit l'alignement de la table dans l'élément conteneur (obsolète en HTML5)
    "background-color",       // Définit la couleur de fond de la table (obsolète en HTML5)
    "summary",       // Fournit un résumé de la table, principalement pour l'accessibilité
    "style",         // Permet d'appliquer des styles CSS en ligne
    "class",         // Permet d'associer la table à une ou plusieurs classes CSS
    "id",            // Attribut identifiant de manière unique la table dans le document
    "frame",         // Spécifie la présence et l'apparence des bordures extérieures de la table (obsolète en HTML5)
    "rules",         // Définit quels côtés des cellules de la table auront des bordures (obsolète en HTML5)
    "dir",           // Spécifie la direction du texte (obsolète en HTML5)
    "lang",          // Spécifie la langue du contenu de la table
    "title"          // Fournit un titre supplémentaire ou des informations explicatives pour la table
    // ... autres attributs spécifiques ou obsolètes
  ],
  "th": ["scope"],
  "ul": ["type"],
  "ol": ["type", "start", "reversed"],
  "li": ["value"],
  "a": ["href", "target", "rel"],
  "span": ["class", "id"],
  "p": ["align"],
  "h1": ["class", "id"],
  "h2": ["class", "id"],
  "h3": ["class", "id"],
  "h4": ["class", "id"],
  "h5": ["class", "id"],
  "h6": ["class", "id"],
  "img": ["src", "alt", "width", "height"],
  "form": ["action", "method", "enctype"],
  "input": ["type", "name", "value"],
  "label": ["for"],
  "textarea": ["rows", "cols", "name"],
  "select": ["name", "multiple"],
  "option": ["value", "selected"],
  "br": [],
  "hr": [],
  "header": [],
  "footer": [],
  "nav": [],
  "section": [],
  "article": [],
  "aside": [],
  "figure": [],
  "figcaption": [],
  "main": [],
  "iframe": ["src", "width", "height", "frameborder"],
  "blockquote": ["cite"],
  "q": ["cite"],
  "pre": [],
  "code": [],
  "em": [],
  "strong": [],
  "small": [],
  "mark": [],
  "del": ["cite", "datetime"],
  "ins": ["cite", "datetime"],
  "sub": [],
  "sup": [],
  "b": [],
  "i": [],
  "details": [],
  "summary": [],
  "meter": ["value", "min", "max", "low", "high", "optimum"],
  "progress": ["value", "max"]
  // ... autres balises
}


}

/*
  setTimeout(() => {  }, 1000)
*/
interface Attributs {
  [key: string]: string[];
}
interface SelectedAttribute {
  key: string;
  value: string;
  valueVisible: boolean;
  userInput: string;
  showDetailButton: boolean;
  showTextArea: boolean; // Nouvelle propriété pour afficher le textarea
  textAreaInput: string; // Texte saisi dans le textarea
  detailButtonText: string; // Nouvelle propriété pour le texte du bouton
}

/*
VarHTML_Object: any = null
TS_CreateHtmlObject(): void {
        if (this.VarU_SelectedBalise) {
            this.VarHTML_Object = {
                tag: this.VarU_SelectedBalise,
                attributes: {...this.VarU_AttributeValues}
            };

            console.log(this.VarHTML_Object); // Affiche l'objet dans la console
        } else {
            console.error("Aucune balise sélectionnée");
            this.VarHTML_Object = null;
        }
    }
     objectKeys(obj: any): string[] {
        return Object.keys(obj);
    }

Tab_Balises: Utilisée pour fournir à l'utilisateur une liste de balises HTML avec leurs descriptions et attributs associés.
Tab_Role: Utilisée pour donner des informations supplémentaires sur les attributs (comme leur rôle, description et catégorisation).

L'utilisateur choisit la balise , puis sélectionne des attributs comme class ou style avec des valeurs spécifiques, votre application créera un élément <div> avec ces attributs et valeurs, et l'ajoutera à la page.

J'aimerai que l'application permette à l'utilisateur de créer des éléments HTML en utilisant les données fournies dans Tab_Balises et Tab_Role.



    Dans Tab_Balises, j'ai les balises, la description des balises et les attributs
Dans Tab_Role, j'ai les fonctionnalités, les attributs,  la description des attributs)
le code HTML permet a l'utilisateur de mettre les attributs dans les balises correspondantes
J'aimerai que une fois je créer un element HTML, il prend ces données


Votre code Angular décrit une application interactive pour la création d'éléments HTML. Voici un résumé de ses fonctionnalités et de son fonctionnement :

Tables de Données (Tab_Balises et Tab_Role):

Tab_Balises: Contient des informations sur différentes balises HTML, y compris leur description et les attributs associés.
Tab_Role: Décrit différentes catégories d'attributs HTML (comme "InformationsGenerales", "StylesApparence", "PositionnementStructure") et fournit une description pour chaque attribut.
Création Dynamique d'Éléments HTML (TS_CreateHtmlElement):

Permet à l'utilisateur de créer un élément HTML en fonction de la balise sélectionnée (VarU_SelectedBalise).
Ajoute du contenu au bouton, si la balise sélectionnée est un bouton.
Applique les attributs sélectionnés à l'élément créé.
Recherche et Sélection de Balises (TS_UpdateSearchBalise, TS_SelectSuggestion):

L'utilisateur peut rechercher des balises HTML (VarU_SearchBalise).
Affiche des suggestions de balises en fonction de la recherche.
Permet la sélection d'une balise parmi les suggestions.
Recherche et Sélection d'Attributs (TS_UpdateSearchAttribute, TS_SelectAttributeSuggestion):

L'utilisateur peut rechercher des attributs HTML.
Affiche des suggestions d'attributs en fonction de la recherche.
Permet la sélection d'un attribut parmi les suggestions.
Gestion des Fonctionnalités et Attributs (TS_ShowFunctionalityAttributes, TS_FunctionalitySelected):

Affiche les fonctionnalités disponibles pour une balise sélectionnée.
Permet à l'utilisateur de sélectionner une fonctionnalité et d'afficher les attributs correspondants.
Interaction avec les Attributs (showAttributeDescription, hideAttributeDescription, updateAttribute, showDetail):

Affiche la description d'un attribut au survol.
Permet de mettre à jour la valeur d'un attribut en fonction de l'entrée de l'utilisateur.
Affiche une zone de texte pour des détails supplémentaires si nécessaire.
Interface Utilisateur HTML:

Fournit des champs de recherche pour les balises et les attributs, des boutons pour les fonctionnalités, et un affichage dynamique pour les attributs sélectionnés.
Inclut un bouton pour créer l'élément HTML final.
Votre application semble bien conçue pour offrir une interface intuitive permettant de créer des éléments HTML personnalisés en sélectionnant des balises, des attributs et en définissant leurs valeurs. Cette approche modulaire et dynamique rend l'outil flexible et adapté à divers besoins de création de contenu HTML.


*/





/*
Tab_Bouton: Bouton[] = [];

ajouterBouton(parent?: Bouton) {
  const nouveauBouton: Bouton = {
    id: this.genererIdUnique(),
    nom: this.genererNomBouton(parent), // Générer un nom numéroté
    enEdition: false,
    rectangleVisible: false,
    listeVisible: false,
    sousBoutons: []
  };

  if (parent) {
    nouveauBouton.parent = parent; // Ajoutez cette ligne
    parent.sousBoutons.push(nouveauBouton);
  } else {
    this.Tab_Bouton.push(nouveauBouton);
  }
}


afficherRectangle(bouton: Bouton) {
  bouton.rectangleVisible = !bouton.rectangleVisible;
}

gererListe(bouton: Bouton, event: MouseEvent) {
  event.preventDefault();
  bouton.listeVisible = !bouton.listeVisible;
}

debutEdition(bouton: Bouton) {
  bouton.nomTemporaire = bouton.nom; // Sauvegardez le nom actuel
  bouton.enEdition = true;
}

finEdition(bouton: Bouton, sauvegarder: boolean = true) {
  if (!sauvegarder) {
    bouton.nom = bouton.nomTemporaire; // Restaurez le nom si l'édition est annulée
  }
  bouton.enEdition = false;
}

gererActionBouton(bouton: Bouton, event: any, parent: Bouton, index: number) {
  const action = event.target.value;
  switch (action) {
    case 'sousBouton':
      this.ajouterBouton(bouton);
      break;
    case 'editer':
      this.debutEdition(bouton);
      break;
    case 'supprimer':
      if (parent) {
        parent.sousBoutons.splice(index, 1);
      } else {
        this.Tab_Bouton.splice(index, 1);
      }
      break;
  }
  bouton.listeVisible = false;
}

dragStart(bouton: Bouton) {
}

drop(event: CdkDragDrop<Bouton[], any>, parent: Bouton) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  
    const item = event.container.data[event.currentIndex];
    item.parent = parent;

    this.miseAJourNomsSousBoutons(item, parent);
  }
}

miseAJourNomsSousBoutons(bouton: Bouton, parent?: Bouton) {
  if (parent) {
    bouton.nom = `${parent.nom}.${parent.sousBoutons.indexOf(bouton) + 1}`;
  }

  bouton.sousBoutons.forEach((sousBouton) => {
    this.miseAJourNomsSousBoutons(sousBouton, bouton);
  });
}

genererNomBouton(parent?: Bouton): string {
  let nomBase = 'Bouton';
  if (parent) {
    const index = parent.sousBoutons.length + 1;
    nomBase = `${parent.nom}.${index}`;
  } else {
    const index = this.Tab_Bouton.length + 1;
    nomBase = `${nomBase} ${index}`;
  }
  return nomBase;
}

ajouterSousBouton(bouton: Bouton) {
  this.ajouterBouton(bouton);
  bouton.listeVisible = false; 
  console.log('this.Tab_Bouton',this.Tab_Bouton)
}

supprimerBouton(bouton: Bouton, parent: Bouton, index: number) {
  if (parent) {
    parent.sousBoutons.splice(index, 1);
  } else {
    this.Tab_Bouton.splice(index, 1);
  }
}

private idCompteur = 0;

private genererIdUnique(): string {
  return `bouton-${this.idCompteur++}`;
}

*/

/*
interface Bouton {
  id: string;
  nom?: string;
  nomTemporaire?: string; // Pour stocker temporairement le nom lors de l'édition
  enEdition: boolean;
  rectangleVisible: boolean;
  listeVisible: boolean;
  sousBoutons: Bouton[];
  parent?: Bouton;
}


*/
