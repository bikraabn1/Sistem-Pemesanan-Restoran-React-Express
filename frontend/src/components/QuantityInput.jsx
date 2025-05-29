import React from 'react'

const QuantityInput = (props) => {
    return (
        <div className='flex gap-3 justify-center items-center'>
            <button className='bg-[#3e150a] w-8 h-8 rounded-full cursor-pointer' type='button' onClick={props.onDecrease}> - </button>
            <span>{props.quantity}</span>
            <button className='bg-[#3e150a] w-8 h-8 rounded-full cursor-pointer' type='button' onClick={props.onIncrease}> + </button>
        </div>
    )
}

export default QuantityInput
