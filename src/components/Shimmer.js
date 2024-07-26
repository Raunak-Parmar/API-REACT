import React from 'react'
import './Shimmer.css'
function Shimmer() {

    // const raunak = new Array(10).fill('')
    // console.log(raunak)

    const Doingmap = Array.from({length:50}).map((el,i) =>{
       return  (<div key={i} className="country-card shimmer-card"></div>) 
    }
)
  return (
    <div className = 'countries-container'>
        <div className="country-card shimmer-card"></div>
        {
            Doingmap
        }

    </div>
  )
}

export default Shimmer