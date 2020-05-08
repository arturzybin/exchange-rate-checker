import React from 'react'

interface IProps {
   base: string,
   currency: string,
   rate: number | null
}

export const Title: React.FC<IProps> = ({ base, currency, rate }) => (
   <div className="title">
      <h2 className="title__small">1 {base} equals</h2>
      <h1 className="title__big">{rate} {currency}</h1>
   </div>
)