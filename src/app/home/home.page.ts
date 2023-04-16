import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/services/user';
import { FinanceService } from '../services/finance.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  selectedDate: Date = new Date();
  user: User | null = null;
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  hasChartData: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private financeService: FinanceService,
  ) {
    this.fetchUserData();
  }

  async fetchUserData() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.uid) {
      this.user = await this.authService.getUserData(user.uid);
    }
    return Promise.resolve();
  }
  
  ngAfterViewInit() {
    this.fetchUserData().then(() => {
      this.createFinancialChart();
    });
  }

  createFinancialChart() {
    const canvas = this.renderer.createElement('canvas');
    this.renderer.addClass(canvas, 'financial-chart');
    const chartContainer =
      this.el.nativeElement.querySelector('.chart-container');
    this.renderer.appendChild(chartContainer, canvas);
  
    // Obtén los ingresos y gastos totales del servicio de finanzas
    const incomes = this.financeService.getIncomes();
    const expenses = this.financeService.getExpenses();
    this.totalIncomes = incomes.reduce((total, income) => total + income.amount!, 0);
    this.totalExpenses = expenses.reduce((total, expense) => total + expense.amount!, 0);

    this.hasChartData = this.totalIncomes > 0 || this.totalExpenses > 0;
  
    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Gastos', 'Ingresos'],
        datasets: [
          {
            // Utiliza los ingresos y gastos totales en lugar de los valores estáticos
            data: [this.totalExpenses, this.totalIncomes],
            backgroundColor: ['#FF6384', '#36A2EB'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: '30%',
      },
    });
  }  

  upcomingEvents = [
    {
      title: 'Reunión con el equipo',
      dueDate: new Date(),
    },
    {
      title: 'Entrega de proyecto',
      dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
  ];

  notes = [
    {
      title: 'Ideas para el proyecto',
    },
    {
      title: 'Recordatorio: comprar café',
    },
  ];
}
