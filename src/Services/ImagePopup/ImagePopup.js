import React from 'react';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function ImagePopup(props) {
    return (
        <div className='popup'>
            <div className='popup-inner'>
                    <button className='close-btn'><FontAwesomeIcon icon={faDeleteLeft}/></button>
                    {props.children}
            </div>
        </div>
    );
}

export default ImagePopup;