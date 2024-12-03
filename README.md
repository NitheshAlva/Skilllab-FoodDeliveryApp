# Food Ordering API

This is a simple RESTful API for managing a food ordering system. It supports operations to manage the menu, place orders, and track order statuses. The API is built with **Express** and **Node.js**, and it uses a cron job to update the order statuses (e.g., "Preparing", "Out for Delivery", "Delivered").

## Features

- **Menu Management**: Add or update food items in the menu.
- **Order Management**: Place orders, view order details, and track order statuses.
- **Order Status Updates**: The system automatically updates the order status based on the prepared and delivery times using a cron job.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: In-memory storage (Menu and Orders)
- **Cron Jobs**: `node-cron`
- **Postman**: API testing with the provided Postman collection.

## Installation

### Prerequisites

- **Node.js** (>= 14.x)
- **npm** (Node Package Manager)

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/NitheshAlva/Skilllab-FoodDeliveryApp.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd Skilllab-FoodDeliveryApp
npm install
```

### 3. Run the Application

Start the server:

```bash
npm start
```

The API will be available at [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Menu Endpoints

- **POST `/menu`**: Add or update a food item in the menu.
  - Request body (JSON):
    ```json
    {
      "name": "Pizza",
      "price": 12.99,
      "category": "break-fast"
    }
    ```
  - Returns a success message if the item is added or updated.

- **GET `/menu`**: Get the list of all menu items.
  - Returns the list of items available in the menu.

### Order Endpoints

- **POST `/orders`**: Place a new order.
  - Request body (JSON):
    ```json
    {
      "order": [
        { "name": "Lime Soda", "quantity": 1 },
        { "name": "Ice-cream", "quantity": 2 }
      ]
    }
    ```
  - This body allows you to place an order with specific items and quantities.
  - Returns the order details along with estimated preparation and delivery times.

- **GET `/orders/:id`**: Get the details of a specific order.
  - Request parameter: `id` (Order ID)
  - Returns the order details, including the current status.

### Cron Job

The system automatically updates the status of orders every minute using a cron job. The possible order statuses are:

- **Preparing**: The order is in preparation.
- **Out for Delivery**: The order is on its way to the customer.
- **Delivered**: The order has been delivered to the customer.

## Postman Collection

You can use the [Postman Collection](https://api.postman.com/collections/36576434-a603dfeb-94ab-4443-b4a0-9ea5e047d741?access_key=PMAT-01JE6HD5J3GJDGC67Z8FFG0XEV) to interact with the API. Import the collection into Postman and make requests to test the functionality.

### How to Use Postman Collection:

1. Open [Postman](https://www.postman.com/) and log in if necessary.
2. Click on the **Import** button and paste the provided **Postman Collection Link** in the `Link` tab.
3. Import the collection.
4. Make requests to the API (e.g., Add Menu, Place Order, Get Order Details) using the Postman UI.

### Example Postman Requests:

- **Add a Menu Item**:
  - URL: `POST /menu`
  - Body (JSON):
    ```json
    {
      "name": "Burger",
      "price": 8.99,
      "category": "snack"
    }
    ```

- **Place an Order**:
  - URL: `POST /orders`
  - Body (JSON):
    ```json
    {
      "order": [
        { "name": "Lime Soda", "quantity": 1 },
        { "name": "Ice-cream", "quantity": 2 }
      ]
    }
    ```

- **Get Order Details**:
  - URL: `GET /orders/{order_id}`

## Cron Job Behavior

- **Status Update**: The cron job runs every minute to check the current time and update the status of the orders:
  - If the `deliveredBy` time has passed, the order status will be updated to `"Delivered"`.
  - If the `preparedBy` time has passed but `deliveredBy` has not yet passed, the order status will be updated to `"Out for Delivery"`.
  - Otherwise, the status remains `"Preparing"`.

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request.

### Steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
