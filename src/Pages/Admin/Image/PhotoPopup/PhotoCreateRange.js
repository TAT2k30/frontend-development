import React, { useRef, useState } from 'react';
import './PhotoCreateRange.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import imgUpload from '../../../../Assets/Image/UploadImgIcn-removebg-preview.png';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';

function PhotoCreateRange({ handleIsOpen, isOpen, photoType }) {
    const [fileProps, setFileProps] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [errorIndices, setErrorIndices] = useState([]);
    const inputJsonRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);
    const [showProps, setShowProps] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
        setDragOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    const handleFileUpload = (file) => {
        if (file.name.endsWith('.json')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    setFileProps([file]);
                    const jsonData = JSON.parse(event.target.result);
                    const { isValid, errors } = validateJsonData(jsonData);
                    if (isValid) {
                        setShowProps(true);
                        setFileData(jsonData);
                        setErrorIndices([]);
                    } else {
                        setShowProps(true);
                        setErrorIndices(errors);
                    }
                } catch (error) {
                    setErrorIndices(['Error parsing JSON']);
                }
            };
            reader.readAsText(file);
        } else {
            setErrorIndices(['Please upload a .json file']);
        }
    };

    const handleRemoveData = () => {
        setShowProps(false);
        setFileData(null);
    };

    const validateJsonData = (data) => {
        const errors = [];
        let isValid = true;

        // Kiểm tra loại hình ảnh và thực hiện xác thực dựa trên loại đó
        if (photoType === "Photo's Size range adding") {
            for (let i = 0; i < data.length; i++) {
                const object = data[i];
                const keys = Object.keys(object);
                if (keys.length !== 3) {
                    errors.push(`Invalid number of properties at object ${i + 1}`);
                    isValid = false;
                } else {
                    if (!keys.includes('Name') || !keys.includes('Acreage') || !keys.includes('Description')) {
                        errors.push(`Invalid format at object ${i + 1}`);
                        isValid = false;
                    }
                }
            }
        } else if (photoType === "Photo's Frame range adding") {
            for (let i = 0; i < data.length; i++) {
                const object = data[i];
                const keys = Object.keys(object);


                if (keys.length !== 2) {
                    errors.push(`Invalid number of properties at object ${i + 1}`);
                    isValid = false;
                } else {
                    if (!keys.includes('Name') || !keys.includes('Description')) {
                        errors.push(`Invalid format at object ${i + 1}`);
                        isValid = false;
                    }
                }
            }
        }

        return { isValid, errors };
    };
    const handleSubmit = async () => {
        if (photoType === "Photo's Frame range adding") {
            const frameData = fileData.map(item => ({
                Name: item.Name,
                Description: item.Description
            }));

            await axios.post(`${baseUrl}/Frame/createRange`, frameData);
        } else if (photoType === "Photo's Size range adding") {
            const sizeData = fileData.map(item => ({
                Name: item.Name,
                Acreage: item.Acreage,
                Description: item.Description
            }));

            await axios.post(`${baseUrl}/Size/createRange`, sizeData);

        } else if (photoType === "Photo's type range adding") {
            const typeData = fileData.map(item => ({
                Name: item.Name,
                Dimensions: item.Dimensions,
                Description: item.Description
            }));

            const result = await axios.post(`${baseUrl}/Size/createRange`, typeData);
        }
    };

    return (
        <div className='add-range-modal-container'>
            <div className='main-addRange-modal'>
                <div className='add-range-modal-close'>
                    <h2>{photoType}</h2>
                    <span>
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => handleIsOpen(!isOpen)}
                            className='top-delete-btn'
                        />
                    </span>
                </div>

                <div className='add-range-modal-content'>
                    <h4>There must be only one file at the time</h4>
                    <p><b className='text-danger'>Important :</b><span>The given file must contain the <b className='text-warning'>.json</b> type at the end of fileName</span></p>
                    <div
                        className={`photo-dragDrop-file ${dragOver ? 'drag-over' : ''}`}

                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                    >
                        <div
                            className='photo-dragDrop-dashedBox'
                        >
                            <div className='addRange-props'>
                                <img src={imgUpload} alt="Upload Json File" />
                                <input type="file" multiple style={{ display: 'none' }} ref={inputJsonRef} />
                                <div className='jsonFile-text'>Drag & Drop <b className='text-warning'>JSON</b> File Here</div>
                            </div>
                        </div>
                        {showProps && (
                            <div className='JsonFile-props'>
                                <div className='File-details'>
                                    <div className='File-header'>Your file's properties</div>
                                    <div className='File-content'>
                                        {errorIndices.length > 0 ? (
                                            <div>
                                                {errorIndices.map((error, index) => (
                                                    <div key={index}><b className='bg-danger text-white' style={{ borderRadius: 20 }}>Error</b>: {error}</div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <span><b className='text-white bg-success' style={{ borderRadius: 8 }}>Success</b> Total object will be added: <b> {fileData.length}</b></span>
                                                <br />
                                                {Array.from(fileProps).map((file, index) => (
                                                    <div key={index}>
                                                        <span><b className='text-white bg-success' style={{ borderRadius: 8 }}>Success</b> File size <b> {Math.round(file.size / 1024)} KB</b></span><br />
                                                        <span><b className='text-white bg-success' style={{ borderRadius: 8 }}>Success</b> File name <b>{file.name}</b></span>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                    </div>
                                    <div className='File-footer'><button onClick={() => handleRemoveData()}>Remove</button></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='add-range-modal-footer'>
                    <button className="bottom-close" onClick={() => handleIsOpen(!isOpen)}>Close</button>
                    <button className="bottom-submit" onClick={() => { handleSubmit() }}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default PhotoCreateRange;
