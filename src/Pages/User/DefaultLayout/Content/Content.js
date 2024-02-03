import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Content.scss';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Content() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const customData = location.state;
    console.log(customData);

    if (customData) {
      const { message, type } = customData;

      if (type === 'error') {
        NotificationManager.error(message, 'Authentication errors', 3000);
        navigate({ ...location, state: undefined });
      }
    }
  }, [location.state, navigate]);

  return (
    <div className='content-form'>
      <NotificationContainer />
    </div>
  );
}

export default Content;
