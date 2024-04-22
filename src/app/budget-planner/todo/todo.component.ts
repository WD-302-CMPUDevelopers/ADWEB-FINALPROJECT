import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm: any;
  selectedMonth: any;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 5000 },
    { month: 'February', expenseAmount: 6500 },
    { month: 'March', expenseAmount: 2000 },
    { month: 'April', expenseAmount: 7000 },
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Car Maintenance', expenseAmount: 5000 }
  ];

  februaryExpense: any[] = [
    { expenseType: 'House Repair', expenseAmount: 4000 },
    { expenseType: 'Utilities', expenseAmount: 2500 }
  ];

  marchExpense: any[] = [
    { expenseType: 'Entertainment', expenseAmount: 2000 }
  ];
  aprilExpense: any[] = [
    { expenseType: 'Travel Expenses', expenseAmount: 7000 }
  ];
  mayExpense: any[] = [];
  constructor(private fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.selectedMonth = currentMonth;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        case 'April':
          this.aprilExpense.push(newExpense);
          break;
        case 'May':
          this.mayExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({ month: '', expenseType: '', expenseAmount: '' });
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    let filteredExpense: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      case 'April':
        filteredExpense = [...this.aprilExpense];
        break;
      case 'May':
        filteredExpense = [...this.mayExpense];
        break;
      default:
        break;
    }
    return filteredExpense;
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const income of this.gettodoFormonth(month)) {
      totalExpense += income.expenseAmount;
    }
    return totalExpense;
  }

  gettodoFormonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      case 'April':
        return this.aprilExpense;
      case 'May':
        return this.mayExpense;
      default:
        return [];
    }
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
  }
}
