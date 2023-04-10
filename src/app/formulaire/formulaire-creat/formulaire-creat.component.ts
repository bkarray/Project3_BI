import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authservice';
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

  
  constructor(
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private FormulaireService:FormulaireService,
    private route: ActivatedRoute) { }
  numservs: any;
  formulaire:any={}
  fieldFormIsOpen:boolean=false
  newFieldName:any=''
  newFieldType:any='character varying(255)'
  newfieldChoises:any=null
  newFieldStatus:any='no description'
  currentsrvOrd:any=1
  currentsrvName:any=''
  newFieldLevel:any=''
  ImportListIsopen:boolean=false
  allTables:any=[]
  orderFields:any=[]
  fields:any=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
  fieldsInArchive:any=[]
  servsEtap:any=[]
  isGenerated:boolean=false
  lastTableIndex:number=0;
  shownServNum:any=1
  Types:any=[{Name:'String',value:'character varying(255)'},{Name:'date',value:'date'},{Name:'list',value:'list'},{Name:"integer",value:"integer"},{Name:"boolean",value:"boolean"},{Name:"float",value:"real"}]
  alterModifie:Boolean=false
  archiveListIsOpen:boolean=false
  todeleteField:boolean=false
  deleteFieldName:any=''
  toDeleteFieldIndex:any=null
  fieldExistInArchiveTab:boolean=false;
  indexToExtract:any=-1
  ChoicesPopUp:boolean=false;
  FieldIdChoices:any=0
  ngOnInit(): void { 
   
this.getNewFormulaire()
  }



  openChoicesPopUp(FieldId:any){
    this.ChoicesPopUp=true;

    this.FieldIdChoices=FieldId
  }

  closeChoicesPopUp(event:any){
    this.ChoicesPopUp=false
    this.FieldIdChoices=0
  }

  alert(){
    this.alterModifie=true
    setTimeout(() => {
      this.alterModifie=false
    }, 5000);
  }

  
  openDeleteField(index:any,name:any){
    this.toDeleteFieldIndex=Number(index)
    this.deleteFieldName=name
    this.todeleteField=!this.todeleteField
  }

  deleteField(index:any){
if(!this.isGenerated){    
  this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
      if(indexF!=-1) tab.fields.splice(indexF,1)
    })
    this.fields.splice(index,1)
  this.openDeleteField(null,'')
}
    else{
      this.fieldsInArchive.push(this.fields[index])
      let deletedField={
        Name:this.fields[index].Name,
        Table_Id:this.fields[index].Table_Id
      }
      this.FormulaireService.putFieldInArchive(deletedField).subscribe((res:any)=>{
        this.formulaire.tables.forEach((tab:any)=>{
          let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
          if(indexF!=-1) tab.fields.splice(indexF,1)
        })
        this.servsEtap.forEach((serv:any)=>{
          
          let indexF=serv.fields.findIndex((e:any)=> e.Name==deletedField.Name)
          console.log(serv,this.fields[index],indexF)
          serv.fields.splice(indexF,1)
        })
        console.log(this.fieldsInArchive);
        
        
        this.fields.splice(index,1)
        this.openDeleteField(null,'')
      })
    }
  }
getOutOfArchive(index:any){
  let fieldToSave={
    Name:this.fieldsInArchive[index].Name,
    Table_Id:this.fieldsInArchive[index].Table_Id
  }
  console.log(fieldToSave);
  
  this.FormulaireService.getFieldOutOfArchive(fieldToSave).subscribe((res:any)=>{

    window.location.reload();
  })

}

openCloseImportLisTab(){
  if(!this.ImportListIsopen){
    // this.FormulaireService.
  }
}


openArchiveList(){
  this.archiveListIsOpen=!this.archiveListIsOpen;
}
  editSatus(index:any){
    this.fields[index].editSataus=!this.fields[index].editSataus
    console.log(this.fields[index])
  }
  spaces(index:any){
let spaces:any=[]
  for (let i = 0;  i< index; i++) {
    this.formulaire.tables[i].fields.forEach((field:any)=>{
      spaces.push(0);
    })}
return spaces
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
    this.newFieldName=''
    this.newFieldLevel='0'
    if(this.formulaire.tables.length==0)
    this.newFieldLevel=''
    this.newFieldType='character varying(255)'
    this.newFieldStatus='no description'
    this.fieldFormIsOpen=!this.fieldFormIsOpen
  }

  AjoutFieldDansLeSystem(indexT:any){
    let ord=0
    if(this.formulaire.tables[indexT].fields.length!=0) ord=this.formulaire.tables[indexT].fields.length-1
    
    let newField={
      Table_Id:this.formulaire.tables[indexT].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').replaceAll(')','_').replaceAll('(','_').replaceAll('-','_').toLowerCase(),
      Type:this.newFieldType,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      Field_order:ord

    }
    if((this.fields.findIndex((e:any)=> e.Name==newField.Name)==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 
      console.log() 
   
      
      this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{
        this.formulaire.tables[indexT].fields.push(newField)
        let newField22= {
          Table_Id:res.Table_Id,
          Name:res.Name,
          Type:res.Type,
          Status:res.Status,
          Serv_Id:res.Serv_Id,
          Serv_description:res.Serv_description ,
          editDesc:false,
          editSataus:false,
          editName:false,
          editType:false,
          oldName:'',
          Field_order:ord
    
        }



        this.fields.push(newField22)
        const index=this.servsEtap.findIndex((e:any)=> e.Serv_order==Number(this.shownServNum))
        this.servsEtap.forEach((serv:any,i:any)=>{
          let newFieldServ={
            Table_Id:this.formulaire.tables[indexT].Table_Id,
            Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
            Type:this.newFieldType,
            Status:'consulté',
            Serv_Id:serv.Serv_Id,
            Serv_description:this.newFieldStatus ,
            Field_order:ord
      
          }
          this.FormulaireService.postField(newFieldServ).subscribe((res:any)=>{
            let newField2= {
              Table_Id:res.Table_Id,
              Name:res.Name,
              Type:res.Type,
              Status:res.Status,
              Serv_Id:res.Serv_Id,
              Serv_description:res.Serv_description ,
              editDesc:false,
              editSataus:false,
              editName:false,
              editType:false,
              oldName:'',
              Field_order:ord
        
            }
            if(index!=i)
            serv.fields.push(newField2)
          })
        })
        

        if(Number(this.shownServNum)==Number(this.currentsrvOrd)){let newField2= {
          Table_Id:this.formulaire.tables[indexT].Table_Id,
          Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
          Type:this.newFieldType,
          Status:'consulté',
          Serv_Id:null,
          Serv_description:this.newFieldStatus ,
          editDesc:false,
          editSataus:false,
          editName:false,
          editType:false,
          oldName:'',
          Field_order:ord,
          orderFront:this.fields.length-1
        }
        let newOrder={
          Name:newField2.Name,
          orderFront:this.fields.length-1
        }
        this.orderFields.push(newOrder)}
        
        this.openfieldForm()
        this.newFieldName=''
        this.newFieldType='character varying(255)'
        this.newfieldChoises=null
        this.newFieldStatus='no description'
        console.log(this.formulaire)
    

      })
              }
  }
confirmAdd(){
  let newName=this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase();
  let test=this.fieldsInArchive.findIndex((e:any)=>e.Name==newName)
  if(test==-1){
    this.addnewfield()
  }
  else{
    console.log(this.fieldsInArchive[test]);
    this.fieldExistInArchiveTabOpen(test)
  }
}
fieldExistInArchiveTabOpen(index:any){
this.fieldExistInArchiveTab=!this.fieldExistInArchiveTab
this.indexToExtract=index
}

  addnewfield(){
   if(!this.isGenerated) { 
    let ord=0
    if(this.formulaire.tables[0].fields.length!=0) ord=this.formulaire.tables[0].fields.length-1
    let newField={
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      Field_order:ord

    }

    
  if((this.fields.findIndex((e:any)=> e.Name==newField.Name)==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 
    console.log() 
 
    this.formulaire.tables[0].fields.push(newField)
    let newField2= {
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      editDesc:false,
      editSataus:false,
      editName:false,
      editType:false,
      oldName:'',
      Field_order:ord,
      orderFront:this.fields.length-1
    }
    this.fields.push(newField2)
                  let newOrder={
                    Name:newField2.Name,
                    orderFront:this.fields.length-1
                  }
    this.orderFields.push(newOrder)
    this.openfieldForm()
    this.newFieldName=''
    this.newFieldType='character varying(255)'
    this.newfieldChoises=null
    this.newFieldStatus='no description'
    console.log(this.formulaire)

  }
}
  else{
    if(this.newFieldLevel!=''){
      if(this.newFieldLevel!='new'){
        let indexT=this.formulaire.tables.findIndex((e:any)=>e.Table_level==Number(this.newFieldLevel))
        
      this.AjoutFieldDansLeSystem(indexT)
      }
      else{
        console.log(this.lastTableIndex)
        if((this.fields.findIndex((e:any)=> e.Name==this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase())==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 


          this.lastTableIndex++;
          let newTable={
            Formulaire_Id:this.formulaire.Formulaire_Id,
            Table_Name:this.formulaire.Formulaire_Name.replace(/\s/g, '').toLowerCase().replace(/\s/g, '').replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll('"','')+this.lastTableIndex,
            Table_level:this.lastTableIndex
    
          }
          this.FormulaireService.creatNewTable(newTable).subscribe((table:any)=>{
            table['fields']=[]
           
    
            this.lastTableIndex--

    
            console.log(this.formulaire.tables,this.lastTableIndex)
            if(this.formulaire.tables.length!=0){let val={
              Table_Name_inf:table.Table_Name,
              Table_Name_sup:this.formulaire.tables[this.lastTableIndex].Table_Name
            }
            this.FormulaireService.addForeignKey(val).subscribe((res:any)=>{})}
            this.formulaire.tables.push(table)

              this.AjoutFieldDansLeSystem(this.formulaire.tables.length-1)
            
              this.lastTableIndex++

              

            
          })




        
                  

      }
    }
    }
  }

  }
  VerifierTableauxEtsupprimer():any{
    let test=false
    this.formulaire.tables.forEach((tab:any,i:any)=>{

      if(tab.fields.length==0){
        if(i==this.formulaire.tables.length-1){
          this.FormulaireService.deleteTable(tab.Table_Id).subscribe((res:any)=>{
            this.formulaire.tables.splice(this.formulaire.tables.length-1,1)
            this.lastTableIndex--
          })
        }
        else{
          if(!((this.formulaire.tables.length==1)&&(i==0))) {
            for(let j=i;j<this.formulaire.tables.length-1;j++){
            this.formulaire.tables[j].fields=[]
            this.formulaire.tables[j].fields=this.formulaire.tables[j+1].fields
            this.formulaire.tables[j].fields.forEach((field:any)=>{
              field.Table_Id=this.formulaire.tables[j].Table_Id
            })
          }
          this.FormulaireService.deleteTable(this.formulaire.tables[this.formulaire.tables.length-1].Table_Id).subscribe((res:any)=>{
            this.formulaire.tables.splice(this.formulaire.tables.length-1,1)
            this.lastTableIndex--
          })
          test=true
        }
        }

       }

    })
    return test
  }
  generatFields(){
   let test =this.VerifierTableauxEtsupprimer()
   
    if(!test){this.formulaire.tables.forEach((tab:any)=>{

          tab.fields.forEach((field:any)=>{ 
          let newField={
            Table_Id:field.Table_Id,
            Name:field.Name,
            Type:field.Type,
            Status:field.Status,
            Serv_Id:null,
            Serv_description:field.Serv_description,
            Field_order:field.Field_order
      
          }    
          this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{ })})
         
    })
    this.shownServNum=this.currentsrvOrd

   this.isGenerated=true

this.router.navigate(['/formulaire/new/', this.formulaire.Formulaire_Id,1]).then((a:any)=>{
  location.reload()
})
   
  }
   else{
    alert("verifier l'organization des colones")
   }
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
      this.organisationFieldsOrder()
      
 
    console.log(this.formulaire.tables,this.fields)
    }

    dropFields(event: CdkDragDrop<any>) {

  
      if (event.previousContainer === event.container) {
           moveItemInArray(
             event.container.data,
             event.previousIndex,
             event.currentIndex
           );
         }
      this.fields.forEach((field:any,i:any)=>{
        console.log('8585',this.orderFields,field);
        
        if(field.Name!='ID'){let index=this.orderFields.findIndex((e:any)=>e.Name==field.Name)
        this.orderFields[index].orderFront=i
        this.fields[i]['orderFront']=i}
      })
    
       console.log(this.formulaire.tables,this.fields)
       }
    organisationFieldsOrder(){
      
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
    }

    addNewTable(){
      this.lastTableIndex++;
      let newTable={
        Formulaire_Id:this.formulaire.Formulaire_Id,
        Table_Name:this.formulaire.Formulaire_Name.replace(/\s/g, '').toLowerCase().replace(/\s/g, '').replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll('"','')+this.lastTableIndex,
        Table_level:this.lastTableIndex

      }
      this.FormulaireService.creatNewTable(newTable).subscribe((table:any)=>{
        table['fields']=[]

        this.lastTableIndex--

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
   if(test&&(Number(this.shownServNum)==Number(this.currentsrvOrd))) this.nextServ()
    this.router.navigate(['/formulaire/list/'])
  }
  fieldsToShow(){
    console.log(Number(this.shownServNum),Number(this.currentsrvOrd))
    if((Number(this.shownServNum)!=Number(this.currentsrvOrd))||(this.formulaire.services.length==this.servsEtap.length)||(this.formulaire.services==1)){
      let index=this.servsEtap.findIndex((e:any)=> e.Serv_order==Number(this.shownServNum))
      let indexP=this.servsEtap.findIndex((e:any)=> e.Serv_Id==this.fields[1].Serv_Id)
      if(indexP!=-1) this.servsEtap[indexP].fields=this.fields
      this.fields=this.servsEtap[index].fields
      this.fields=this.setOrder(this.fields)

      console.log(indexP,index,this.servsEtap)
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
  this.fields=this.setOrder(this.fields)
}
  }

  correctionField(index:any,result:any){
    this.fields[index].Status=result
    if(this.fields[index].Serv_Id!=null){
      let indexT=this.formulaire.tables.findIndex((e:any)=> e.Table_Id==this.fields[index].Table_Id)
      let indexF=this.formulaire.tables[indexT].fields.findIndex((e:any)=>e.Name==this.fields[index].Name)
      let updatedField={
        Field_Id:this.fields[index].Field_Id,
        Table_Id:this.fields[index].Table_Id,
        Name:this.fields[index].Name,
        Type:this.fields[index].Type,
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
      if((this.currentsrvOrd==this.shownServNum)&&(this.servsEtap.length<=this.formulaire.services.length)){
        if(this.servsEtap.findIndex((e:any)=>e.Serv_Name==this.currentsrvName)==-1){this.FormulaireService.creatNewService(newServ).subscribe((serv:any)=>{
    serv['fields']=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
        serv.fields.forEach((field:any)=>{
          field.Serv_Id=serv.Serv_Id
        })
        if(this.servsEtap.length+1<this.formulaire.services.length) {
        this.currentsrvOrd++;
        this.shownServNum++;}
        this.servsEtap.push(serv)
        this.fields.forEach((field:any)=>{

          if(field.Name!='ID'){    
     
            let newField={
            Table_Id:field.Table_Id,
            Name:field.Name,
            Type:field.Type,
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
            
            if(this.servsEtap.length<this.formulaire.services.length) field.Status='consulté'
            else field.Serv_Id=res.Serv_Id
          })}
        })
      })}}
      else{
        if(Number(this.shownServNum)<Number(this.currentsrvOrd)){
        this.shownServNum=Number(this.shownServNum)+1
        this.fieldsToShow()}
      }

  }
  prevServ(){
    
    if(Number(this.shownServNum)-1>0){
      this.shownServNum=Number(this.shownServNum)-1
      this.fieldsToShow()}
  }
  ifUsed(servName:any){
    let test=this.servsEtap.findIndex((e:any)=>e.Serv_Name==servName)!=-1
    return test;
  }
 changeServName(){
  if((this.currentsrvOrd!=this.shownServNum)||((this.currentsrvOrd==this.shownServNum)&&(this.formulaire.services.length==this.servsEtap.length))){
   let updateServ={
    Serv_order:Number(this.shownServNum),
    Formulaire_Id:this.formulaire.Formulaire_Id,
    newName:this.currentsrvName
   }
   this.FormulaireService.updateServName(updateServ).subscribe((res:any)=>{
   let index=this.servsEtap.findIndex((e:any)=>e.Serv_order==this.shownServNum)
   this.servsEtap[index].Serv_Name=this.currentsrvName
   this.alert()
   })
  }
 }

 setOrder(fields:any):any{
  console.log('testtet',this.orderFields);
  
  fields.forEach((field:any,i:any)=>{
    let refrenceOrder=this.orderFields.find((e:any)=>e.Name==field.Name)
    if(refrenceOrder){
      field['orderFront']=refrenceOrder.orderFront
    }
    else{
      field['orderFront']=i
    }
    
  })
  fields.sort((a:any,b:any)=>a.orderFront-b.orderFront)
  return fields
 }


 



getNewFormulaire(){
    this.authService.loadUser();
    let starterFields:any[]=[]
    this.route.params.subscribe((param:any)=>{
      this.FormulaireService.getFormulaireById(param.id).then((form:any)=>{
        this.FormulaireService.getTables(param.id).then((tables:any)=>{
             this.lastTableIndex=tables.length-1
             this.FormulaireService.getServicesByformulaire(param.id).then(async (servs:any)=>{
            if(param.generated==1){
              this.isGenerated=true
            }
            let level=0
            
            for(let i=0;i<tables.length;i++){
              let index=tables.findIndex((e:any)=> e.Table_level==level)
              
              tables[index]['fields']=[]
              this.FormulaireService.getFieldsInArchive(tables[index].Table_Id).then((fieldsInArchive:any)=>{
              this.FormulaireService.getAllFields(tables[index].Table_Id).then((fields:any)=>{
                tables[index]['fields']=fields
                fields.forEach((field:any,a:any)=>{
                  field.Status='consulté'
                  
                  field['orderFront']=a
                  let newOrder={
                    Name:field.Name,
                    orderFront:a
                  }
                  this.orderFields.push(newOrder)
                  
                  starterFields.push(field)
                })
                console.log('444',this.orderFields);
                
                fieldsInArchive.forEach((field:any)=>{
                  this.fieldsInArchive.push(field);
                })
              })
               
                  

                
              
              })
              level++
            }


              this.FormulaireService.workingServices(param.id).then((servs1:any)=>{
                servs1.forEach((serv:any)=>{
                  serv['fields']=[{
                    Name:'ID',
                    Type:'auto_number',
                    Status:'consulté'
                  }]
                  this.FormulaireService.getFields(serv.Serv_Id).then((fields:any)=>{
                    fields.forEach((field:any)=>{
                      field['editDesc']=false
                      field['editSataus']=false
                      field['editName']=false
                      field['editType']=false
                      field['oldName']=''
                    })
                    serv.fields=fields
                    if((servs1.length+1>servs.length)&&(serv.Serv_order==servs.length)){
                      this.fields=fields
                      this.fields=this.setOrder(this.fields)
                    }
                    console.log('fields serv',fields);
                  })
                  
                  serv.fields=this.setOrder(serv.fields)
                  if(servs.length==1){
                    this.fields=serv.fields
                  }
                })
                this.servsEtap=servs1
  
                if ((servs1.length+1<=servs.length)){
                  console.log(starterFields,"aaaaaaaaa")
                  this.currentsrvOrd=servs1.length+1
                  this.fields=starterFields
                }
                else{
                  this.currentsrvOrd=servs.length
                }

                this.shownServNum=this.currentsrvOrd
  
  
                form['tables']=tables
                form['services']=servs
  
                this.formulaire=form
                console.log("form",this.formulaire,"servs",servs);
                
                this.currentsrvName=servs[0].Serv_Name
                this.numservs=this.formulaire.services.length
                this.fields.sort((a:any, b:any) => {
                  if(a.Name=='ID') return -1;
                  else if(b.Name=='ID') return 1
          
                  else return a.Name.localeCompare(b.Name)})
             console.log("enddd");
             
               
                
              })
          

              

              


          })

        })
        
      })
    })


  }

}
