import React, { useState, useEffect } from 'react';
import { ICurrenciesNames } from './typescript-types';

import './scss/style.scss';

import { CurrencyChart } from './components/CurrencyChart';
import { Title } from './components/Title';
import { Calculator } from './components/Calculator';
import { Select } from './components/Select';


export const App: React.FC = () => {
   const [currenciesNames, setCurrencies] = useState<ICurrenciesNames>()
   const [base, setBase] = useState<string>('USD')
   const [currency, setCurrency] = useState<string>('RUB')
   const [currencyData, setCurrencyData] = useState<number[]>()


   useEffect(() => {
      fetchCurrenciesNames().then(setCurrencies)
   }, [])

   useEffect(() => {
      fetchCurrencyData(base, currency)
         .then(setCurrencyData)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   async function handleBaseChange(event: React.FormEvent<HTMLSelectElement>) {
      const newBase = event.currentTarget.value

      const data = await fetchCurrencyData(newBase, currency)
      setCurrencyData(data)

      setBase(newBase)
      if (newBase === currency) {
         setCurrency(base)
      }
   }
   async function handleCurrencyChange(event: React.FormEvent<HTMLSelectElement>) {
      const newCurrency = event.currentTarget.value

      const data = await fetchCurrencyData(base, newCurrency)
      setCurrencyData(data)

      setCurrency(newCurrency)
      // paid api version required
      // if (newCurrency === base) {
      //    setBase(currency)
      // }
   }


   const baseFullName = currenciesNames ? currenciesNames[base] : base
   const currencyFullName = currenciesNames ? currenciesNames[currency] : currency

   const currentRate = currencyData ? currencyData[currencyData.length - 1] : null

   return (
      <div className="app">
         <div className="content">
            <Title
               base={baseFullName}
               currency={currencyFullName}
               rate={currentRate}
            />
            <table><tbody>
               <Calculator rate={currentRate as number} />
               <Select
                  currenciesNames={currenciesNames}
                  base={base}
                  currency={currency}
                  handleBaseChange={handleBaseChange}
                  handleCurrencyChange={handleCurrencyChange}
               />
            </tbody></table>
         </div>
         <CurrencyChart
            currencyData={currencyData as number[]}
            base={baseFullName}
            currency={currencyFullName}
         />
      </div>
   );
}



async function fetchCurrenciesNames(): Promise<ICurrenciesNames> {
   let data: ICurrenciesNames

   const response = await fetch('https://openexchangerates.org/api/currencies.json')
   if (!response.ok) {
      console.error('Error loading currencies names')
   }
   data = await response.json()

   return data
}


async function fetchCurrencyData(base: string, currency: string): Promise<number[]> {
   const currencyData: number[] = []

   const fetchPromises = getFetchCurrencyDataPromises(base, currency)

   await Promise.all(fetchPromises).then((responsesData) => {
      responsesData.forEach((data) => currencyData.push(data.rates[currency]))
   })

   return currencyData.reverse()
}


function getFetchCurrencyDataPromises(base: string, currency: string): Promise<any>[] {
   const fetchPromises = [] as Promise<any>[]

   for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() - i)
      const date = currentDate.toJSON().slice(0, 10)

      const url = new URL('https://openexchangerates.org/api/historical/' + date + '.json')
      url.searchParams.set('app_id', 'e785e47f3cc94b4bbcf8ec131d31a076')
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