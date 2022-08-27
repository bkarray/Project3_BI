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
  newFieldStatus:any='no description'
  currentsrvOrd:any=1
  currentsrvName:any=''
  fields:any=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
  servsEtap:any=[]
  isGenerated:boolean=false
  lastTableIndex:number=0;
  shownServNum:any=1

  ngOnInit(): void { 
this.getNewFormulaire()
  }

  deleteField(index:any){
    this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
      if(indexF!=-1) tab.fields.splice(indexF,1)
    })
    this.fields.splice(index,1)
  }

  editSatus(index:any){
    this.fields[index].editSataus=!this.fields[index].editSataus
    console.log(this.fields[index])
  }
  editDesc(index:any){
this.fields[index].editDesc=!this.fields[index].editDesc
  }
  openTypeForm(index:any){
    this.fields[index].editType=!this.fields[index].editType
    this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
      if(indexF!=-1) tab.fields[indexF].Type=this.fields[index].Type
    })
  }

  openNameForm(index:any){
   this.fields[index].oldName=this.fields[index].Name

this.fields[index].editName=!this.fields[index].editName
  }
  closeNameForm(index:any){
    this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].oldName)
      console.log(tab.fields[indexF])
      if(indexF!=-1) tab.fields[indexF].Name=this.fields[index].Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase()
    })
    this.fields[index].Name=this.fields[index].Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase()
    this.fields[index].oldName=''
    this.fields[index].editName=!this.fields[index].editName
  }

  openfieldForm(){
    this.fieldFormIsOpen=!this.fieldFormIsOpen
  }
  addnewfield(){
    let ord=0
    if(this.formulaire.tables[0].fields.length!=0) ord=this.formulaire.tables[0].fields.length-1
    if (this.newFieldType=='list') this.newFieldType='character varying(255)'
    let newField={
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      choises:this.newfieldChoises,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      Field_order:ord

    }

    
  if((this.fields.findIndex((e:any)=> e.Name==newField.Name)==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 
    console.log() 
 
    this.formulaire.tables[0].fields.push(newField)
    if(this.formulaire.tables.length!=1){
      for(let i=1;i<this.formulaire.tables.length;i++){
        this.formulaire.tables[i].spaces.push(0)
      }
    }
    let newField2= {
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      choises:this.newfieldChoises,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      editDesc:false,
      editSataus:false,
      editName:false,
      editType:false,
      oldName:'',
      Field_order:ord

    }
    this.fields.push(newField2)
    this.openfieldForm()
    this.newFieldName=''
    this.newFieldType=''
    this.newfieldChoises=null
    this.newFieldStatus='no description'
    console.log(this.formulaire)

  }

  }
  generatFields(){
    let i=0
    this.formulaire.tables.forEach((tab:any)=>{


         if(tab.fields.length==0){
          if(i==this.formulaire.tables.length-1){
            this.FormulaireService.deleteTable(tab.Table_Id).subscribe((res:any)=>{
              this.formulaire.tables.splice(-1)
              this.lastTableIndex--
            })
          }
          else{
            for(let j=i;j<this.formulaire.tables.length-1;j++){
              this.formulaire.tables[j]=this.formulaire.tables[j+1]
            }
            this.FormulaireService.deleteTable(this.formulaire.tables[this.formulaire.tables.length-1]).subscribe((res:any)=>{
              this.formulaire.tables.splice(-1)
              this.lastTableIndex--
            })
          }
         }

         tab.fields.forEach((field:any)=>{ 
          let newField={
            Table_Id:field.Table_Id,
            Name:field.Name,
            Type:field.Type,
            choises:field.choises,
            Status:field.Status,
            Serv_Id:null,
            Serv_description:field.Serv_description,
            Field_order:field.Field_order
      
          }    
          this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{ })})
         i++
    })
    this.shownServNum=this.currentsrvOrd

   this.isGenerated=true
  }
  drop(event: CdkDragDrop<any>) {

  
   if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else if((event.previousContainer !== event.container)&&(!this.isGenerated)) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      
      this.formulaire.tables[Number(event.container.id)].spaces.splice(-1)
      if(Number(event.previousContainer.id)!=0)this.formulaire.tables[Number(event.previousContainer.id)].spaces.push(0)
      for(let i=0;i<this.formulaire.tables.length;i++){
          
      
        for(let j=0;j<this.formulaire.tables[i].fields.length;j++){
          this.formulaire.tables[i].fields[j].Field_order=j
          this.formulaire.tables[i].fields[j].Table_Id=this.formulaire.tables[i].Table_Id
          let indexF=this.fields.findIndex((e:any)=> e.Name==this.formulaire.tables[i].fields[j].Name)
          this.fields[indexF].Table_Id=this.formulaire.tables[i].Table_Id
          this.fields[indexF].Field_order=j
          if(Number(this.shownServNum)!=Number(this.currentsrvOrd)){
            let place={
              Field_order:j
            }
            this.FormulaireService.updateFieldPlace(this.fields[indexF].Field_Id,place).subscribe((res:any)=>{
             
              this.fields[indexF].Table_Id=this.formulaire.tables[i].Table_Id
              this.fields[indexF].Field_order=j
            })
          }
        }

 

    }
    console.log(this.formulaire.tables,this.fields)
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
    let test=false
    this.fields.forEach((field:any)=>{
      if(field.Status!='consulté') test=true
    })
   if(test) this.nextServ()
    this.router.navigate(['/formulaire/list/'])
  }
  fieldsToShow(){
    console.log(Number(this.shownServNum),Number(this.currentsrvOrd))
    if(Number(this.shownServNum)!=Number(this.currentsrvOrd)){
      let index=this.servsEtap.findIndex((e:any)=> e.Serv_order==Number(this.shownServNum))
      let indexP=this.servsEtap.findIndex((e:any)=> e.Serv_order==this.fields[1].Serv_Id)
      if(indexP!=-1) this.servsEtap[indexP].fields=this.fields
      this.fields=this.servsEtap[index].fields
      console.log(this.fields)
      this.currentsrvName=this.servsEtap[index].Serv_Name
      this.formulaire.tables.forEach((table:any)=>{
      table.fields=this.fields.filter((e:any)=>e.Table_Id==table.Table_Id)
        table.fields.sort((a:any, b:any) => {
          return a.Field_order - b.Field_order;
      });
      })
    }
else{
  this.fields.forEach((field:any)=>{
    if(field.Name!='ID'){
      field.Status='consulté'
      field.Serv_Id=null
    }
  })
}
  }

  correctionField(index:any){
    if(this.fields[index].Serv_Id!=null){
      let indexT=this.formulaire.tables.findIndex((e:any)=> e.Table_Id==this.fields[index].Table_Id)
      let indexF=this.formulaire.tables[indexT].fields.findIndex((e:any)=>e.Name==this.fields[index].Name)
      let updatedField={
        Field_Id:this.fields[index].Field_Id,
        Table_Id:this.fields[index].Table_Id,
        Name:this.fields[index].Name,
        Type:this.fields[index].Type,
        choises:this.fields[index].choises,
        Status:this.fields[index].Status,
        Serv_Id:this.fields[index].Serv_Id,
        Serv_description:this.fields[index].Serv_description,
        Field_order:this.formulaire.tables[indexT].fields[indexF].Field_order
  
      }
   this.FormulaireService.updateField(updatedField).subscribe((res:any)=>{})
    }
    this.editSatus(index)
  }
  nextServ(){
      let newServ={
        Formulaire_Id:this.formulaire.Formulaire_Id,
        Serv_Name:this.currentsrvName,
        Serv_User:null,
        Serv_order:this.currentsrvOrd,
        serv_reponse:null,
        Serv_Refer:null
      }
      if(this.currentsrvOrd==this.shownServNum){
        this.FormulaireService.creatNewService(newServ).subscribe((serv:any)=>{
    serv['fields']=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
        serv.fields.forEach((field:any)=>{
          field.Serv_Id=serv.Serv_Id
        })
        this.currentsrvOrd++;
        this.shownServNum++;
        this.servsEtap.push(serv)
        this.fields.forEach((field:any)=>{

          if(field.Name!='ID'){    
     
            let newField={
            Table_Id:field.Table_Id,
            Name:field.Name,
            Type:field.Type,
            choises:field.choises,
            Status:field.Status,
            Serv_Id:serv.Serv_Id,
            Serv_description:field.Serv_description,
            Field_order:field.Field_order
      
          }
          this.FormulaireService.creatFieldToServ(newField).subscribe((res:any)=>{
            console.log
            res['editDesc']=false
            res['editSataus']=false
            res['editName']=false
            res['editType']=false
            res['oldName']=''
            serv.fields.push(res);
            field.Status='consulté'
          })}
        })
      })}
  }
  getNewFormulaire(){
    this.route.params.subscribe((param:any)=>{
      this.FormulaireService.getFormulaireById(param.id).subscribe((form:any)=>{
        this.FormulaireService.getTables(param.id).subscribe((tables:any)=>{

          this.FormulaireService.getServicesByformulaire(param.id).subscribe((servs:any)=>{
            if(param.generated==1){
              this.isGenerated=true
            }
            let numSpac=0
            let level=0
            for(let i=0;i<tables.length;i++){
              let index=tables.findIndex((e:any)=> e.Table_level==level)
              
              tables[index]['fields']=[]
              this.FormulaireService.getAllFields(tables[index].Table_Id).subscribe((fields:any)=>{
               
                  
              tables[index]['fields']=fields
              fields.forEach((field:any)=>{
                field.Status='consulté'
                this.fields.push(field)
              })
                
              tables[index]['spaces']=[]
                console.log(numSpac,tables[index])
                for(let i=0;i<numSpac;i++){tables[index]['spaces'].push(0)}
                numSpac=fields.length
              })  
              level++
            }
            this.FormulaireService.workingServices(param.id).subscribe((servs:any)=>{
              servs.forEach((serv:any)=>{
                serv['fields']=[]
                this.FormulaireService.getFields(serv.Serv_Id).subscribe((fields:any)=>{
                  fields.forEach((field:any)=>{
                    field['editDesc']=false
                    field['editSataus']=false
                    field['editName']=false
                    field['editType']=false
                    field['oldName']=''
                    serv.fields.push(field)
                  })
                })
              })
              this.servsEtap=servs
              this.currentsrvOrd=servs.length+1
              this.shownServNum=this.currentsrvOrd
            })

              
              form['tables']=tables
              form['services']=servs

              this.formulaire=form

              this.currentsrvName=servs[0].Serv_Name
              this.numservs=this.formulaire.services.length
              console.log(this.formulaire,this.fields)
              


          })

        })
        
      })
    })
  }

}