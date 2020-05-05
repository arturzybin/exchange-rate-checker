import React, { useState, useEffect } from 'react'


export const Calculator: React.FC<{ rate: number }> = ({ rate }) => {
   const [baseValue, setBaseValue] = useState<string>('1')
   const [currencyValue, setCurrencyValue] = useState<string>('')

   useEffect(() => {
      if (!rate) return
      setBaseValue('1')
      setCurrencyValue((1 * rate).toString())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [rate])

   function handleBaseChange(event: React.FormEvent<HTMLInputElement>): void {
      const value = validateInput(event.currentTarget.value)
      setBaseValue(value)
      setCurrencyValue(validateInput((+value * rate).toString()))
   }

   function handleCurrencyChange(event: React.FormEvent<HTMLInputElement>): void {
      const value = validateInput(event.currentTarget.value)
      setCurrencyValue(value)
      setBaseValue(validateInput((+value / rate).toString()))
   }

   return (
      <tr className="calculator">
         <td>
            <input
               className="calculator__base"
               value={baseValue}
               onChange={handleBaseChange}
               type="text"
               autoFocus
            />
         </td>
         <td>
            <input
               className="calculator__currency"
               value={currencyValue}
               onChange={handleCurrencyChange}
               type="text"
            />
         </td>
      </tr>
   )
}


function validateInput(input: string): string {
   if (!isNaN(+input.slice(0, input.length - 1)) && input[input.length - 1] === 'e') {
      return input
   }

   while (isNaN(+input)) {
      input = input.slice(0, input.length - 1)
   }

   return input
}