import React from 'react';
import loadingGif from '../../Assets/Image/loading.gif';
import './LoadingImg.scss'
function LoadingImg(props) {
    return (
        <div className='loading-component-container'>
            <img src={loadingGif} width={750}/>
            <div className='loading-text'>Loading data...</div>
        </div>
    );
}

export default LoadingImg;