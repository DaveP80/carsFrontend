import React from 'react'
import "./Car.css"

function Animation() {
  return (
    <div className="container pb-3">
  <div className="carAnimation shadow-lg">
    <div className="road"></div>
    <div className="car">
      <div className="colour"></div>
      <div className="windows"></div>
      <div className="leftWheel">
        <div className="wheel"></div>
      </div>
      <div className="rightWheel">
        <div className="wheel"></div>
      </div>
    </div>
    <div className="clouds"></div>
  </div>
</div>
  )
}

export default Animation