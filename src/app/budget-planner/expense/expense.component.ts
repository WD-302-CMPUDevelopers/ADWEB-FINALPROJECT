import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 12500 },
    { month: 'February', expenseAmount: 10100 },
    { month: 'March', expenseAmount: 8800 },
    { month: 'April', expenseAmount: 9000 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Electric Bill', expenseAmount: 6000 },
    { expenseType: 'Groceries', expenseAmount: 4000},
    { expenseType: 'Water Bill', expenseAmount: 2500}
  ];
  februaryExpense: any[] = [
    { expenseType: 'Electric Bill', expenseAmount: 4000 },
    { expenseType: 'Groceries', expenseAmount: 2000},
    { expenseType: 'Water Bill', expenseAmount: 2000},
    { expenseType: 'Basic Expenses', expenseAmount: 2100}
  ];
  marchExpense: any[] = [
    { expenseType: 'Electric Bill', expenseAmount: 4000 },
    { expenseType: 'Groceries', expenseAmount: 2000},
    { expenseType: 'Water Bill', expenseAmount: 2000}
  ];
  aprilExpense: any[] = [
    { expenseType: 'Electric Bill', expenseAmount: 4500 },
    { expenseType: 'Basic Expenses', expenseAmount: 1000},
    { expenseType: 'Water Bill', expenseAmount: 2500},
    { expenseType: 'Groceries', expenseAmount: 1000}
  ];
  mayExpense: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
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

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.expenseForm.valid) {
      this.expenseForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  } 
}
