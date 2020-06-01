import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { MonthReportComponent } from './components/month-report/month-report.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "add-transaction", component: AddTransactionComponent},
  { path: "monthReport", component: MonthReportComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '**', component: PnfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
