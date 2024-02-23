import React from 'react';
import ImageSize from './Size/ImageSize.js';
import ImageFrame from './Frame/ImageFrame.js';
import PhotoCreateRange from './PhotoPopup/PhotoCreateRange.js'
import './Image.scss'
function Image(props) {
    return (
        <div className='photo-properties-container'>
            <ImageSize/>
            <ImageFrame/>
        </div>
    );
}

export default Image;