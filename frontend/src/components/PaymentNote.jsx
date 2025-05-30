import React, { useRef } from 'react'
import { GoDownload } from 'react-icons/go'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { IoCheckmarkCircle } from 'react-icons/io5'

const PaymentNote = (props) => {
    const discount = props.discount || 0
    const contentRef = useRef(null)
    
    const handleDownload = async () => {
        const element = contentRef.current
        
        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#521C0D',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                height: element.scrollHeight,
                width: element.scrollWidth
            })
            
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            })
            
            const imgWidth = 210
            const pageHeight = 295
            const imgHeight = (canvas.height * imgWidth) / canvas.width
            let heightLeft = imgHeight
            let position = 0
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight
                pdf.addPage()
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
                heightLeft -= pageHeight
            }
            
            pdf.save('invoice.pdf')
        } catch (error) {
            console.error('Error generating PDF:', error)
        }
    }
    return (
        <div className={`fixed w-screen inset-0 h-screen bg-black/70 z-50 text-white ${props.show ? '' : 'hidden'}`}>
            <button className='fixed right-0 top-0 m-5 cursor-pointer px-2' onClick={() => props.onClose()}>x</button>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80%]  w-[60%] p-5 rounded-lg bg-[#521C0D] overflow-scroll flex flex-col' ref={contentRef}>
                <h2 className='text-center text-lg lg:text-3xl'>{props.message}</h2>
                <h3 className='flex justify-center py-5 my-3 text-6xl border-t border-b'><IoCheckmarkCircle /></h3>
                <div className='mb-5 pb-5 border-b flex flex-col gap-2'>
                    <h3 className='font-semibold'>Pembelian</h3>
                    {
                        props.order.map(order => {
                            return (
                                <p className='w-full flex justify-between text-sm' key={order.id}>
                                    <span>{order.name}</span>
                                    <span>{order.quantity}</span>
                                </p>
                            )
                        })
                    }

                </div>
                <div className='mb-5 pb-5 border-b flex flex-col gap-2'>
                    <h3 className='font-semibold'>Detail Harga</h3>
                    <p className='w-full flex justify-between text-sm'>
                        <span>Subtotal</span>
                        <span>Rp.{props.subtotal}</span>
                    </p>
                    {
                        discount > 0 && (
                            <>
                                <p className='w-full flex justify-between text-sm'>
                                    <span>Discount Pembelanjaan lebih dari Rp50000(10%)</span>
                                    <span>-Rp.{props.discount}</span>
                                </p>
                                <p className='w-full flex justify-between text-sm'>
                                    <span>Harga Sebelum Pajak</span>
                                    <span>Rp.{props.totalBeforeTax}</span>
                                </p>
                            </>
                        )
                    }
                    <p className='w-full flex justify-between text-sm'>
                        <span>Pajak(10%)</span>
                        <span>Rp.{props.tax}</span>
                    </p>
                </div>
                <h3 className='flex justify-between text-sm font-semibold mb-5'>
                    <span>Total</span>
                    <span>Rp.{props.total}</span>
                </h3>
                <div className='w-full mt-auto flex'>
                    <button className='text-sm ml-auto bg-[#3e150a] py-2 px-6 rounded-full flex gap-2 items-center hover:opacity-80 transition-all ease-in-out duration-150 cursor-pointer' onClick={handleDownload}>
                        <span><GoDownload /></span>
                        <span>Unduh Invoice</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentNote
