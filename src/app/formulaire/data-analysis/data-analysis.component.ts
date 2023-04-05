import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private FormulaireService:FormulaireService
  ) { }
forms:any=[]
responses:any=[]
codes:any=[]
showCodeIsOpen:boolean=false
codeGraph:any={}
canAdd:boolean=false
responseSelected:any=0
addCodeFormIsOpen:boolean=false
ngOnInit(): void {
  this.getData()
}

openCode(){
  this.codeGraph={}
  
  this.FormulaireService.getCodes(this.responseSelected).subscribe((codes:any)=>{
    this.showCodeIsOpen=!this.showCodeIsOpen
    this.codes=codes
  })
}

openAddCode(){
  this.FormulaireService.getCodes(this.responseSelected).subscribe((codes:any)=>{
    this.addCodeFormIsOpen=!this.addCodeFormIsOpen
    this.codes=codes
  })
}

addCode(){
  this.addCodeFormIsOpen=!this.addCodeFormIsOpen
}


  selectForm(index:any){
    this.responses=[]
    this.codes=[]
    this.canAdd=false
    this.forms.forEach((form:any)=>{
      form.selected=false
    })
    this.forms[index].selected=!this.forms[index].selected
    let idUser=0;
    if(!this.authService.isAdmin()){
      idUser=this.authService.authenticatedUser.U_Id
    }
    this.FormulaireService.getReponsesByFormulaire(this.forms[index].Formulaire_Id,idUser).subscribe((reponces:any)=>{
      reponces.forEach((reponce:any)=>{
        reponce['selected']=false
        this.responses.push(reponce)
      })
    })
  }

  selectCodes(index:any){
    this.codes=[]
    this.canAdd=true
    
    
    this.responseSelected=this.responses[index].Reponse_Id
    console.log(this.responses[index],this.responseSelected);
    this.responses.forEach((reponce:any)=>{
      reponce.selected=false
    })
    this.responses[index].selected=!this.responses[index].selected
    this.FormulaireService.getCodes(this.responses[index].Reponse_Id).subscribe((codes:any)=>{
      this.codes=codes
    })
  }
  getcode(index:any){
this.codeGraph=this.codes[index]
this.showCodeIsOpen=!this.showCodeIsOpen
  }


  getData(){
    this.authService.loadUser();
this.FormulaireService.getAllFormulaire().subscribe((forms:any)=>{
  forms.forEach((form:any)=>{
    form['selected']=false
    this.forms.push(form)
  })
})
  }

}
