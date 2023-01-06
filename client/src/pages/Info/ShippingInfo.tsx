import React from 'react'

export const ShippingInfo = () => {
  return (
    <main className='info'>
        <div><h3>Shipping Info</h3></div>
        <div>
            <p><b>Shipping Method:</b> Standard Shipping</p>
            <p>
            If your package has not been delivered or your tracking information shows that your package has been delivered but you have not received it, 
            you must contact Customer Service to verify within 45 days of the order date.
         For other orders, products, and logistics related issues, you must contact customer service within 90 days of the order date.
        * Please click the "Confirm Delivery" button within 6 months (from the date of shipment). 
         After that, the button will turn gray and cannot be used to get additional points.
        In most cases, the package will be delivered within the estimated time of arrival. 
        However, the actual delivery date may be affected by flight arrangements, weather conditions and other external factors. Please refer to the tracking information for the most accurate delivery date.
            </p>
        
        </div>
    </main>
  )
}
