import React, { useEffect, useState } from 'react'
import Chart from 'chart.js'


interface IProps {
   currencyData: number[],
   base: string,
   currency: string
}

export const CurrencyChart: React.FC<IProps> = ({ base, currency, currencyData }) => {
   const [chart, setChart] = useState<Chart>()

   useEffect(() => {
      window.onresize = () => chart?.resize()
   })

   useEffect(() => {
      chart?.destroy()
      setChart( drawChart(base, currency, currencyData) )
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [base, currency, currencyData])

   return (
      <div className="chart">
         <canvas id="chart"></canvas>
      </div>
   )
}


function drawChart(base: string, currency: string, currencyData: number[]) {
   const canvas: any = document.getElementById('chart')
   if (!canvas) return

   const months: string[] = []
   for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i)
      months.push(date.toLocaleString('default', { month: 'long' }))
   }

   return new Chart(canvas.getContext('2d'), {
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