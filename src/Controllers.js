const categories = ['break-fast', 'snack', 'ice-cream', 'juice'];
let menu = [];
let orders = [];
let idMap = {};

// Menu Operations
const addMenuItem = (req, res) => {
    const { name, price, category } = req.body;

    if (price > 0 && categories.includes(category)) {
        for (let item of menu) {
            if (item.name === name && item.category === category) {
                item.price = price;
                return res.status(200).json({ status: "success", data: `Menu updated: price of ${name} changed to ${price}` });
            }
        }
        menu.push({ name, category, price });
        return res.status(200).json({ status: "success", data: `${name} successfully added to the menu` });
    } else {
        return res.status(400).json({ status: "error", error: "Invalid input for the menu" });
    }
};

const getMenuItems = (req, res) => {
    if (menu.length === 0) {
        return res.json({ status: "success", data: "No items in the menu" });
    }
    res.json({ status: "success", data: menu });
};

// Order Operations
const placeOrder = (req, res) => {
    let order = req.body.order;

    // Check if all items are available in the menu
    for (let item of order) {
        let x = menu.find(menuItem => menuItem.name === item.name);
        if (!x) {
            return res.status(400).json({ status: "error", error: `${item.name} does not exist in the menu` });
        }
    }

    // Create the order object
    order = {
        items: order,
        id: getId(),
        status: "Preparing",
        preparedBy: Date.now() + getRandTime(1, 2),
        deliveredBy: Date.now() + getRandTime(2, 4)
    };

    orders.push(order);

    res.json({
        status: "success",
        data: `Your order has been placed successfully. ${order.id} is your order-ID. It will be prepared by ${new Date(order.preparedBy).toLocaleString()} and delivered by ${new Date(order.deliveredBy).toLocaleString()}. Thank you for ordering.`
    });
};

const getOrderDetails = (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(item => item.id === id);

    if (order === undefined) {
        return res.status(400).json({ status: "error", error: "Invalid order ID" });
    }

    order.preparedBy = new Date(order.preparedBy).toLocaleString();
    order.deliveredBy = new Date(order.deliveredBy).toLocaleString();

    res.json({ status: "success", data: order });
};

// Utility Functions
const getId = () => {
    while (true) {
        let id = Math.floor(Math.random() * 1000);
        if (!idMap[id]) {
            idMap[id] = 1;
            return id;
        }
    }
};

const getRandTime = (min, max) => {
    return (Math.floor(Math.random() * (max - min)) + min) * 60 * 1000;
};

module.exports = {
    addMenuItem,
    getMenuItems,
    placeOrder,
    getOrderDetails,
    orders
};
