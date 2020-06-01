import { Component, OnInit } from '@angular/core';
import { FinanceActivities } from 'src/app/models/FinanceActivities';
import { FinanceActivitesService } from 'src/app/services/finance-activites.service';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { toTypeScript } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Actions } from 'src/app/models/Actions';
import { ExpensesTypes } from 'src/app/models/ExpensesTypes';
import { Sorts } from 'src/app/models/sorts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public errorPage: boolean = false;

  public allActivites: FinanceActivities[];
  public editMode: boolean[] = [];

  public years: string[] = [];
  public months: string[] = [];
  public days: string[] = [];


  public givenDate = new Date();
  public future = false;
  public validatedDate = true;

  public givenValue: number;
  public givenDescription: string;
  public givenAction: Actions;
  public givenExpense: ExpensesTypes;

  public givenSort: Sorts = Sorts.All;
  public dateSort = false;
  public presentYear = new Date().getFullYear();

  public givenyr: number;
  public givenmnt: number;


  constructor(public financeActivities: FinanceActivitesService) {
   }

  ngOnInit() {
    
    this.financeActivities.getTheActivitesAsync().subscribe(activites => {
      this.allActivites = activites;
      for(let i  = 0; i < this.allActivites.length; i++){
        this.years[this.allActivites[i].id - 1] = String(this.financeActivities.getTheYear(this.allActivites[i].date));
        this.months[this.allActivites[i].id - 1] = this.financeActivities.getTheMonth(this.allActivites[i].date);
        this.days[this.allActivites[i].id - 1] = this.financeActivities.getTheDay(this.allActivites[i].date);
        }
      },
      err => {
        console.log(err.message);
        this.errorPage = true;
      },
      () => console.log("done")
      );
      
      this.givenDate.setFullYear(1, 1, 1);
      
      
  }

  public convertToInput(item: FinanceActivities):void{
    

    
    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.future = false;
    this.validatedDate = true;
    

    

    this.givenValue = item.value;
    this.givenDescription = item.description;
    this.givenDate = item.date;
    this.givenAction = item.typeOfAction;
    this.givenExpense = item.typeOfExpense;

    if(Number(this.years[item.id - 1]) > 99 && Number(this.years[item.id - 1]) < 1000){
      this.years[item.id - 1] = '0' + this.years[item.id - 1];
    }
    else if(Number(this.years[item.id - 1]) > 9 && Number(this.years[item.id - 1]) < 100){
      this.years[item.id - 1] = '00' + this.years[item.id - 1];
    }
    else if(Number(this.years[item.id - 1]) > 0 && Number(this.years[item.id - 1]) < 10){
      this.years[item.id - 1] = '000' + this.years[item.id - 1];
    }
    
  }

  public saveChanges(id: number, item: FinanceActivities):void{
    this.editMode[item.id] = false;


    item.typeOfAction = this.givenAction;
    item.date = this.givenDate;
    item.value = this.givenValue;
    item.description = this.givenDescription;
    item.typeOfExpense = this.givenExpense;


    this.financeActivities.editAction(item).subscribe(p => {console.log(item.value);},
     err => alert('error'));

     this.years[item.id - 1] = String(this.financeActivities.getTheYear(item.date));
     this.months[item.id - 1] = this.financeActivities.getTheMonth(item.date);
     this.days[item.id - 1] = this.financeActivities.getTheDay(item.date);
  }

  public FutureDate(date: Date):boolean{
    if ((new Date(date)) > new Date(new Date().setHours(23,59,59,999))){
      return this.future = true;
    }
    else{
      return this.future = false;
    }
  }

  public setDate(){
    this.givenDate = new Date((<HTMLInputElement>document.getElementById('theDate')).value);
    
    this.validDate();
    this.FutureDate(this.givenDate);
  }

  public validDate():void{
    
    if(this.givenDate.getFullYear() || this.givenDate.getMonth() || this.givenDate.getDate()){
      this.validatedDate = true;
    }
    else this.validatedDate = false;
  }

  public negativePrice():boolean{
    if(this.givenValue <= 0){
      return true;
    }
      return false;
  }

  public changeAction(){

    if (this.givenAction == Actions.Income){
      
      this.givenExpense =undefined;
    }
    else{
      this.givenExpense =ExpensesTypes.Regular;
    }
  }

  public deleteAction(id: number){
    
    this.financeActivities.deleteAction(id).subscribe(() => this.ngOnInit(), err => alert(err.message), () => console.log('done'));
  
  }

  public activitiesFilter():FinanceActivities[]{
   
    this.givenSort = Sorts[(<HTMLInputElement>document.getElementById('srt')).value];
    
    if(this.givenSort == Sorts.All){
      this.dateSort = false;
      return this.allActivites;
    }
    else if(this.givenSort == Sorts.Income){
      this.dateSort = false;
      return this.allActivites.filter(p => p.typeOfAction == Actions.Income);
    }
    else if(this.givenSort == Sorts.Expense){
      this.dateSort = false;
      return this.allActivites.filter(p => p.typeOfAction == Actions.Expense);
    }
    else if(this.givenSort == Sorts.Date){
      this.dateSort = true;
      let mth = document.getElementById('mnt');
      let yr = document.getElementById('yr');

      if(this.givenyr && this.givenmnt && this.givenmnt >= 1 && this.givenmnt <= 12 && this.givenyr >= 1 && this.givenyr <= this.presentYear){
        mth.style.color = 'black';
        yr.style.color = 'black';

        return this.allActivites.filter(p => this.financeActivities.getTheYear(p.date) == Number(this.givenyr)
         && Number(this.financeActivities.getTheMonth(p.date)) == this.givenmnt);
      }
      else{
        if(this.givenmnt <= 0 || this.givenmnt > 12){
          
          mth.style.color = 'red';
        }
        else if(mth){
          mth.style.color = 'black';
        }

        if(this.givenyr <= 0 || this.givenyr > this.presentYear){
          
          yr.style.color = 'red';
        }
        else if (yr){
          yr.style.color = 'black';
        }

        return this.allActivites
      }
      
    }
    
  }

}
