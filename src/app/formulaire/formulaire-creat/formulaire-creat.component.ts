import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
//drag and drop
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-formulaire-creat',
  templateUrl: './formulaire-creat.component.html',
  styleUrls: ['./formulaire-creat.component.css']
})
export class FormulaireCreatComponent implements OnInit {

  
  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private FormulaireService:FormulaireService,
    private route: ActivatedRoute) { }
  numservs: any;
  formulaire:any={}
  fieldFormIsOpen:boolean=false
  newFieldName:any=''
  newFieldType:any=''
  newfieldChoises:any=null
  newFieldStatus:any=''
  currentsrvOrd:any='0'
  currentsrvName:any=''
  fields:any=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
  lastTableIndex:number=0;

  ngOnInit(): void { 
this.getNewFormulaire()
  }
  correctOrder(){

    let index=this.formulaire.services.findIndex((e:any)=>{

      return e.Serv_Name==this.currentsrvName})
    let index1=this.formulaire.services.findIndex((e:any)=>{

        return e.Serv_order==this.currentsrvOrd})
    console.log(this.formulaire.services[index1])
    this.formulaire.services[index1].Serv_order=this.formulaire.services[index].Serv_order
    this.formulaire.services[index].Serv_order=Number(this.currentsrvOrd)
    this.FormulaireService.updateService(this.formulaire.services[index]).subscribe((res:any)=>{})
    this.FormulaireService.updateService(this.formulaire.services[index1]).subscribe((res:any)=>{})
  }

  openfieldForm(){
    this.fieldFormIsOpen=!this.fieldFormIsOpen
  }
  addnewfield(){
    if (this.newFieldType=='list') this.newFieldType='character varying(255)'
    let index=this.formulaire.services.findIndex((e:any)=>{

      return e.Serv_Name==this.currentsrvName})
    let newField={
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      choises:this.newfieldChoises,
      Status:this.newFieldStatus,
      Serv_Id:this.formulaire.services[index].Serv_Id
    }
  if(((this.newFieldName!='')&&(this.newFieldType!='')&&(this.newFieldStatus!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 
    console.log() 
    this.fields.push(newField)
    this.formulaire.tables[0].fields.push(newField)
    this.openfieldForm()
    this.newFieldName=''
    this.newFieldType=''
    this.newfieldChoises=null
    this.newFieldStatus=''
    console.log(this.formulaire)

  }

  }
  nextServ(){
  if(this.formulaire.services.length!=1){  let index=this.formulaire.services.findIndex((e:any)=>{

      return e.Serv_Name==this.currentsrvName})
      this.formulaire.services.splice(index,1);
      this.numservs=this.formulaire.services.length
      this.currentsrvName=this.formulaire.services[0].Serv_Name
      this.currentsrvOrd=this.formulaire.services[0].Serv_order
      console.log(this.formulaire)
    this.formulaire.tables.forEach((tab:any)=>{
      tab.fields.forEach((field:any)=>{     
         this.FormulaireService.addNewfields(field).subscribe((res:any)=>{
          console.log(res)
          this.fields=[{
            Name:'ID',
            Type:'auto_number',
            Status:'consulté'
          }];
          tab.fields=[];
         })})
    })
 }
  }
  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      console.log(event)
      this.formulaire.tables.forEach((tab:any)=>{
        tab.fields.forEach((field:any)=>{
          field.Table_Id=tab.Table_Id
        })
      })
    }

    addNewTable(){
      this.lastTableIndex++;
      let newTable={
        Formulaire_Id:this.formulaire.Formulaire_Id,
        Table_Name:this.formulaire.Formulaire_Name.replace(/\s/g, '').toLowerCase()+this.lastTableIndex,
        Table_level:this.lastTableIndex

      }
      this.FormulaireService.creatNewTable(newTable).subscribe((table:any)=>{
        table['fields']=[]
        table['spaces']=[0]

        this.lastTableIndex--
        for(let i=0;i<=this.lastTableIndex;i++){
          this.formulaire.tables[i].fields.forEach((x:any)=>{
            table['spaces'].push(0) 
          })
        }

        console.log(this.formulaire.tables,this.lastTableIndex)
        let val={
          Table_Name_inf:table.Table_Name,
          Table_Name_sup:this.formulaire.tables[this.lastTableIndex].Table_Name
        }
        this.FormulaireService.addForeignKey(val).subscribe((res:any)=>{
          this.formulaire.tables.push(table)
          this.lastTableIndex++
        })
      })
    }
  End(){
    let index=this.formulaire.services.findIndex((e:any)=>{
             
      return e.Serv_Name==this.currentsrvName})
      this.formulaire.services.splice(index,1);
      this.numservs=this.formulaire.services.length
      console.log(this.formulaire)
    this.formulaire.tables.forEach((tab:any)=>{
      tab.fields.forEach((field:any)=>{     
         this.FormulaireService.addNewfields(field).subscribe((res:any)=>{ })})
      if(tab.fields.length==0){
        this.FormulaireService.deleteTable(tab.Table_Id).subscribe((res:any)=>{})
      }
    })
    this.router.navigate(['/formulaire/list/'])
  }
  getNewFormulaire(){
    this.route.params.subscribe((param:any)=>{
      this.FormulaireService.getFormulaireById(param.id).subscribe((form:any)=>{
        let newTable={
          Formulaire_Id:param.id,
          Table_Name:form.Formulaire_Name.replace(/\s/g, '')+'0',
          Table_level:0

        }
        this.FormulaireService.creatNewTable(newTable).subscribe((table:any)=>{
          this.FormulaireService.getServicesByformulaire(param.id).subscribe((servs:any)=>{
            table['fields']=[]
            table['spaces']=[]
            form['tables']=[table]
            form['services']=servs
            this.formulaire=form
            this.currentsrvName=this.formulaire.services[0].Serv_Name
            this.currentsrvOrd=this.formulaire.services[0].Serv_order
            this.numservs=this.formulaire.services.length
            console.log(this.formulaire)

          })

        })
        
      })
    })
  }

}
