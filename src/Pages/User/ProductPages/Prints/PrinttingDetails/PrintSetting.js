import React, { useContext, useEffect, useState } from 'react';
import './PrintsSetting.scss';
import axios from 'axios';
import { baseUrl } from '../../../../../Assets/Data/baseUrl';
import { DataContext } from '../../../../../Assets/Data/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import PopupImage from '../../PopupImage/PopupImage';

function PrintSetting(props) {
    const { token } = useContext(DataContext);
    const [haveImg, setHaveImg] = useState(false);
    const [userImages, setUserImages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllUserImg = async () => {
            try {
                const response = await axios.post(`${baseUrl}/Image/${token.UserId}`);
                console.log(response.status);
                setUserImages(response.data.data.$values);
                setHaveImg(true);
            } catch (error) {
                console.error("Error fetching user images:", error);
                setHaveImg(false);
            }
        };
        getAllUserImg();
    }, [token.UserId]);

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <div className="photo-prints-setting">
            <div className="left-side">
                {haveImg === true ? (
                    <div className='chose-img-option'>
                        <button onClick={() => setShowPopup(true)}>Choose your uploaded image</button>
                        {showPopup && <PopupImage showPopup={showPopup} onClose={handlePopupClose} />}
                    </div>
                ) : (
                    <div className='goTo-createImg'>
                        <button onClick={() => { navigate('/uploads') }}>Go to upload image</button>
                    </div>
                )}
            </div>
            <div className="right-side">
                huhu
            </div>
        </div>
    );
}

export default PrintSetting;
