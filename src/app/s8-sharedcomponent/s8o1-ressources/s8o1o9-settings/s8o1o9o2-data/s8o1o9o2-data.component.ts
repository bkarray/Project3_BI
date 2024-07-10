
import { Component, OnInit, SimpleChanges } from '@angular/core';

/* Importation : Composant Angular */
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

/* Importation : s8o8o1-ressources */
import { S8o8o1RessourcesService } from '../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';


/* Importation : Table T_Button */
import { T_Button } from '../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

/* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
import { Renderer2, ElementRef } from '@angular/core';  


@Component({
  selector: 'app-s8o1o9o2-data',
  templateUrl: './s8o1o9o2-data.component.html',
  styleUrls: ['./s8o1o9o2-data.component.css']
})
export class S8o1o9o2DataComponent implements OnInit {

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

  @Input() InputVarN_Selected: string | number = ''


  public Var_Selected: string | number = ''

TS_ShowInputDataOptions() {
  this.Var_Selected = 1
}

TS_ShowTreatmentDataOptions() {
  this.Var_Selected = 2
}

TS_ShowOutputDataOptions() {
  this.Var_Selected = 3
}





public VarB_TreatmentSelected: boolean = false

/* Button 'Treatment' */
TS_ShowTreatmentOptions() {
  this.VarB_TreatmentSelected = !this.VarB_TreatmentSelected;

}


}
