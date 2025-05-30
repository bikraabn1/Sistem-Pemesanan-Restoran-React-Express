import React from 'react'

const History = (props) => {
    const history = localStorage.getItem('history')
    const parsedHistory = JSON.parse(history)
    console.log(parsedHistory)

    return (
        <div className={`fixed w-screen inset-0 h-screen bg-black/70 z-50 text-white ${props.show ? '' : 'hidden'}`}>
            <button className='fixed right-0 top-0 m-5 cursor-pointer px-2' onClick={() => props.onClose()}>x</button>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80%]  w-[60%] p-5 rounded-lg bg-[#521C0D] overflow-scroll flex flex-col'>
                <h2 className='text-center text-lg lg:text-3xl mb-5'>Riwayat Pesanan</h2>
                {
                    parsedHistory.map((orders) => {
                        return (
                            <div className='border w-full p-3 rounded-md mb-3'>
                                <h3 className='mb-3'>{orders.message}</h3>
                                {
                                    orders.order.map(item => {
                                        return (
                                            <p className='w-full flex justify-between text-sm opacity-80'>
                                                <span>{item.name}</span>
                                                <span>{item.quantity}</span>
                                            </p>
                                        )
                                    })
                                }
                                <h3 className='mt-3 w-full flex justify-between'>
                                    <span>Total</span>
                                    <span>{orders.totalAfterTax}</span>
                                </h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default History

// ${props.show ? '' : 'hidden'}