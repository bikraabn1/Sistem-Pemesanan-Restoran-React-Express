import React from 'react'

const Card = (props) => {
    return (
        <div className='p-3 rounded-3xl flex flex-col gap-2 shadow hover:shadow-2xl transition-all duration-150 ease-in-out'>
            <div className='rounded-xl overflow-hidden h-40 object-cover'>
                <img className='w-full h-full' src={props.imgUrl}/>
            </div>
            <h3 className='font-semibold'>{props.name}</h3>
            <p>Rp.{props.price}</p>
            <button onClick={props.handleAdd} className='w-full border border-[#521C0D] text-[#521C0D] hover:bg-[#521C0D] hover:text-white transition-all duration-150 ease-in-out mt-auto cursor-pointer py-2 rounded-full'>Tambah</button>
        </div>
    )
}

export default Card
