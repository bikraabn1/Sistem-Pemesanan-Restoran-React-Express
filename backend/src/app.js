const express = require('express')
const cors = require('cors')
const menus = require('./menus.json')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/menus', (req, res) => {
    res.json(menus)
})

app.use(express.json())

app.post('/orders', (req, res) => {
    const { items } = req.body

    console.log(items)

    if(!items){
        res.status(400).send('Customer dan id menu harus di isi')
    }

    let subTotal = 0
    items.forEach(item => {
        subTotal += item.price * item.quantity
    });

    const getDiscount = subTotal > 50000
    const discount = subTotal * 0.1
    const total = getDiscount ? subTotal - discount : subTotal
    const tax = total * 0.1
    const totalAfterTax = total + tax

    getDiscount ?
        res.json({
            message : "Pengiriman Berhasil!!",
            order: items,
            subTotal,
            discount,
            total,
            tax,
            totalAfterTax
        }):
        res.json({
            message : "Pengiriman Berhasil!!",
            order: items,
            subTotal,
            total,
            tax,
            totalAfterTax
        })
})

app.listen(port)