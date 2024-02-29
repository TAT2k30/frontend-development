import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUpLong, faDownLong, faPlus } from '@fortawesome/free-solid-svg-icons';
import './ImageSize.scss';
import Pagination from '../../../../Services/Pagination/Pagination';
import LoadingImg from '../../../../Services/Loading/LoadingImg';
import PhotoCreateRange from '../PhotoPopup/PhotoCreateRange';
import userPhoto from '../../../../Assets/Image/z3578060413284_5aa479a349698a11b9f6d494f6cb8532 (1).jpg';

function ImageSize(props) {
    const [sizeResult, setSizeResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const [showContent, setShowContent] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const formData = new FormData();
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
    const handleChangeStatus = async (id) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            const changeStatusRes = await axios.put(`${baseUrl}/Size`, formData);
            if (changeStatusRes.status === 200) {
                const updatedSizeResult = sizeResult.map(size => {
                    if (size.id === id) {
                        return { ...size, status: !size.status };
                    }
                    return size;
                });
                setSizeResult(updatedSizeResult);
                alert("Change status success");
            }
        } catch (error) {
            console.error("Error changing status:", error);
        }
    }


    const toggleContent = () => {
        setShowContent(!showContent);
    };
    const sizesArray = currentpost.map(size => {
        const sizes = size.name.split('x');
        const size1 = parseFloat(sizes[0].trim());
        const size2 = parseFloat(sizes[1].trim());
        const boxSize1 = size1 * 14;
        const boxSize2 = size2 * 13;
        return { size1, size2, boxSize1, boxSize2 };
    });
    return (
        <div className="size-card-container">
            <div className='size-intro' style={showContent ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}>
                <div className='left-size-intro'>
                    <h3>Size list</h3>
                    <button className='size-button-addRange' onClick={() => { setIsOpen(!isOpen) }}><FontAwesomeIcon icon={faPlus} /></button>
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
                                    <div className="size-card-cover">
                                        <div className="size-card-cover">
                                            <div className='size-card-cover-header'>
                                                <b style={{ fontSize: "larger" }}>{sizesArray[index].size1}</b>
                                            </div>
                                            <div className='size-card-cover-props'>
                                                <div className='size-card-cover-content' style={{ width: sizesArray[index].boxSize1, height: sizesArray[index].boxSize2, backgroundImage: `url('${userPhoto}')`, backgroundSize: 'cover' }} >


                                                </div>
                                                <b>{sizesArray[index].size2}</b>
                                            </div>
                                            <div className='size-card-cover-footer'>{size.acreage} cm</div>
                                        </div>

                                    </div>
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
                                                <p><strong><b>Status:</b></strong> <b style={size.status ? { color: "green" } : { color: "red" }}>{size.status ? "Public" : "Hidden"}</b></p>
                                            </div>
                                        </div>
                                        <div className="size-card-footer">
                                            <button onClick={() => { handleChangeStatus(size.id, !size.status) }}>Change status</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='size-list-loading'><LoadingImg /></div>
                        )}
                    </div>
                    <div className='size-pagination'>
                        <Pagination totalPost={sizeResult.length} postPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </>
            )}
            {isOpen && <PhotoCreateRange handleIsOpen={setIsOpen} isOpen={isOpen} photoType={"Photo's Size range adding"} />}
        </div>
    );
}

export default ImageSize;
