import React, { useEffect } from 'react'
import { ICurrenciesNames } from '../typescript-types'

interface IProps {
   currenciesNames: ICurrenciesNames | undefined
   base: string,
   currency: string,
   handleBaseChange: (event: React.FormEvent<HTMLSelectElement>) => void,
   handleCurrencyChange: (newCevent: React.FormEvent<HTMLSelectElement>) => void
}

export const Select: React.FC<IProps> = ({ currenciesNames, base, currency, handleBaseChange, handleCurrencyChange }) => {
   useEffect(() => {
      if (!currenciesNames) return

      const baseSelect = document.querySelector('.select__base')
      const currencySelect = document.querySelector('.select__currency')

      // sorting by full name
      const currenciesNamesArray = Object.entries(currenciesNames).sort((a, b) => a[1] > b[1] ? 1: -1)

      currenciesNamesArray.forEach( ([shortName, fullName]) => {
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

         // baseSelect?.append(baseOption) <== paid api version required
         currencySelect?.append(currencyOption)
      })

      const baseOption = document.createElement('option')
      baseOption.value = base
      baseOption.textContent = currenciesNames[base]
      baseSelect?.append(baseOption)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currenciesNames])


   return (
      <tr className="select">
         <td><select className="select__base" onChange={handleBaseChange}></select></td>
         <td><select className="select__currency" onChange={handleCurrencyChange}></select></td>
      </tr>
   )
}