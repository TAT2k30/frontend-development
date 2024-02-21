import React, { useEffect, useState } from 'react';
import './Print.scss';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';

function Print(props) {
    const [printData, setPrintData] = useState([]);

    useEffect(() => {
        const getAllPrint = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Product`);
                setPrintData(response.data.data.$values);
            } catch (error) {
                console.error("Error fetching print data:", error);
            }
        };
        getAllPrint();
    }, []);
    const filteredPrintData = printData.filter(item => item.name === "Prints");
    console.log(filteredPrintData);

    return (
        <div className='product-print-container'>
            {/* Hiển thị dữ liệu đã lọc */}
        </div>
    );
}

export default Print;
