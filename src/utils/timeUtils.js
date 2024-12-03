const { orders } = require('../Controllers.js');

const updateOrderStatuses = () => {
    const time = Date.now();
    console.log(`Current Time: ${new Date(time).toLocaleString()}, Orders: ${orders.length}`);

    for (let order of orders) {
        const deliveredByTime = new Date(order.deliveredBy).getTime();
        const preparedByTime = new Date(order.preparedBy).getTime();

        console.log(`Checking Order ID: ${order.id}, Current Status: ${order.status}`);

        // Strict status progression logic
        if (time >= deliveredByTime && order.status !== "Delivered") {
            console.log(`Order ID ${order.id} transitioned to Delivered`);
            order.status = "Delivered";
        } else if (time >= preparedByTime && time < deliveredByTime && order.status !== "Out for Delivery") {
            console.log(`Order ID ${order.id} transitioned to Out for Delivery`);
            order.status = "Out for Delivery";
        }
    }
};

module.exports = { updateOrderStatuses };