import { Component, OnInit } from '@angular/core';
import { ResponsableService } from 'src/app/service/responsable.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-matiere',
  templateUrl: './detail-matiere.component.html',
  styleUrls: ['./detail-matiere.component.scss']
})
export class DetailMatiereComponent implements OnInit {
  bgColor
nom=localStorage.getItem("nom")
  tabMatierres: any[];
  matiere: any;
  tabNotes: any[];
  Notes=[];
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'myCard', // the id of html/table element
  }
  pasEncore: boolean;
  selectedUser: any;
 
  constructor(private serv:ResponsableService,
    private exportAsService: ExportAsService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.tabMatierres=this.serv.affMatierres
    this.tabNotes=this.serv.tabNotes
    console.log(this.serv.tabNotes)
  }
  notifier(){
   this.route.paramMap.subscribe(res=>{
      let id=res.get("id")
      let message=" vous n'avez pas encore ajouté la matierre "+this.matiere.nom+" de la classe "
      +this.matiere.class.niveau+" "+this.matiere.class.nom+" departement "+this.matiere.class.depart
      this.serv.Notifier(id,message).subscribe(res=>{
        console.log(res)
      })
    })
  
  }
  onSelect(index): void {
    this.selectedUser = index;
    console.log(this.selectedUser);
    }

  affMatierre(m){
    this.bgColor='red'
    this.matiere=m
    console.log(m)
if(this.tabNotes.filter(nm=> nm.matierre._id==m._id).length!=0)
{this.Notes=this.tabNotes.filter(nm=> nm.matierre._id==m._id)[0].detail
  if(this.Notes[0].note=='null'){
    this.pasEncore=true

  }else
   this.pasEncore=false
}
else
{
  this.pasEncore=true
}
console.log(this.Notes)

  }
 export() {
   let m=this.matiere
    this.exportAsService.save(this.exportAsConfig, m.class.niveau+'-'+m.class.nom+'-'+m.nom+'-semestre'+m.semestre).subscribe(() => {
      // save started
    });
 
  }
}
