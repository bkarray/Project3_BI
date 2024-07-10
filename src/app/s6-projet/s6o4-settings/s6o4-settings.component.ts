/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem,  } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-s6o4-settings',
  templateUrl: './s6o4-settings.component.html',
  styleUrls: ['./s6o4-settings.component.css']
})
export class S6o4SettingsComponent implements OnInit {

  public Tab_Fonctionnalites: string[] = []
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {
    this.Tab_Fonctionnalites = Object.keys(this.Tab_Role[0])
  }

  @Input() Tab_ListItems: DraggableItem[] = [];
  ngOnInit(): void {
  }

  public VarU_SelectedFunctionality: string = ''
  public VarTab_SelectedAttributes: SelectedAttribute[] = []
  TS_ShowFunctionalityAttributes(fonctionnalite: string): void {
    this.VarU_SelectedFunctionality = fonctionnalite;
    this.VarTab_SelectedAttributes = [];
    const functionalityAttributes = this.Tab_Role[0][fonctionnalite];
    const details = this.Tab_Role[1].Details; 
    if (functionalityAttributes) {
      for (const SA_Attr_Nom in functionalityAttributes) {
        if (functionalityAttributes.hasOwnProperty(SA_Attr_Nom)) {
            const SA_Attr_Desc = functionalityAttributes[SA_Attr_Nom];
            const detailValue = details[SA_Attr_Nom]
            let SA_DetailButtonText = '';
            if (detailValue === '1') {
              SA_DetailButtonText = 'Details1';
            } else if (detailValue === '2') {
              SA_DetailButtonText = 'Details2';
            }
            const attributeObject: SelectedAttribute = {
              SA_Attr_Nom, 
              SA_Attr_Desc, 
              SA_ValueVisible: false, 
              SA_UserInput: '', 
              SA_TextAreaInput: '',
              SA_DetailButtonText, 
              SA_Checkbox_Input: false, 
              SA_Checkbox_Detail_Input: false, 
              SA_TextAreaVisible: false,
            }
            this.VarTab_SelectedAttributes.push(attributeObject);
        }
      }
    }
  }

  TS_FunctionalitySelected(fonctionnalite: string): boolean {
    return this.VarU_SelectedFunctionality === fonctionnalite;
  }

  TS_ShowAttributeDescription(description: string): void {
    this.VarTab_SelectedAttributes.forEach(attr => {
        attr.SA_ValueVisible = attr.SA_Attr_Desc === description
    })
  }
  TS_HideAttributeDescription(): void {
    this.VarTab_SelectedAttributes.forEach(attr => {
        attr.SA_ValueVisible = false
    })
  }

  TS_UpdateAttribute(attribut: SelectedAttribute, event: Event): void {
    const input = event.target as HTMLInputElement; // TypeScript comprend maintenant que target est un input
    attribut.SA_UserInput = input.value; // Aucune erreur ici car value est une propriété d'HTMLInputElement
  }


  TS_ShowDetail(attribut: SelectedAttribute): void {
    attribut.SA_TextAreaVisible = !attribut.SA_TextAreaVisible;
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
  

  
}


interface SelectedAttribute {
  SA_Attr_Nom: string
  SA_Attr_Desc: string
  SA_ValueVisible: boolean
  SA_UserInput: string
  SA_TextAreaInput: string
  SA_DetailButtonText: string
  SA_Checkbox_Input: boolean
  SA_Checkbox_Detail_Input: boolean
  SA_TextAreaVisible: boolean
}


interface DraggableItem {
  id: number;
  name: string;
  position: { x: number, y: number };
  width: number;
  height: number;
  isOriginal: boolean;
}
