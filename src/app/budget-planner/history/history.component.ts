import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule,SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 5000 },
    { month: 'February', expenseAmount: 6500 },
    { month: 'March', expenseAmount: 2000 },
    { month: 'April', expenseAmount: 7000 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Car Maintenance', expenseAmount: 5000 }
  ];
  februaryExpense: any[] = [
    { expenseType: 'House Repairs', expenseAmount: 4000 },
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
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
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
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
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
    if (this.todoForm.valid) {
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
}
