import React, { useEffect, useState } from 'react';
import Size from './Size.scss';
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';

function ImageSize(props) {
    const [sizeResult, setSizeResult] = useState([]);

    useEffect(() => {
        const getAllPaperSize = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Size`);
                setSizeResult(response.data.data.$values);
            } catch (error) {
                alert("Error. Please check your console for details.");
                console.error(error);
            }
        };

        getAllPaperSize();
    }, []);

    return (
        <div>
            <h2>Paper Sizes</h2>
            {sizeResult.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Width</th>
                            <th>Height</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizeResult.map((size, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{size.name}</td>
                                <td>{size.dimensions}</td>
                                <td>{size.description}</td>
                                <td>
                                <input/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default ImageSize;
