import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import CuteImg from '../../../../Assets/Image/Cute.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUpLong, faDownLong, faPlus } from '@fortawesome/free-solid-svg-icons';
import './ImageSize.scss';
import Pagination from '../../../../Services/Pagination/Pagination';
import LoadingImg from '../../../../Services/Loading/LoadingImg';
import PhotoCreateRange from '../PhotoPopup/PhotoCreateRange';

function ImageSize(props) {
    const [sizeResult, setSizeResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const [showContent, setShowContent] = useState(false);
    const [isOpen , setIsOpen] = useState(false);

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
            <div className='size-intro' style={showContent ? {borderBottomLeftRadius:0,borderBottomRightRadius:0 }:{}}>
                <div className='left-size-intro'>
                    <h3>Size list</h3>
                    <button className='size-button-addRange' onClick={()=>{setIsOpen(!isOpen)}}><FontAwesomeIcon icon={faPlus}/></button>
                </div>
                <span>There are {sizeResult.length} sizes have been added</span>
                <button className='button-size' onClick={toggleContent}><FontAwesomeIcon icon={showContent ? faUpLong : faDownLong} /></button>
            </div>
            {showContent && (
                <>
                    <div className="size-card-list">
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
                                                <p><strong><b>Acreage:</b></strong><br />- {size.acreage} cm</p>
                                                <p><strong><b>Description:</b></strong><br />- {size.description}</p>
                                                <p><strong><b>Status:</b></strong> {size.status ? "Public" : "Hidden"}</p>
                                            </div>
                                        </div>
                                        <div className="size-card-footer">
                                           <button>Change status</button>
                                           <button>Apply changes</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='size-list-loading'><LoadingImg/></div>
                        )}
                    </div>
                    <div className='size-pagination'>
                        <Pagination totalPost={sizeResult.length} postPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </>
            )}
            {isOpen && <PhotoCreateRange handleIsOpen={setIsOpen} isOpen={isOpen} photoType={"Photo's Size range adding"}/>}
        </div>
    );
}

export default ImageSize;
