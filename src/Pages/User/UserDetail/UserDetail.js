import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import "./UserDetail.scss";
import { DataContext } from '../../../Assets/Data/DataContext';
import axios from 'axios';
import { baseUrl } from '../../../Assets/Data/baseUrl';

function UserDetail() {
  const tokenLocal = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/User/${token.UserId}`);
        setUserDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
      setLoading(false);
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Order/${token.UserId}`);
        // Định dạng lại ngày tháng trước khi hiển thị
        const formattedOrders = response.data.data.$values.map(order => ({
          ...order,
          orderDate: new Date(order.orderDate).toLocaleDateString('en-US')
        }));
        setOrders(formattedOrders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    if (tokenLocal === null) {
      const customData = { message: "You must log in first", type: "error" };
      navigate("/", { state: customData });
    } else {
      fetchData();
      fetchOrders();
    }
  }, [tokenLocal, token.UserId, navigate]);

  return (
    <div className='userDetail-form'>
      {loading ? (
        <p>Loading...</p>
      ) : userDetail ? (
        <>
          <div className="user-detail-container">
            <Card className="user-detail-card">
              <Card.Img variant="top" src={userDetail.avatarUrl} className="user-avatar" />
              <Card.Body>
                <Card.Title>User Detail</Card.Title>
                <Card.Text>
                  <strong>ID:</strong> {userDetail.id} <br />
                  <strong>Username:</strong> {userDetail.userName} <br />
                  <strong>Email:</strong> {userDetail.email} <br />
                  <strong>Gender:</strong> {userDetail.gender ? "Male" : "Female"} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className='order-place'>
            <div className='order-header'>Order List</div>
            <div className='order-list'>
              {orders.length > 0 ? (
                orders.map((order, orderIndex) => (
                  <div key={order.id}>
                    <div className='order-props'>
                      <div className='order-props-leftSide'>
                        <div className='order-details'>
                          <div className="order-info">
                            <div className="order-info-item">
                              <p><b>Order ID:</b> {order.id}</p>
                            </div>
                            <div className="order-info-item">
                              <p><b>Order Date:</b> {order.orderDate}</p>
                            </div>
                            <div className="order-info-item">
                              <p><b>Total Amount:</b> {order.totalAmount} Photos</p>
                            </div>
                            <div className="order-info-item">
                              <p><b>Shipping Address:</b> {order.shippingAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='order-props-rightSide'>
                        <p><b>Status:</b> {order.status}</p>
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Unit Price</th>
                          <th>Size ID</th>
                          <th>Frame ID</th>
                          <th>Technical Type Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.$values.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{orderIndex + 1}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.technicalSizeId}</td>
                            <td>{item.technicalFrameId}</td>
                            <td>{item.technicalTypeName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p>No orders found</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Error loading user detail.</p>
          <button onClick={() => { localStorage.removeItem("token"); }}>Click me</button>
        </>
      )}
    </div>
  );
}

export default UserDetail;
