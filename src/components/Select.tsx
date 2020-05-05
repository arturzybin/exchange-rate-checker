import React, { useEffect } from 'react'
import { TCurrencies } from '../typescript-types'

interface IProps {
   currencies: TCurrencies
   base: string,
   currency: string,
   handleBaseChange: (event: React.FormEvent<HTMLSelectElement>) => void,
   handleCurrencyChange: (newCevent: React.FormEvent<HTMLSelectElement>) => void
}

export const Select: React.FC<IProps> = ({ currencies, base, currency, handleBaseChange, handleCurrencyChange }) => {
   useEffect(() => {
      if (!currencies) return

      const baseSelect = document.querySelector('.select__base')
      const currencySelect = document.querySelector('.select__currency')

      const currenciesArray = Object.entries(currencies).sort((a, b) => a[1] > b[1] ? 1: -1)

      currenciesArray.forEach( ([shortName, fullName]) => {
         const baseOption = document.createElement('option')
         baseOption.value = shortName
         baseOption.textContent = fullName.toString()
         const currencyOption = baseOption.cloneNode(true) as HTMLOptionElement

         if (base === shortName) {
            baseOption.selected = true
         }
         if (currency === shortName) {
            currencyOption.selected = true
         }
         //paid api version required
         //baseSelect?.append(baseOption)
         currencySelect?.append(currencyOption)
      })

      const baseOption = document.createElement('option')
      baseOption.value = base
      baseOption.textContent = (currencies as { [key: string]: any })[base]
      baseSelect?.append(baseOption)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currencies])


   return (
      <tr className="select">
         <td><select className="select__base" onChange={handleBaseChange}></select></td>
         <td><select className="select__currency" onChange={handleCurrencyChange}></select></td>
      </tr>
   )
}