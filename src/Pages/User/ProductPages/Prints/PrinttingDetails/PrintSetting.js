import React, { useContext, useEffect, useState } from 'react';
import './PrintsSetting.scss';
import axios from 'axios';
import { baseUrl } from '../../../../../Assets/Data/baseUrl';
import { DataContext } from '../../../../../Assets/Data/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';
import PopupImage from '../../PopupImage/PopupImage';

function PrintSetting(props) {
    const standardPrintsPrices = {
        "10 x 13.5": 0.25,
        "10 x 15": 0.25,
        "15 x 20": 1.95,
        "20 x 25": 3.45,
        "20 x 30": 3.65
    };
    const standardPrintsCollection = ["10 x 13.5", "10 x 15", "15 x 20", "20 x 25", "20 x 30"];
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useContext(DataContext);
    const [haveImg, setHaveImg] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [headerSize, setHeaderSize] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [choosenPhoto, setChoosenPhoto] = useState([]);
    const [userImg, setUserImages] = useState([]);
    const [commonSizeData, setCommonSizeData] = useState([]);
    const sizePassedData = location.state ? location.state : null;

    useEffect(() => {
        const getAllUserImg = async () => {
            try {
                const response = await axios.post(`${baseUrl}/Image/${token.UserId}`);
                setUserImages(response.data.data.$values);
                setHaveImg(true);
            } catch (error) {
                console.error("Error fetching user images:", error);
                setHaveImg(false);
            }
        };

        const getAllSize = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Size`);
                setHeaderSize(response.data.data.$values);
            } catch (error) {
                console.error("Error fetching size : ", error);
            }
        };

        getAllUserImg();
        getAllSize();

    }, [token.UserId]);

    useEffect(() => {
        const filteredSize = headerSize.filter(size => size.name === (sizePassedData && sizePassedData.size && sizePassedData.size.name));
        setCommonSizeData(filteredSize);
    }, [location.pathname, headerSize, sizePassedData]);

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleShowMoreToggle = () => {
        setShowMore(!showMore);
    };

    const handleSizeChoosen = (name) => {

        const selectedSize = headerSize.find(size => size.name === name);
        if (selectedSize) {
            setCommonSizeData([selectedSize]);
        } else {
            setCommonSizeData([]);
        }
    };
    console.log(sizePassedData);
    console.log(commonSizeData)
    return (
        <div className="photo-prints-setting">
            <div className="left-side">
                {choosenPhoto.length ? (
                    choosenPhoto && (
                        <>
                            <div className='print-editor'>
                                <div className='print-editor-imgContainer'>
                                    <img src={choosenPhoto} />
                                </div>
                                <div className='print-editor-main'>
                                    Hello
                                </div>
                            </div>
                        </>
                    )
                ) : (haveImg ? (
                    <div className='chose-img-option'>
                        <button onClick={() => setShowPopup(true)}>Choose your uploaded image</button>
                        {showPopup && <PopupImage showPopup={showPopup} onClose={handlePopupClose} handleInputPhoto={setChoosenPhoto} />}
                    </div>
                ) : (
                    <div className='goTo-createImg'>
                        <button onClick={() => { navigate('/uploads') }}>Go to upload image</button>
                    </div>
                ))}
            </div>
            <div className="right-side">
                <div className='right-side-header'>
                    {commonSizeData && commonSizeData.length > 0 ?
                        <span>{commonSizeData[0].name} Prints // Starting at <a style={{ color: "green" }}> $
                            {sizePassedData && sizePassedData.price &&
                                sizePassedData.price[commonSizeData[0].acreage] ?
                                sizePassedData.price[commonSizeData[0].acreage] :
                                standardPrintsPrices[commonSizeData[0].acreage]}</a> per photo</span>
                        :
                        <span>No size chosen</span>}
                </div>
                <div className="right-side-content">
                    <b>Sizes : </b>
                    {headerSize && headerSize.length > 0 ? (
                        <>
                            {headerSize
                                .slice(0, showMore ? headerSize.length : 6)
                                .map((size, index) => {
                                    if (standardPrintsCollection.includes(size.acreage)) {
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleSizeChoosen(size.name)}

                                                style={{
                                                    backgroundColor: commonSizeData.some((data) => data.name === size.name) ? "#6bb8bb" : "#c4e4e5"
                                                }}
                                            >
                                                {size.acreage} cm<br />
                                                ({size.name})
                                            </button>
                                        );
                                    }
                                    return null;
                                })
                            }

                        </>
                    ) : <span>No sizes available</span>}
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <table style={{ margin: "auto" }}>
                        <tbody>
                            <tr>
                                <td style={{ width: "40%" }}><hr /></td>
                                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                                    <button style={{ border: "none", backgroundColor: "#fdf7f3" }} onClick={handleShowMoreToggle} className="show-more-button">
                                        {showMore ? "Show less" : "Show more"}
                                    </button>
                                </td>
                                <td style={{ width: "40%" }}><hr /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='right-side-footer'>
                    <b>Finish : </b>
                    <div className='right-side-footerOptions'>
                        <button>Glossy</button>
                        <button>Matte</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PrintSetting;
