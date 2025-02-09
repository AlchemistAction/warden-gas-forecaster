import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-gas-chart',
  templateUrl: './gas-chart.component.html',
  styleUrls: ['./gas-chart.component.css']
})
export class GasChartComponent implements OnInit {
  chart: any;
  realPrices: number[] = [];
  predictedPrices: number[] = [];
  labels: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initializeChart();
    this.fetchGasPrices();
    setInterval(() => this.fetchGasPrices(), 5000); // Fetch new data every 5s
  }

  initializeChart() {
    const ctx = document.getElementById('gasChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Live Gas Price',
            data: this.realPrices,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Predicted Gas Price',
            data: this.predictedPrices,
            borderColor: 'red',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true }
        }
      }
    });
  }

  fetchGasPrices() {
    this.http.get<any>('http://localhost:3000/gas-prices').subscribe(data => {
      const timestamp = new Date().toLocaleTimeString();
      this.labels.push(timestamp);
      this.realPrices.push(data.real[data.real.length - 1] || 0);
      this.predictedPrices.push(data.predicted[data.predicted.length - 1] || 0);

      this.chart.update();
    });
  }
}
