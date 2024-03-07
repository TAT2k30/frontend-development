import React, { useContext, useEffect, useState } from 'react';
import './PopupImage.scss';

import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import { DataContext } from '../../../../Assets/Data/DataContext';

function PopupImage({ handleInputPhoto, showPopup, onClose, handleSaveId }) {
    const [userImg, setUserImg] = useState([]);
    const { token } = useContext(DataContext);
    useEffect(() => {
        const getAllUserImg = async () => {
            try {
                const response = await axios.post(`${baseUrl}/Image/${token.UserId}`);
                const userImages = response.data.data.$values.map(image => {
                    return {
                        imageUrl: `data:image/jpeg;base64, ${image.base64Image}`,
                        id: image.id
                    };
                });
                setUserImg(userImages); 
            } catch (error) {
                console.error("Error fetching user images:", error);
            }
        };
        getAllUserImg();
    }, [])
    if (!showPopup) {
        return null;
    }
    return (
        <div className='popup-overlay'>
            <div className='popup-content'>

                <div className='popup-close' onClick={onClose}>
                    Close
                    &times;
                </div>

                {userImg.map((img, index) => (
                    <img key={index} src={img.imageUrl} alt={`User Image ${index + 1}`} className='img-thumbnail' onClick={() => { handleInputPhoto(img.imageUrl); handleSaveId(img.id) }} />
                ))}

            </div>
        </div>
    );
}

export default PopupImage;
