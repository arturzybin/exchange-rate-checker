import React, { useEffect } from 'react'
import Chart from 'chart.js'


interface IProps {
   currencyData: number[],
   base: string,
   currency: string
}

export const CurrencyChart: React.FC<IProps> = ({ base, currency, currencyData }) => {
   useEffect(() => {
      const months: string[] = []

      for (let i = 6; i >=0; i--) {
         const date = new Date();
         date.setMonth(date.getMonth() - i)
         months.push(date.toLocaleString('default', { month: 'long' }))
      }

      drawChart(base, currency, currencyData, months)
   }, [base, currency, currencyData])

   return (
      <canvas id="chart" className="chart"></canvas>
   )
}


function drawChart(base: string, currency: string, currencyData: number[], months: string[]) {
   const canvas: any = document.getElementById('chart')
   if (!canvas) return

   new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
         labels: months,
         datasets: [{
            label: `${currency} in ${base}`,
            data: currencyData,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderColor: '#4E4E4E',
            borderWidth: 3
         }]
      }
   })
}