import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tabs-graphs',
  templateUrl: './tabs-graphs.component.html',
  styleUrls: ['./tabs-graphs.component.css']
})
export class TabsGraphsComponent implements OnInit {
  @Output() closePopUp=new EventEmitter<any>();
  @Input() editable:boolean=false
  @Input() codeGraph:any={}
  @Input() reponse_id:Number=0



   lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);
  constructor() { }

  ngOnInit(): void {
  }



}
