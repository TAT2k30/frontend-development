import React, { useEffect } from 'react';
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
function UserContent() {
  const location = useLocation();
  const navigate = useNavigate();

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
          <div className='calendar'>
            <div className='Checkout-img-container'>
              <img src={calenderCheckout} alt="Calendar" />
            </div>
            <div className='text-checkout-img'>
              <span>Calendar</span>
            </div>
          </div>
          <div className='print'>
            <div className='Checkout-img-container'>
              <img src={printCheckout} alt="Print" />
            </div>
            <div className='text-checkout-img'>
              <span>Print</span>
            </div>
          </div>
          <div className='canva'>
            <div className='Checkout-img-container'>
              <img src={canvaCheckout} alt="Canva" />
            </div>
            <div className='text-checkout-img'>
              <span>Canva</span>
            </div>
          </div>
          <div className='homeDecor'>
            <div className='Checkout-img-container'>
              <img src={homeDecorCheckout} alt="Home Decor" />
            </div>
            <div className='text-checkout-img'>
              <span>Home Decor</span>
            </div>
          </div>
          <div className='photoBook'>
            <div className='Checkout-img-container'>
              <img src={photoBookCheckout} alt="Photo Book" />
            </div>
            <div className='text-checkout-img'>
              <span>Photo Book</span>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default UserContent;
