import React, { useContext, useEffect, useState, useRef } from 'react';
import './UserCreateImage.scss';
import axios from 'axios';
import { DataContext } from '../../../Assets/Data/DataContext';
import { baseUrl } from '../../../Assets/Data/baseUrl';
import imgUpload from '../../../../src/Assets/Image/UploadImgIcn-removebg-preview.png';
import { faXmark, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserCreateImage(props) {
  const [userImgUrl, setUserImgUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const { token } = useContext(DataContext);
  const inputFileRef = useRef(null);
  const dashedBoxRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.post(`${baseUrl}/Image/${token.UserId}`);
        setUserImgUrl(response.data.data.$values);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchUserImages();
  },[]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(Array.from(selectedFiles));
    // Chỉ cập nhật fileNames khi có nhập liệu mới
    if (!fileNames.length) {
      const names = Array.from(selectedFiles).map(file => file.name);
      setFileNames(names);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!files.length) {
      alert('Please select at least one image file.');
      return;
    }
  
    const formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
      if (!fileNames[i]) {
        formData.append('fileNames', files[i].name); 
      } else {
        formData.append('fileNames', fileNames[i]);
      }
    }
  
    formData.append('userID', token ? token.UserId : 0);
  
    try {
      // for (const [key, value] of formData.entries()) {
      //   console.log(`Field name: ${key}`);
      //   if (value instanceof File) {
      //     console.log(value);
      //   } else {
      //     console.log(`Field value: ${value}`);
      //   }
      // }
      
      const response = await axios.post(`${baseUrl}/Image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      setFiles([]);
      alert('Images uploaded successfully.');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    }
  };


  const handleDeleteImage = async (index) => {
    try {
      const response = await axios.delete(`${baseUrl}/Image/${userImgUrl[index].id}`);
      if (response.status === 200) {
        const updatedImages = [...userImgUrl];
        updatedImages.splice(index, 1);
        setUserImgUrl(updatedImages);
        alert('Image deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const handleDashedBoxClick = () => {
    inputFileRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const updatedFiles = [...files, ...droppedFiles];
    setFiles(updatedFiles);
    const names = droppedFiles.map(file => file.name);
    setFileNames(prevState => [...prevState, ...names]);
  };
  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    const updatedFileNames = [...fileNames];
    updatedFileNames.splice(index, 1);
    setFileNames(updatedFileNames);
  };



  return (
    <div className="userCreate-form">
      <div className={`drap-drop-image`}>
        <div
          className={`dashed-box ${dragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          ref={dashedBoxRef}
          onClick={handleDashedBoxClick}
          style={{ opacity: dragging ? 0.6 : 1 }}
        >
          <img src={imgUpload} alt="Upload" />
          <input type="file" ref={inputFileRef} onChange={handleFileChange} multiple style={{ display: 'none' }} />
          <div>Drag & Drop Image here</div>
        </div>
        {files.length > 0 && (
          <div className="img-lists">
            <div className="image-container">
              {Array.from(files).map((file, index) => (
                <div key={index} className="file-info">
                  <div className="file-preview">
                    <img id={`img-preview-${index}`} src={URL.createObjectURL(file)} alt={`Uploaded Image ${index}`} className="img-thumbnail" />
                  </div>
                  <div className="file-details">
                    <input className='form-control' value={fileNames[index]} onChange={(e) => {
                      const newFileNames = [...fileNames];
                      newFileNames[index] = e.target.value;
                      setFileNames(newFileNames);
                    }} />
                    <p>File size: {Math.round(file.size / 1024)} KB</p>
                  </div>
                  <button className="delete-dropDrag" onClick={() => handleDeleteFile(index)}>
                    <FontAwesomeIcon icon={faXmark} className="delete-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <h2>Your uploaded images</h2>
      <h3 style={{ color: '#4caf50' }}>Images remaining: {userImgUrl.length}</h3>
      <div className="user-img-list">
        {userImgUrl.map((imgUrl, index) => (
         <div className="user-img-item" key={index}>
         {imgUrl && imgUrl.imageUrl && <img src={imgUrl.imageUrl} alt={`User Image ${index}`} title={imgUrl.title} />}
         <button className="delete-btn" onClick={() => handleDeleteImage(index)}>
           <FontAwesomeIcon icon={faDeleteLeft} size='2x'/>
         </button>
       </div>
       
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Upload</button>
      </form>
    </div>
  );

}

export default UserCreateImage;
