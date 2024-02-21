import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserContent.scss';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import video from '../../../../Assets/Image/Create walls that tell stories - Snapfish Photo Tiles.mp4';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import { DataContext } from '../../../../Assets/Data/DataContext';
import comingSoonImg from '../../../../Assets/Image/comingSoon.jpg';
import { UserPath } from '../../../../Routes/routerList';

function UserContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productRouteArray, setProductRouteArray] = useState([]);
  const { currentRoute } = useContext(DataContext);

  useEffect(() => {
    const customData = location.state;
    if (customData && customData.type === 'error') {
      NotificationManager.error(customData.message, 'Error', 3000);
      navigate({ ...location, state: undefined });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Product`);
        const fetchedProducts = response.data.data.$values;
        setProducts(fetchedProducts);

        const routes = fetchedProducts.map(product => {
          let formattedName = product.name
            .toLowerCase()
            .replace(/^\//, '')
            .replace(/s$/, '');

          const spaceIndex = formattedName.indexOf(' ');
          if (spaceIndex !== -1) {
            formattedName = formattedName.substring(0, spaceIndex + 1) +
              formattedName.charAt(spaceIndex + 1).toUpperCase() +
              formattedName.substring(spaceIndex + 2);
          }

          return '/' + formattedName.replace(/\s/g, '');
        });
        setProductRouteArray(routes);
      } catch (error) {
        alert("Error. Please check your console for details.");
        console.error(error);
      }
    };

    getAllProducts();
  }, []);

  const handleClick = route => {
    let result = Object.values(UserPath).includes(route);
    if (result) {
      navigate(route);
    } else {
      const customData = { message: `The route "${route}" is under construction`, type: "error" };
      navigate(currentRoute, { state: customData });
    }
  };

  const routeChecking = routeName => {
    return Object.values(UserPath).includes(routeName);
   
  };

  return (
    <div className='user-content-form'>
      <NotificationContainer />
      <video src={video} autoPlay loop className="video-full-height" muted />
      <h5 className="divider donotcross">
        <div className='checkout-text'>
          <b>Checkout our deals</b>
        </div>
      </h5>
      <div className='category-checkout'>
        <div className='checkout-line'>
          {products.map((product, index) => (
            <div className='checkout-item' key={product.id}>
              <div className='checkout-img-container' onClick={() => handleClick(productRouteArray[index])} style={!routeChecking(productRouteArray[index]) ? { cursor: 'no-drop', backgroundColor: "#c63333" } : {}}>
                {!routeChecking(productRouteArray[index]) ? (
                  <img className="comingSoon-checkout-image" src={comingSoonImg} alt="Coming Soon" />
                ) : (
                  <img src={product.pImgUrl} alt={product.name} className='real-product-img' />
                )}
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
