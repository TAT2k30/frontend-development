import React, { useEffect, useState } from 'react';
import './Print.scss';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import HeaderPrintPhoto from '../../../../Assets/Image/HeaderPrintPhoto.jpg';
import StandardPrint from '../../../../Assets/Image/PhotoPrint-Standard.jpg';
import CollagePrints from '../../../../Assets/Image/PhotoPrint-Collage.jpg';
import { Link, useNavigate } from 'react-router-dom';
function Print(props) {
    const [printData, setPrintData] = useState([]);
    const [sizeData, setSizeData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getAllPrint = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Product`);
                setPrintData(response.data.data.$values);
            } catch (error) {
                console.error("Error fetching print data:", error);
            }
        };
        const getAllSize = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Size`);
                setSizeData(response.data.data.$values);
                console.log(response.data.data.$values)
            } catch (error) {
                console.error("Error fetching size data", error);
            }
        }
        getAllPrint();
        getAllSize();
    }, []);

    const filteredPrintsData = printData.filter(data => data.name === "Prints");
    const standardPrintsCollection = ["10 x 13.5", "10 x 15", "15 x 20", "20 x25", "20 x 30"];
    const collagePrintsCollection = ["10 x 15", "15 x 20", "20 x 25", "20 x 30",];
    const standardPrintsPrices = {
        "10 x 13.5": 0.25,
        "10 x 15": 0.25,
        "15 x 20": 1.95,
        "20 x 25": 3.45,
        "20 x 30": 3.65
    };
    const collagePrintsPrices = {
        "10 x 15": 0.29,
        "15 x 20": 0.69,
        "20 x 25": 3.45,
        "20 x 30": 3.65
    };

    return (
        <div className='product-print-container'>
            <div className='Header-image'>
                <div className='Header-image-text'>
                    <b>Photo prints</b><br />
                    {filteredPrintsData.map(data => (
                        <span key={data.id}>{data.description}</span>
                    ))}
                    <div className='footer-Prints-button'>
                        <button onClick={()=>{navigate("/print/printSetting")}}>Order prints now</button>
                    </div>
                </div>
                <img src={HeaderPrintPhoto} />
            </div>
            <hr />
            <div className='product-print-content'>
                <div className='product-print-content1'>
                    <span>Photo Print types</span>
                    <p>With MyImage quality photo printing, there are a variety of options to suit your needs.</p>
                </div>
                <div className='doubleImage-print'>
                    <div className='doubleImage-print-first'>
                        <img src={StandardPrint} />
                        <div>
                            Standard Prints
                        </div>
                        <div className='prints-props'>
                            {sizeData.map(data => {
                                if (standardPrintsCollection.includes(data.acreage)) {
                                    return (
                                        <div key={data.id}>
                                            <p><Link to="/print/printSetting">{data.acreage}</Link>cm - <span style={{color: "green"}}>${standardPrintsPrices[data.acreage]}</span>/pic</p>
                                        </div>
                                    );
                                } 
                            })}

                        </div>
                    </div>
                    <div className='doubleImage-print-second'>
                        <img src={CollagePrints} />
                        <div>
                            Collage Prints
                        </div>
                        <div className='prints-props'>
                            {sizeData.map(data => {
                               if (collagePrintsCollection.includes(data.acreage)) {
                                return (
                                    <div key={data.id}>
                                        <p><Link to="">{data.acreage}</Link>cm  - <span style={{color: "green"}}>${collagePrintsPrices[data.acreage]}</span>/pic</p>
                                    </div>
                                );
                            }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Print;
