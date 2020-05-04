import React, { useState, useEffect } from 'react';
import { TCurrencies } from './typescript-types';

import { CurrencyChart } from './components/CurrencyChart';


export const App: React.FC = () => {
   const [currencies, setCurrencies] = useState<TCurrencies>()
   const [base, setFirstCurrency] = useState<string>('USD')
   const [currency, setSecondCurrency] = useState<string>('RUB')
   const [currencyData, setSecondCurrencyData] = useState<number[]>()


   useEffect(() => {
      fetchCurrencies().then(setCurrencies)
   }, [])

   useEffect(() => {
      fetchCurrencyData(base, currency)
         .then(setSecondCurrencyData)
   }, [base, currency])


   let baseFullName = base
   let currencyFullName = currency
   if (currencies) {
      baseFullName = (currencies as {[key: string]: any} )[base]
      currencyFullName = (currencies as {[key: string]: any} )[currency]
   }

   return (
      <div className="app">
         <CurrencyChart
            data={currencyData as number[]}
            base={baseFullName}
            currency={currencyFullName}
         />
      </div>
   );
}



async function fetchCurrencies() {
   let data: TCurrencies

   const response = await fetch('https://openexchangerates.org/api/currencies.json')
   if (!response.ok) {
      console.error('Error loading currencies')
   }
   data = await response.json()

   return data
}


async function fetchCurrencyData(base: string, currency: string) {
   const currencyData: number[] = []

   const fetchPromises = getFetchCurrencyDataPromises(base, currency)

   await Promise.all(fetchPromises).then((responsesData) => {
      responsesData.forEach((data) => currencyData.push(data.rates[currency]))
   })

   return currencyData
}


function getFetchCurrencyDataPromises(base: string, currency: string): Promise<any>[] {
   const fetchPromises = [] as Promise<any>[]

   for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() - i)
      const date = currentDate.toJSON().slice(0, 10)

      const url = new URL('https://openexchangerates.org/api/historical/' + date + '.json')
      url.searchParams.set('app_id', '814335798c7149bfb3caad3be6e1acb2')
      url.searchParams.set('base', base)
      url.searchParams.set('symbols', currency)

      fetchPromises.push(
         fetch(url.toString()).then((response) => {
            if (!response.ok) {
               console.error('Error loading currency data')
            }
            return response.json()
         })
      )
   }

   return fetchPromises
}