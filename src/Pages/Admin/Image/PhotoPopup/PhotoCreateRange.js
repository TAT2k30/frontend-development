import React, { useState } from 'react';

function PhotoCreateRange(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    const handleSubmit = () => {
        // Xử lý submit dữ liệu từ text area
        console.log('Submitted:', textAreaValue);
        // Đóng modal sau khi submit
        setIsOpen(false); // Sửa đổi ở đây
        // Xử lý dữ liệu ở đây (gửi tới server, xử lý dữ liệu, vv.)
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Create range photo</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span> 
                        <h2>Create Range Photo</h2>
                        <textarea
                            value={textAreaValue}
                            onChange={handleChange}
                            placeholder="Enter your text here..."
                            rows={4}
                            cols={50}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoCreateRange;
