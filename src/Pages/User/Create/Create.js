import React, { useContext, useEffect, useState } from 'react';
import "./Create.scss";
import axios from 'axios';
import { DataContext } from '../../../Assets/Data/DataContext';
import { baseUrl } from '../../../Assets/Data/baseUrl';

function Create(props) {
  const [userImgUrl, setUserImgUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const { token } = useContext(DataContext);

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
    setFiles(e.target.files);
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
    }

    formData.append('userID', token ? token.UserId : 0);

    try {
      const response = await axios.post(`${baseUrl}/Image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response from server:', response.data);
      setUserImgUrl([...userImgUrl, ...response.data.data.$values.map(img => img.imageUrl)]);
      alert('Images uploaded successfully.');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    }
  };

  return (
    <div className='userCreate-form'>
      <h2>Upload Images</h2>
      <div className="user-img-list">
        <h3>User Images:</h3>
       
          {userImgUrl.map((imgUrl, index) => (
           <img key={index} src={imgUrl} alt={`User Image ${index}`} />
          ))}
     
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Image(s): </label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Create;
