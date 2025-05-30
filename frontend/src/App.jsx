import Card from "./components/Card"
import { MenuContext } from "./lib/MenuContext"
import { useContext, useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Basket from "./components/Basket"
import DeliveryConfirmator from "./components/DeliveryConfirmator"
import PaymentNote from "./components/PaymentNote"

function App() {
  const { foods, drinks } = useContext(MenuContext)
  const [order, setOrder] = useState([])
  const [getDiscount, setGetDiscount] = useState(false)
  const [onPay, setOnPay] = useState(false)
  const [paymentNoteData, setPaymentNoteData] = useState(null)
  const [showPaymentNote, setShowPaymentNote] = useState(false)

  const addToOrder = (item) => {
    setOrder(prevOrder => {
      return prevOrder.some(prev => prev.id === item.id)
        ? prevOrder.map(prev =>
          prev.id === item.id
            ? { ...prev, quantity: prev.quantity + 1 }
            : prev
        )
        :
        [...prevOrder, { ...item, quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setOrder(prevOrder => {
      return prevOrder.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    })
  }

  const decreaseQuantity = (id) => {
    setOrder(prevOrder => {
      return prevOrder.map(item =>
        item.id === id ? { ...item, quantity: item.quantity <= 0 ? 0 : item.quantity - 1 } : item
      )
    })
  }

  const handleOnPay = () => {
    setOnPay(!onPay)
  }

  const clearOrder = () => {
    setOrder([])
  }

  const handleDeliverySuccess = (responseData) => {
    setPaymentNoteData(responseData)
    setShowPaymentNote(true)
  }

  const subTotal = order.reduce((total, item) => {
    const product = [...foods, ...drinks].find(p => p.id === item.id)
    return product ? total + (product.price * item.quantity) : total
  }, 0)

  const discount = subTotal * 0.1
  const totalPrice = getDiscount ? subTotal - discount : subTotal
  const tax = totalPrice * 0.1
  const totalAfterTax = totalPrice + tax

  useEffect(() => {
    setGetDiscount(subTotal > 50000)
  }, [subTotal])

  return (
    <div className='min-h-screen grid grid-cols-12 grid-rows-[auto_1fr] font-playfairdisplay'>
      <Navbar />

      <div className="col-span-10 col-start-2">
        <h2 className="text-2xl font-bold my-5">Makanan</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            foods.map(item => {
              return (
                <Card
                  key={item.id}
                  imgUrl={item.imageurl}
                  name={item.name}
                  price={item.price}
                  handleAdd={() => addToOrder(item)}
                />
              )
            })
          }
        </div>
      </div>

      <div className="col-span-10 col-start-2 mb-36">
        <h2 className="text-2xl font-bold my-5">Minuman</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            drinks.map(item => {
              return (
                <Card
                  key={item.id}
                  imgUrl={item.imageurl}
                  name={item.name}
                  price={item.price}
                  handleAdd={() => addToOrder(item)}
                />
              )
            })
          }
        </div>
      </div>

      {
        (order.length > 0 && totalPrice > 0 )&& (
          <Basket total={totalPrice} onPay={() => handleOnPay()} />
        )
      }

      {
        onPay && <DeliveryConfirmator
          order={order}
          onClose={handleOnPay}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          clearOrder={clearOrder}
          totalBeforeTax={totalPrice}
          total={totalAfterTax}
          discount={discount}
          getDiscount={getDiscount}
          tax={tax}
          subTotal={subTotal} 
          handleDeliverySuccess={handleDeliverySuccess}
          />
      }

      {
        showPaymentNote && <PaymentNote 
          message={paymentNoteData.message}
          order={paymentNoteData.order}
          subtotal={paymentNoteData.subTotal}
          discount={paymentNoteData.discount}
          tax={paymentNoteData.tax}
          total={paymentNoteData.totalAfterTax}
          totalBeforeTax={paymentNoteData.total}
          show={showPaymentNote}
          onClose={() => setShowPaymentNote(false)}
        />
      }
    </div>
  )
}

export default App
