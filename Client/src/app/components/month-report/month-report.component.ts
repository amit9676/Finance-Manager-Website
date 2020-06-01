import { Component, OnInit } from '@angular/core';
import { FinanceActivitesService } from 'src/app/services/finance-activites.service';
import { FinanceActivities } from 'src/app/models/FinanceActivities';
import { ReportLogicService } from 'src/app/services/report-logic.service';

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.css']
})
export class MonthReportComponent implements OnInit {

  public errorPage = false;
  public allActivites: FinanceActivities[];

  public presentYear = new Date().getFullYear();
  public givenyr: number;
  public givenmnt: number;

  public totalIncome: number;
  public vatlessIncome: number;

  public totalExpense: number;
  public vatlessExpense: number;

  public grossProfit: number;
  public vatToPay: number;
  public taxes: number;
  public natInsurance: number;
  public totalLoses: number;
  public netProfit: number;

  constructor(public financeActivities: FinanceActivitesService, public reportLogic: ReportLogicService) { }

  ngOnInit() {
    
    
  }

  publicgetMontlyReport(){
    this.financeActivities.getTheActivitesAsync().subscribe(activites => {
      this.allActivites = activites.filter(p => this.financeActivities.getTheYear(p.date) == this.givenyr && Number(this.financeActivities.getTheMonth(p.date)) == this.givenmnt);

      if(this.allActivites.length > 0){
        this.maxIncome();
        this.maxIncomeVatless();
        this.maxExpense();
        this.maxExpenseVatless();
        this.GrossProfit();
        this.VatToPay();
        this.taxToPay();
        this.nationalInsurance();
        this.totLoses();
        this.NetProfit();

      }
      else{

      }
      
      },
      err => {
        console.log(err.message);
        this.errorPage = true;
      },
      () => console.log("done")
      );
  }

  public dateChecker(){
   
      let mth = document.getElementById('mnt');
      let yr = document.getElementById('yr');

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
  }


  public maxIncome():number{
    //console.log(this.allActivites);
    this.totalIncome = this.reportLogic.maxIncome(this.allActivites);
    //console.log(this.totalIncome);
    return this.totalIncome
  }

  public maxIncomeVatless(){
    this.vatlessIncome = this.reportLogic.maxIncomeWithoutVat(this.totalIncome);
  }

  public maxExpense():number{
    //console.log(this.allActivites);
    this.totalExpense = this.reportLogic.maxExpense(this.allActivites);
    //console.log(this.totalIncome);
    return this.totalExpense;
  }

  public maxExpenseVatless(){
    this.vatlessExpense = this.reportLogic.maxIncomeWithoutVat(this.totalExpense);
  }

  public GrossProfit(){
    this.grossProfit = this.totalIncome - this.totalExpense;
  }

  public VatToPay(){
    this.vatToPay = (this.totalIncome / 100 * 17) - (this.totalExpense / 100 * 17);
    if (this.vatToPay < 0){
      this.vatToPay = 0;
    }  
  }

  public taxToPay(){
    this.taxes = this.reportLogic.Taxes(this.grossProfit);
  }

  public nationalInsurance(){
    this.natInsurance = this.reportLogic.NationalInsurance(this.grossProfit);
  }

  public totLoses(){
    this.totalLoses = this.taxes + this.vatToPay + this.natInsurance;
  }

  public NetProfit(){
    this.netProfit = this.grossProfit - this.totalLoses;
  }

}
