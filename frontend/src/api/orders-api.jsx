export const handleAddOrderItem = async (orders) => {
    
    try{
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items : orders
            })
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const history = JSON.parse(localStorage.getItem("history")) || [];
        history.push(data);
        localStorage.setItem("history", JSON.stringify(history));

        return data
    }catch(err){
        console.error("Error adding order item:", err);
        throw err;
    }
}