import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import CuteImg from '../../../../Assets/Image/Cute.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUpLong, faDownLong, faPlus } from '@fortawesome/free-solid-svg-icons';
import './ImageFrame.scss';
import Pagination from '../../../../Services/Pagination/Pagination';
import LoadingImg from '../../../../Services/Loading/LoadingImg';
import PhotoCreateRange from '../PhotoPopup/PhotoCreateRange';


function ImageFrame(props) {
    const [frameResult, setframeResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const [showContent, setShowContent] = useState(false);
    const [isOpen , setIsOpen] = useState(false);
    useEffect(() => {
        const getAllFrames = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Frame`);
                setframeResult(response.data.data.$values);
            } catch (error) {
                console.error("Error fetching size data:", error);
            }
        };

        getAllFrames();
    }, []);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentpost = frameResult.slice(firstPostIndex, lastPostIndex);

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    return (
        <>
       
        <div className="frame-card-container">
        <div className='frame-intro' style={showContent ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}:{}}>
            <div className='left-frame-intro'>
                <h3>Frame list</h3>
                <button className='frame-button-addRange' onClick={()=>{setIsOpen(!isOpen)}}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
            {frameResult.length === 0 ? <span>Frame has no data yet</span> : <spam>There are {frameResult.length} frames have been added</spam>}
            <button className='button-frame' onClick={toggleContent}><FontAwesomeIcon icon={showContent ? faUpLong : faDownLong} /></button>
        </div>

        {showContent && (
            <>
                <div className="frame-card-list" style={showContent ? { transition: "transition: transform 0.3s ease, opacity 0.3s ease" } : { transition: "transition: transform 0.3s ease, opacity 0.3s ease" }}>
                    {currentpost.length > 0 ? (
                        currentpost.map((frame, index) => (
                            <div className="frame-card" key={index}>
                                <div className="frame-card-image" style={{ backgroundImage: `url(${CuteImg})` }} />
                                <div className="status-icon">
                                    <FontAwesomeIcon icon={frame.status ? faEye : faEyeSlash} color={frame.status ? 'green' : 'red'} size='2x' />
                                </div>
                                <div className="frame-card-details">
                                    <div className="frame-card-header">
                                        <h3><b>{frame.name}</b></h3>
                                    </div>
                                    <div className="frame-card-body">
                                        <div className="frame-card-content">
                                            <p><strong><b>Dimensions:</b></strong><br />- {frame.dimensions}</p>
                                            <p><strong><b>Description:</b></strong><br />- {frame.description}</p>
                                            <p><strong><b>Status:</b></strong> {frame.status ? "Public" : "Hidden"}</p>
                                        </div>
                                    </div>
                                    <div className="frame-card-footer">
                                        <input type="button" value="Edit" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='frame-list-loading'>
                            <LoadingImg />
                        </div>
                    )}

                </div>

                <div className='frame-pagination'>
                    <Pagination totalPost={frameResult.length} postPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </>

        )}

    </div>
    {isOpen && <PhotoCreateRange handleIsOpen={setIsOpen} isOpen={isOpen} photoType={"Photo's frame range adding"}/>}

    </>
    );
}

export default ImageFrame;
