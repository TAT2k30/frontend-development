import React, { useEffect } from 'react';
import Size from './Size.scss';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';
function ImageSize(props) {
    useEffect(()=>{
        const GetAllPaperSize = async () => await axios.get(`${baseUrl}/Image`)
        .then(res=>{
            console.log(res.data.data.$value);
        }).catch(err=>{
            console.log(err);
        });


        GetAllPaperSize();
    },[]);
    return (
        <div>
            Paper size page.
        </div>
    );
}

export default ImageSize;