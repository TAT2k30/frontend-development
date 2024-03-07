import React, { useEffect, useState } from 'react';
import './Order.scss';
import axios from 'axios';
import { baseUrl } from '../../../Assets/Data/baseUrl';

function Order(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await axios.get(`${baseUrl}/Order`);
                // Định dạng lại ngày tháng trước khi hiển thị
                const formattedOrders = result.data.data.$values.map(order => ({
                    ...order,
                    orderDate: new Date(order.orderDate).toLocaleDateString('en-US')
                }));
                setOrders(formattedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Order ne</h1>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Total Amount</th>
                        <th>Shipping Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.shippingAddress}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;
