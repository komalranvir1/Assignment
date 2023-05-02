import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Chart from 'chart.js';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  graphForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.graphForm = this.fb.group({
      inputValue: [''],
      maxValue: ['']
    }

    )
  }


  ctx: any;
  config: any;

  ctxBar: any;
  barConfig: any;

  ctxGradient: any;
  gradientConfig: any;


  ngOnInit() {

    this.pieChart(65,70);
    this.barChart(65,70);
    this.gradientChart(65,70);
  }

  onKeyPress(event: any) {
    console.log(this.graphForm.value);
    let maxValue = this.graphForm.get('maxValue')?.value;
    let inputValue = this.graphForm.get('inputValue')?.value;
    
    

    if (inputValue > maxValue) {
      alert('input value is greater then max value')
    }
    this.pieChart(inputValue, maxValue);
    this.barChart(inputValue, maxValue);
    this.gradientChart(inputValue, maxValue);
  }
  pieChart(inputValue: any, maxValue: any) {
    this.ctx = document.getElementById('pieChart');
    this.config = {
      type: 'pie',
      options: {
      },
      data: {
        datasets: [{
          label: 'inputValue ',
          data: [inputValue, maxValue],
          borderWidth: 1,
          borderColor: 'grey',
          backgroundColor: ['blue', 'skyblue']
        }],
      }
    }
    const pieChart = new Chart(this.ctx, this.config);
  }
  barChart(inputValue: any, maxValue: any) {
    this.ctxBar = document.getElementById('barChart');
    this.barConfig = {
      type: 'bar',
      options: {
        scales: {
          x: [{
            ticks: {
              mirror: true
            }
          }],
          y: {
            stacked: true,
            beginAtZero: true
          }
        },

      },
      data: {
        datasets: [
          {
            type: 'bar',
            label: 'InputValue',
            backgroundColor: 'blue',
            stack: 'combined',
            data: [inputValue],
            // order: 2,
          },
          {
            type: 'bar',
            label: 'MaxValue',
            backgroundColor: 'skyblue',
            stack: 'combined',
            data: [maxValue],
            // order: 3,
          },
        ],
      }
    }
    const barChart = new Chart(this.ctxBar, this.barConfig);
  }
  gradientChart(inputValue: any, maxValue: any) {
    this.ctxGradient = document.getElementById('gradientChart');
    this.gradientConfig = {
      type: 'bar',
      options: {
        scales: {
          Plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      },
      data: {
        datasets: [{
          data: [inputValue, maxValue],

          backgroundColor: function (context: { chart: any; }) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return null;
            }
            return getGradient(ctx, chartArea);
          },
          borderColor: [
            'rgba(255, 26, 104, 1)',
           
          ],
          borderWidth: 0
        }]
      }
    }
    const barChart = new Chart(this.ctxGradient, this.gradientConfig);
  }

}
function getGradient(ctx: any, chartArea: any) {
  const gradentBg = ctx.createLinearGradient(1, chartArea.top, 1, chartArea.bottom);
  gradentBg.addColorStop(0  , "skyblue");
  gradentBg.addColorStop(1, "darkblue");

  return gradentBg;

}