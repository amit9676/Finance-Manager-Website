import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinanceActivities } from '../models/FinanceActivities';
import { Actions } from '../models/Actions';

@Injectable({
  providedIn: 'root'
})
export class FinanceActivitesService {

  constructor(private httpClient: HttpClient) { }

  public getTheYear(date: Date):number{
    var start = new Date(date);
    var y = start.getFullYear();
    return y;
  }

  public getTheMonth(date: Date):string{
    var start = new Date(date);
    var m = start.getMonth();

    if(m < 9){
      return '0' + String(m + 1);
    }
    else{
      return String(m + 1);
    }
    
  }

  public getTheDay(date: Date):string{
    var start = new Date(date);
    var d = start.getDate();
    
    if(d < 10){
      return '0' + String(d);
    }
    else{
      return String(d);
    }
  }

  public getTheActivitesAsync():Observable<FinanceActivities[]>{

      const url = 'http://localhost:61598/api/activites';
      return this.httpClient.get<FinanceActivities[]>(url);
  }

  public addAction(fina: FinanceActivities):Observable<FinanceActivities>{
    //const url = '/assets/json/activities.json';
    const url = 'http://localhost:61598/api/activites';
    return this.httpClient.post<FinanceActivities>(url, fina);
  }

  public editAction(fina: FinanceActivities):Observable<FinanceActivities>{
    const url = 'http://localhost:61598/api/activites';
    return this.httpClient.put<FinanceActivities>(url + '/' + fina.id, fina);
  }

  public deleteAction(id: number):Observable<undefined>{
    
    const url = 'http://localhost:61598/api/activites';
    return this.httpClient.delete<undefined>(url + '/' + id);
  }


  
}
