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
      setBaseValue( value )
      setCurrencyValue( validateInput( (+value * rate).toString()) )
   }

   function handleCurrencyChange(event: React.FormEvent<HTMLInputElement>): void {
      const value = validateInput(event.currentTarget.value)
      setCurrencyValue( value )
      setBaseValue( validateInput( (+value / rate).toString()) )
   }

   return (
      <div className="calculator">
         <input
            className="calculator__base"
            value={baseValue}
            onChange={handleBaseChange}
            type="text"
         />
         <input
            className="calculator__currency"
            value={currencyValue}
            onChange={handleCurrencyChange}
            type="text"
         />
      </div>
   )
}


function validateInput(input: string): string {
   if (!input) return ''

   if (input[input.length - 1] === '.' || input[input.length - 1] === ',') {
      return input
   }

   let value = parseFloat(input).toString()
   if (value === 'NaN' || value === 'Infinity') {
      value = ''
   }

   if (value.indexOf('.') !== -1 && value.length - 1 - value.indexOf('.') > 5) {
      value = value.slice(0, value.indexOf('.') + 6)
   }

   return value
}