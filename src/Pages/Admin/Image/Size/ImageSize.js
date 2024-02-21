import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import CuteImg from '../../../../Assets/Image/Cute.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import './Size.scss';
import Pagination from '../../../../Services/Pagination/Pagination';

function ImageSize(props) {
    const [sizeResult, setSizeResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const getAllPaperSize = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Size`);
                setSizeResult(response.data.data.$values);
            } catch (error) {
                console.error("Error fetching size data:", error);
            }
        };

        getAllPaperSize();
    }, []);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentpost = sizeResult.slice(firstPostIndex, lastPostIndex);

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    return (
        <div className="size-card-container">
            <div className='size-intro'>
                <h3>Size list</h3>
                <button className='button-size' onClick={toggleContent}><FontAwesomeIcon icon={showContent ? faUpLong : faDownLong} /></button>
            </div>
            {showContent && (
                <>
                    <div className="size-card-list" style={showContent ? { transition: "transition: transform 0.3s ease, opacity 0.3s ease"} : { transition: "transition: transform 0.3s ease, opacity 0.3s ease"}}>
                        {currentpost.length > 0 ? (
                            currentpost.map((size, index) => (
                                <div className="size-card" key={index}>
                                    <div className="size-card-image" style={{ backgroundImage: `url(${CuteImg})` }} />
                                    <div className="status-icon">
                                        <FontAwesomeIcon icon={size.status ? faEye : faEyeSlash} color={size.status ? 'green' : 'red'} size='2x' />
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
                    <div className='size-pagination'>
                        <Pagination totalPost={sizeResult.length} postPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </>
            )}

        </div>
    );
}

export default ImageSize;
