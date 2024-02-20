import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserContent.scss';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import video from '../../../../Assets/Image/Create walls that tell stories - Snapfish Photo Tiles.mp4';
import calenderCheckout from '../../../../Assets/Image/calendar.jpg';
import printCheckout from '../../../../Assets/Image/print.jpg';
import canvaCheckout from '../../../../Assets/Image/canvas.jpg';
import homeDecorCheckout from '../../../../Assets/Image/homeDecor.jpg';
import photoBookCheckout from '../../../../Assets/Image/photoBook.jpg';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
function UserContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const customData = location.state;
    if (customData) {
      const { message, type } = customData;

      if (type === 'error') {
        NotificationManager.error(message, 'Authentication errors', 3000);
        navigate({ ...location, state: undefined });
      }
    }
  }, [location.state, navigate]);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Product`);
        setProducts(response.data.data.$values);

      } catch (error) {
        alert("Error. Please check your console for details.");
        console.error(error);
      }
    };

    getAllProducts();
  }, []);
  return (

    <div className='user-content-form'>
      <NotificationContainer />
      <video src={video} autoPlay loop className="video-full-height" muted />
      <h5 className="divider donotcross" contenteditable>
        <div className='checkout-text'>
          <b>Checkout our deals</b>
        </div>
      </h5>
      <div className='category-checkout'>
        <div className='checkout-line'>
          {products.map(product => (
            <div className='checkout-item' key={product.id}>
              <div className='checkout-img-container'>
                <img src={product.pImgUrl} alt={product.name} />
              </div>
              <div className='text-checkout-img'>
                <span>{product.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default UserContent;
