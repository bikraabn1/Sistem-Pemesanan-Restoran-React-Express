import React from 'react'
import { SlBasket } from "react-icons/sl"

const Basket = (props) => {

  return (
    <div className="fixed bottom-0 bg-white flex justify-center items-center w-screen h-[10vh]">
      <button className='bg-[#521C0D] sm:w-full lg:w-[40%] px-3 py-2 rounded-full cursor-pointer text-white flex justify-between items-center' onClick={props.onPay}>
        <span><SlBasket /></span>
        <span>Total Pesanan : {props.total}</span>
      </button>
    </div>
  )
}

export default Basket
