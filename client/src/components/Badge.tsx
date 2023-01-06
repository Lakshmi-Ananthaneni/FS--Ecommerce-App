import React from 'react'

import { Productprops, Products } from 'types'

export const Badge = ({product}: Productprops) => {
  const {sold, quantity}= product;
  return (
    <div>
      <span className='badge1'>{sold} sold</span>
      <span className='badge2'>{sold === quantity ? "Out of stock":`${quantity-sold}in stock` }</span>
    </div>
  )
}
