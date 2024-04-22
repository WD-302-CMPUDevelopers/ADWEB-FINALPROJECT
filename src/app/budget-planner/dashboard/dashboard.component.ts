import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  //Income
  lastMonthsIncome = ['January: ₱11000', 'February: ₱12500', 'March: ₱10700'];
  currentMonthIncome = '₱16000';

  //Expense
  lastMonthsExpense = ['January: ₱12500', 'February: ₱10100', 'March: ₱8000'];
  currentMonthExpense = '₱9000';
 
  //Todo Trans
  todoTransactions = [
    { description: 'Car Maintenance Expenses' },
    { description: 'House Repair Expenses' },
    { description: 'Utilities Expenses' },
    { description: 'Travel Expenses' }
  ];

  //Total
  totalCurrentMonthIncome = 16000;
  totalCurrentMonthExpense = 9000;
  constructor(public router: Router) { }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }
  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }
  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }
  
  //Calculate Total
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }

}
