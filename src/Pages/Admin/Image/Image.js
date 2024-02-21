import React from 'react';
import ImageSize from './Size/ImageSize.js';
import ImageFrame from './Frame/ImageFrame.js';

function Image(props) {
    return (
        <div>
            <ImageSize/>
            <ImageFrame/>
        </div>
    );
}

export default Image;