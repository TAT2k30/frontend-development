import React, { useContext, useEffect, useState, useRef } from 'react';
import './PrintsSetting.scss';
import axios from 'axios';
import { baseUrl } from '../../../../../Assets/Data/baseUrl';
import { DataContext } from '../../../../../Assets/Data/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';
import PopupImage from '../../PopupImage/PopupImage';
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg'
import { IoMdUndo, IoMdRedo } from 'react-icons/io'
import { isEmptyArray } from 'formik';
import storeData from '../../../../../Services/SavedPropsLinkedList/LinkedList';

function PrintSetting(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useContext(DataContext);
    const [haveImg, setHaveImg] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [headerSize, setHeaderSize] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [choosenPhoto, setChoosenPhoto] = useState('');
    const [userImg, setUserImages] = useState([]);
    const [commonSizeData, setCommonSizeData] = useState([]);
    const [priceData, setPriceData] = useState({});
    const [frameData, setFrameData] = useState([]);
    const [framePriceData, setFramePriceData] = useState({});
    const [materialPriceData, setMaterialPriceData] = useState({});
    const [materialData, setMaterialData] = useState([]);
    const sizePassedData = location.state ? location.state : null;
    const canvasRef = useRef(null);
    const [details, setDetails] = useState('')
    const [linkedListData, setLinkedListData] = useState([]);
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
                setUserImages(userImages);
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
        const getAllFrame = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Frame`);
                setFrameData(response.data.data.$values);
            } catch (error) {
                console.error("Error fetching frame data: ", error);
            }
        }
        getAllUserImg();
        getAllSize();
        getAllFrame();

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
    const redo = () => {
        const data = storeData.redoEdit();
        if (data) {
            setPhotoProps(data);
        }
    };

    const undo = () => {
        const data = storeData.undoEdit();
        if (data) {
            setPhotoProps(data);
        }
    };

    const handleSizeChoosen = (name) => {
        const selectedSize = headerSize.find(size => size.name === name);
        if (selectedSize) {
            setCommonSizeData([selectedSize]);
            const sizes = name.split('x');
            const size1 = parseFloat(sizes[0].trim());
            const size2 = parseFloat(sizes[1].trim());
            setPhotoProps({
                ...photoProps,
                vartical: (size1 / 8),
                horizontal: (size2 / 8)
            });
            const price = sizePassedData && sizePassedData.price && sizePassedData.price[selectedSize.acreage] ?
                sizePassedData.price[selectedSize.acreage] :
                standardPrintsPrices[selectedSize.acreage];
            setPriceData({
                [selectedSize.name]: price
            });
        } else {
            setCommonSizeData([]);
        }
    };

    const handleFrameChoosen = (name) => {
        const price = calculateFramePrice(name);
        if (price) {
            setFramePriceData({
                [name]: price
            });
        }
    };


    const handleMaterialChoosen = (material) => {
        const price = calculateMaterialPrice(material);

        setMaterialData(material);
        setMaterialPriceData({
            [material]: price
        });
    };

    const handleRangeChange = (e, type) => {
        const newProps = {
            ...photoProps,
            [type]: parseInt(e.target.value)
        };
        setPhotoProps(newProps);
    };

    const [photoProps, setPhotoProps] = useState({
        image: '',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        hueRotate: 0,
        rotate: 0,
        vartical: 1,
        horizontal: 1
    });

    const [filterProps, setFilterProps] = useState({
        name: 'Brightness',
        type: 'brightness',
        maxValue: 200
    });

    const calculateMaterialPrice = (material) => {
        switch (material) {
            case 'Glossy':
                return 5;
            case 'Matte':
                return 7;
            default:
                return 0;
        }
    };
    const calculateFramePrice = (frame) => {
        switch (frame) {
            case 'Golden':
                return 5;
            case 'Silver':
                return 3;
            case 'Rustic':
                return 2.3;
            case 'Acrylic':
                return 1.2;
            case 'Leather':
                return 2;
            case 'Bamboo':
                return 1.6;
            case 'Metallic':
                return 1.9;
            case 'Fabric-covered':
                return 2.1;
            case 'Glass':
                return 1.7;
            default:
                return 0;
        }
    };
    const setUpDataInLinkedList = (data) => {
        const initalData = {
            image: data && data.imageUrl ? data.imageUrl : null,
            brightness: 100,
            grayscale: 0,
            sepia: 0,
            saturate: 100,
            contrast: 100,
            hueRotate: 0,
            rotate: 0,
            vartical: 1,
            horizental: 1
        }
        setLinkedListData(initalData);
        storeData.insert(initalData)
    }
    const filterElement = [
        { name: 'Brightness', type: 'brightness', maxValue: 200 },
        { name: 'GrayScale', type: 'grayscale', maxValue: 200 },
        { name: 'Sepia', type: 'sepia', maxValue: 200 },
        { name: 'Saturate', type: 'saturate', maxValue: 200 },
        { name: 'Contrast', type: 'contrast', maxValue: 200 },
        { name: 'HueRotate', type: 'hueRotate' }
    ];
    const leftRotate = () => {
        const newRotate = {
            ...photoProps,
            rotate: photoProps.rotate - 90
        }
        setPhotoProps(newRotate)
        storeData.insert(newRotate)
    }
    const rightRotate = () => {
        const newRotate = {
            ...photoProps,
            rotate: photoProps.rotate + 90
        }
        setPhotoProps(newRotate)
        storeData.insert(newRotate)
    }
    const verticalRotate = () => {
        const newFlip = {
            ...photoProps,
            vertical: photoProps.vartical === 1 ? -1 : 1
        }
        setPhotoProps(newFlip)
        storeData.insert(newFlip)
    }
    const horizontalRotate = () => {
        const newFlip = {
            ...photoProps,
            horizontal: photoProps.horizontal === 1 ? -1 : 1
        }
        setPhotoProps(newFlip)
        storeData.insert(newFlip)
    }
    const standardPrintsPrices = {
        "10 x 13.5": 0.25,
        "10 x 15": 0.25,
        "15 x 20": 1.95,
        "20 x 25": 3.45,
        "20 x 30": 3.65
    };
    const totalPriceCaculation = (framePriceData) => {
        if (!isEmptyArray(framePriceData)) {
            const frameTotalPrice = Object.values(framePriceData).reduce((acc, curr) => acc + curr, 0);
            if (frameTotalPrice === 0) {
                // Nếu giá frame là 0, trả về tổng giá của các thành phần khác
                return Object.values(priceData).reduce((acc, curr) => acc + curr, 0) + Object.values(materialPriceData).reduce((acc, curr) => acc + curr, 0);
            } else {
                // Nếu giá frame khác 0, tính tổng giá của tất cả các thành phần
                return (Object.values(priceData).reduce((acc, curr) => acc + curr, 0) + Object.values(materialPriceData).reduce((acc, curr) => acc + curr, 0)) * frameTotalPrice;
            }
        } else {
            // Nếu không có giá frame, trả về tổng giá của các thành phần khác
            return Object.values(priceData).reduce((acc, curr) => acc + curr, 0) + Object.values(materialPriceData).reduce((acc, curr) => acc + curr, 0);
        }
    }


    const standardPrintsCollection = Object.keys(standardPrintsPrices);

    const saveImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = details.naturalWidth;
        canvas.height = details.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.filter = `brightness(${photoProps.brightness}%) sepia(${photoProps.sepia}%) saturate(${photoProps.saturate}%) contrast(${photoProps.contrast}%) grayscale(${photoProps.grayscale}%) hue-rotate(${photoProps.hueRotate}deg)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(photoProps.rotate * Math.PI / 180);
        ctx.scale(photoProps.vartical, photoProps.horizontal);
        ctx.drawImage(details, -details.naturalWidth / 2, -details.naturalHeight / 2);
        const base64Url = canvas.toDataURL('image/jpeg');
        setPhotoProps({
            ...photoProps,
            image: base64Url
        });
        const link = document.createElement('a');
        link.download = 'image_edit.jpg';
        link.href = base64Url;
        link.click();
    };

  

    return (
        <div className="photo-prints-setting">
            <div className="left-side">
                {choosenPhoto ? (
                    <>
                        <div className='print-editor'>
                            <div className='print-editor-card'>
                                <div className='print-editor-card-header'>
                                    <h2>----- Photo Editor -----</h2>
                                </div>
                                <div className='print-editor-card-body'>
                                    <div className='print-editor-card-body-sideBar'>
                                        <div className='sideBar-body'>
                                            <span>Filters</span>
                                            <div className='sideBar-filter-section'>
                                                <div className='sideBar-filterKey'>
                                                    {filterElement.map((filter, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => { setFilterProps(filter) }}
                                                            style={filterProps.name === filter.name ? { backgroundColor: "#adadad" } : { backgroundColor: "#f6fffe" }}>
                                                            <span>{filter.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className='sideBar-filter-slider'>
                                                    <div className='label-bar'>
                                                        <label htmlFor='range'>{filterProps.name}</label>
                                                        <span>{photoProps[filterProps.type]}%</span>
                                                    </div>
                                                    <input
                                                        type='range'
                                                        value={photoProps[filterProps.type]}
                                                        max={filterProps.maxValue}
                                                        onChange={(e) => handleRangeChange(e, filterProps.type)} />
                                                </div>
                                                <div className='sideBar-rotateFlit'>
                                                    <span>Rotate & Flip</span>
                                                    <button onClick={() => { leftRotate() }}><GrRotateLeft /></button>
                                                    <button onClick={() => { rightRotate() }}> <GrRotateRight /></button>
                                                    <button onClick={() => { verticalRotate() }}><CgMergeVertical /></button>
                                                    <button onClickCapture={() => { horizontalRotate() }}><CgMergeHorizontal /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='print-editor-photo'>
                                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                                            <img onLoad={(e) => setDetails(e.currentTarget)} src={choosenPhoto} style={{
                                                filter: `brightness(${photoProps.brightness}%)
                                                sepia(${photoProps.sepia}%)
                                                saturate(${photoProps.saturate}%)
                                                contrast(${photoProps.contrast}%)
                                                grayscale(${photoProps.grayscale}%)
                                                hue-rotate(${photoProps.hueRotate}deg)`,
                                                transform: `rotate(${photoProps.rotate}deg) scale(${photoProps.vartical},${photoProps.horizontal})`
                                            }} />
                                            <div className='photo-editor-optional'>
                                                <button onClick={() => { undo() }}><IoMdUndo /></button>
                                                <button onClick={() => { redo() }}><IoMdRedo /></button>
                                            </div>
                                            <div className='print-editor-photo-footer'>
                                                <button className='btn-reset'>Reset</button>
                                                <button className='btn-save' onClick={saveImage}>Save photo</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (haveImg ? (
                    <div className='chose-img-option'>
                        <button onClick={() => setShowPopup(true)}>Choose your uploaded image</button>
                        {showPopup && <PopupImage showPopup={showPopup} onClose={handlePopupClose} handleInputPhoto={setChoosenPhoto} handleSaveData={setUpDataInLinkedList} />}
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
                                                }}>
                                                {size.acreage} cm<br />
                                                ({size.name})
                                            </button>
                                        );
                                    }
                                    return null;
                                })}
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
                        <button onClick={() => handleMaterialChoosen('Glossy')}>Glossy</button>
                        <button onClick={() => handleMaterialChoosen('Matte')}>Matte</button>
                    </div>
                </div>
                <div className='right-side-frameOption'>
                    <b>Frame :</b>
                    <div className='right-side-frameOptions'>
                        {frameData.length > 0 ?
                            frameData.map((frame, index) => (
                                <button key={index} onClick={() => handleFrameChoosen(frame.name)}>{frame.name}</button>
                            )) :
                            <span>No frame added in the database</span>
                        }
                    </div>
                </div>

                <hr />
                <div className='total-money-pay'>
                    <b>Total money : </b><span style={{ color: "green" }}><b>{totalPriceCaculation(framePriceData)}$</b></span>
                    <button>Order now</button>
                </div>
            </div>
        </div >
    );
}

export default PrintSetting;
