import { Injectable } from '@angular/core';
import { FinanceActivities } from '../models/FinanceActivities';
import { Actions } from '../models/Actions';

@Injectable({
  providedIn: 'root'
})
export class ReportLogicService {

  constructor() { }

  public maxIncome(allactivites: FinanceActivities[]):number{

    let totalIncome: number = 0;
    //console.log(allactivites.length);
    allactivites = allactivites.filter(p => p.typeOfAction == Actions.Income);
    //console.log(allactivites.length);
    for(let i = 0; i < allactivites.length; i++){
      totalIncome += allactivites[i].value;
    }
      return totalIncome;
  }

  public maxIncomeWithoutVat(totalIncome: number): number{
    return totalIncome * 0.83;
  }

  public maxExpense(allactivites: FinanceActivities[]):number{

    let totalExpense: number = 0;
    //console.log(allactivites.length);
    allactivites = allactivites.filter(p => p.typeOfAction == Actions.Expense);
    //console.log(allactivites.length);
    for(let i = 0; i < allactivites.length; i++){
      totalExpense += allactivites[i].value;
    }
      return totalExpense;
  }

  public Taxes(GrossProfits: number): number {
    if (GrossProfits < 0)
        return 0;
    else if (GrossProfits >= 0 && GrossProfits <= 4590)
        return GrossProfits / 10;
    else if (GrossProfits > 4590 && GrossProfits <= 8160)
        return GrossProfits / 100 * 15;
    else if (GrossProfits > 8160 && GrossProfits <= 12250)
        return GrossProfits / 100 * 23;
    else if (GrossProfits > 12250 && GrossProfits <= 17600)
        return GrossProfits / 10 * 3;
    else if (GrossProfits > 17600 && GrossProfits <= 37890)
        return GrossProfits / 100 * 34;
    else
        return GrossProfits / 100 * 46;
  }

  public NationalInsurance(GrossProfits: number):number
  {
      if (GrossProfits < 0 || GrossProfits > 36750)
          return 0;
      else if (GrossProfits >= 0 && GrossProfits <= 4598)
          return GrossProfits / 100 * 9.82;
      else
          return GrossProfits / 100 * 16.23;
  }
}
