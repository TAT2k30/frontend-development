import React, { useState } from 'react';
import './PhotoCreateRange.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



function PhotoCreateRange({ handleIsOpen, isOpen, photoType }) {
    const [jsonData, setJsonData] = useState({});



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setJsonData(data);
                } catch (error) {
                    console.error('Invalid JSON file');
                }
            };
            reader.readAsText(file);
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
                    <h3>There must be only one file at the time</h3>
                    <div className='addRange-textArea'>
                        <input type="file" accept=".json" onChange={handleFileChange} />
                        <div className='Json-editor'>
                            
                        </div>
                    </div>
                </div>

                <div className='add-range-modal-footer'>
                    <button className="bottom-close" onClick={() => handleIsOpen(!isOpen)}>Close</button>
                    <button className="bottom-submit">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default PhotoCreateRange;
