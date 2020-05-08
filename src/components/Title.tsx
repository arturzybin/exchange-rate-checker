import React from 'react'

interface IProps {
   base: string,
   currency: string,
   rate: number | null
}

export const Title: React.FC<IProps> = ({ base, currency, rate }) => (
   <>
      <div className="subtitle">1 {base} equals</div>
      <div className="title">{rate} {currency}</div>
   </>
)