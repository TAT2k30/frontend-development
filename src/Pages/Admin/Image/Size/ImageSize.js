import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import CuteImg from '../../../../Assets/Image/Cute.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Size.scss';

function ImageSize(props) {
    const [sizeResult, setSizeResult] = useState([]);

    useEffect(() => {
        const getAllPaperSize = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Size`);
                setSizeResult(response.data.data.$values);
            } catch (error) {
                alert("Error. Please check your console for details.");
                console.error(error);
            }
        };

        getAllPaperSize();
    }, []);
    let dataPaginate = sizeResult.length + 1;
    let Lastpage = Math.ceil(dataPaginate/4);
    console.log(Lastpage)

    return (
        <div className="size-card-container">
            <h2>Photo Sizes</h2>
            <div className="size-card-list">
                {sizeResult.length > 0 ? (
                    sizeResult.map((size, index) => (
                        <div className="size-card" key={index}>
                            <div className="size-card-image" style={{ backgroundImage: `url(${CuteImg})` }} />
                            <div className="status-icon">
                                    <FontAwesomeIcon icon={size.status ? faEye : faEyeSlash} color={size.status ? 'green' : 'red'} size='2x'/>
                                </div>
                            <div className="size-card-details">
                                <div className="size-card-header">
                               
                                    <h3><b>{size.name}</b></h3>
                                </div>
                                <div className="size-card-body">
                                    <div className="size-card-content">
                                        <p><strong><b>Dimensions:</b></strong><br />- {size.dimensions}</p>
                                        <p><strong><b>Description:</b></strong><br />- {size.description}</p>
                                        <p><strong><b>Status:</b></strong> {size.status ? "Public" : "Hidden"}</p>
                                    </div>
                                </div>
                                <div className="size-card-footer">
                                    <input type="button" value="Edit" />
                                </div>
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </div>
    );
}

export default ImageSize;
