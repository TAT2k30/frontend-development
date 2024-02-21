import React, { useEffect, useState } from 'react';
import './ImageFrame.scss'
import axios from 'axios';
import { baseUrl } from '../../../../Assets/Data/baseUrl';


function ImageFrame(props) {
    const [frameResult, setFrameResult] = useState([]);

    useEffect(() => {
        const getAllPaperFrame = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Frame`);
                setFrameResult(response.data.data.$values);
            } catch (error) {
                alert("Error. Please check your console for details.");
                console.error(error);
            }
        };

        getAllPaperFrame();
    }, []);

    return (
        <div>
            <h2>Photo frame</h2>
            {frameResult.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Height</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {frameResult.map((frame, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{frame.name}</td>
                                <td>{frame.description}</td>
                                <td>{frame.status}</td>
                                <td>
                                    <input />
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

export default ImageFrame;