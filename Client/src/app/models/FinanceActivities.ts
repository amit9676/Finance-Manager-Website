import { Actions } from './Actions';
import { ExpensesTypes } from './ExpensesTypes';

export class FinanceActivities
{
    public constructor(public id?: number,
                       public typeOfAction?: Actions, 
                       public date?: Date,
                       public value?: number,
                       public description?: string,
                       public typeOfExpense?: ExpensesTypes
                       ){

    }
}