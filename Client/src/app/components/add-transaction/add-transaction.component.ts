import { Component, OnInit } from '@angular/core';
import { FinanceActivities } from 'src/app/models/FinanceActivities';
import { FinanceActivitesService } from 'src/app/services/finance-activites.service';
import { ExpensesTypes } from 'src/app/models/ExpensesTypes';
import { Actions } from 'src/app/models/Actions';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  public financeActivities = new FinanceActivities();
  public givenDate = new Date(undefined,undefined,undefined);
  public future = false;

  public datelock = false;
  
  constructor(private finaService: FinanceActivitesService) { }

  ngOnInit() {
  }

  public addAction():void{
    if(this.financeActivities.description === undefined){
      this.financeActivities.description = "";
    }

    console.log(this.financeActivities.typeOfAction);
    //this.
    /*alert(`
    ID: ${this.financeActivities.id}
    Type of action: ${this.financeActivities.typeOfAction}
    value: ${this.financeActivities.value}
    date: ${this.financeActivities.date}
    description: ${this.financeActivities.description}
    Type of Expense: ${this.financeActivities.typeOfExpense}`);*/
    //this.financeActivities.typeOfAction

    this.finaService.addAction(this.financeActivities).subscribe(p => 
      alert("transaction added."), err => alert('error, could not upload data. please check your connection.')
    );

  }

  public theDate(date: Date):boolean{
    if ((new Date(date)) > new Date(new Date().setHours(23,59,59,999))){
      return this.future = true;
    }
    else{
      return this.future = false;
    }
  }

  public datelocker(){
    if (this.financeActivities.date != undefined){
      this.datelock = true;
    }
  }

  public negativePrice():boolean{
    if(this.financeActivities.value <= 0){
      return true;
    }
    else{
      return false;
    }
  }

  public setTypeOfAction():boolean{
    this.financeActivities.typeOfAction = Actions[(<HTMLInputElement>document.getElementById('act')).value];

    if (this.financeActivities.typeOfAction == Actions.Income){
      return false;
    }
    return true;
  }

  public typeofExpense(){
    this.financeActivities.typeOfExpense = ExpensesTypes[(<HTMLInputElement>document.getElementById('exp')).value];
  }

}
