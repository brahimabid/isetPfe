import { Component, OnInit, Inject } from '@angular/core';
import { ProfService } from '../service/prof.service';
import { AuthService } from '../service/auth.service';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import { interval } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {
  tabSaved = []
  tabMatierre = []
  tabFilter = []
  matiere: any;
  submitted: boolean;
  tabDetail = []
  nom: string;
  selectedUser: any;
  nbrMessage: any;
  id: string;
  tabM = []

  constructor(private profServ: ProfService,
     private auth:AuthService,
     private http:Http,
     public dialog: MatDialog) { }

  ngOnInit() {


    this.nom=localStorage.getItem("nom")
    this.submitted = false
    this.id = localStorage.getItem("id")
    this.profServ.mesMatiere(this.id).subscribe(res => {
      this.tabSaved = res.saveMatieres
      this.tabMatierre = res.allMatiere
      console.log(res)
    })
   const obs=interval(4000)
   obs.subscribe(res=>{
     this.getMessaget()
   })
    
  }
 getMessaget(){
  return this.http.get('http://localhost:3000/message/getMessages/'+this.id).map(res=>{
    return res.json()
  }).subscribe(res=>{
    console.log(res)
   if(res.status==true){
    this.nbrMessage=res.resultat.length
    this.tabM=res.resultat
   }else{
    this.nbrMessage=0
   }
  })
 }
 openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '500px',
    data: this.tabM
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
  onSelect(index): void {
    this.selectedUser = index;
    console.log(this.selectedUser);
    }
  affMatiere(m) {
    this.matiere = m

    this.tabFilter = this.tabSaved.filter(x => x.matierre._id == m._id)
    if (this.tabFilter.length > 0) {
      console.log(m)
      this.tabFilter = this.tabSaved.filter(x => x.matierre._id == m._id)[0].detail

      console.log(this.tabFilter)
    } else
      if (this.tabFilter.length==0) {
        this.submitted = false

      }
  }

  insert(note, e) {
    console.log(note)
    if (note <= 20 && note >= 0) {
      let i = this.tabFilter.indexOf(e)
      this.tabFilter[i].note = note
      this.tabDetail.push(this.tabFilter[i])
      this.tabFilter.splice(i, 1)
      if (this.tabFilter.length == 0) {
        this.enregistrer()
      }
    }
    else alert(note+" doit etre entre 0 et 20")
  }
  enregistrer() {
    this.submitted = true

    this.profServ.insererNotes(this.tabDetail, this.matiere._id).subscribe(res => {
      console.log(res)
      if (res.status == true) {
        setTimeout(res => {
          this.submitted = false
this.tabFilter=this.tabDetail
        }, 2000)
      }
      
    })


  }
logout(){
  this.auth.logOut()
}
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.html',
})
export class DialogOverviewExampleDialog {
  tabM: any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.tabM=this.data
      console.log(this.data)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}