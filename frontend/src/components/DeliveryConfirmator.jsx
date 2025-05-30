import React from 'react'
import QuantityInput from './QuantityInput'
import { handleAddOrderItem } from '../api/orders-api'

const DeliveryConfirmator = (props) => {
    const order = props.order

    const filteredOrder = order.filter(item => item.quantity !== 0)

    const handleDelivery = async (e) => {
        e.preventDefault()
        try{
            const res = await handleAddOrderItem(filteredOrder)
            props.clearOrder()
            props.onClose()
            props.handleDeliverySuccess(res)

        }catch(e){
            console.error("Error during delivery:", e);
        }
    }
    
    return (
        <div className='fixed w-screen inset-0 h-screen bg-black/70 z-50 text-white'>
            <button className='fixed right-0 top-0 m-5 cursor-pointer px-2' onClick={() => props.onClose()}>x</button>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[40%] sm:h-[60%]  w-[60%] p-5 rounded-lg bg-[#521C0D] overflow-scroll'>
                <form onSubmit={handleDelivery} className='h-full flex flex-col relative'>
                    <h2 className='text-center text-2xl mb-3'>Daftar Pesanan</h2>
                    <div className='flex flex-col gap-3 mb-5'>
                        {
                            order.map(item => {
                                return (
                                    <div className='border w-full p-2 rounded-sm flex justify-between' key={item.id}>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <h3 className='text-sm opacity-80'>Rp.{item.price}</h3>
                                        </div>
                                        <QuantityInput quantity={item.quantity} onIncrease={() => props.onIncrease(item.id)} onDecrease={() => props.onDecrease(item.id)} />
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className='mt-auto w-full border-t p-3 flex flex-col'>
                        {
                            props.getDiscount ? (
                                <>
                                    <h3 className='flex justify-between'>
                                        <span>Subtotal</span>
                                        <span>Rp.{props.subTotal}</span>
                                    </h3>
                                    <h3 className='flex justify-between'>
                                        <span>Diskon Pembelanjaan lebih dari Rp.50000 (10%)</span>
                                        <span>-Rp.{props.discount}</span>
                                    </h3>
                                    <h3 className='flex justify-between'>
                                        <span>Harga Sebelum Pajak</span>
                                        <span>Rp.{props.totalBeforeTax}</span>
                                    </h3>
                                    <h3 className='flex justify-between'>
                                        <span>Pajak (10%)</span>
                                        <span>Rp.{props.tax}</span>
                                    </h3>
                                    <h3 className='flex justify-between'>
                                        <span>Total </span>
                                        <span>Rp.{props.total}</span>
                                    </h3>
                                </>
                            ) : (
                                <>
                                    <h3 className='flex justify-between'>
                                        <span>Harga Sebelum Pajak</span>
                                        <span>Rp.{props.totalBeforeTax}</span>
                                    </h3>
                                    <h3 className='flex justify-between'>
                                        <span>Pajak (10%) </span>
                                        <span>Rp.{props.tax}</span>
                                    </h3>
                                    <h3 className='flex justify-between'>
                                        <span>Total </span>
                                        <span>Rp.{props.total}</span>
                                    </h3>
                                </>
                            )
                        }
                        <button type='submit' className='text-white bg-[#3e150a] mt-3 ml-auto px-6 py-2 rounded-full cursor-pointer hover:opacity-80 transition-all ease-in-out duration-150'>Kirim Pesanan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeliveryConfirmator
