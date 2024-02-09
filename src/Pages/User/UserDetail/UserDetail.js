import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import "./UserDetail.scss";
import { DataContext } from '../../../Assets/Data/DataContext';
import axios from 'axios';
import { baseUrl } from '../../../Assets/Data/baseUrl';

function UserDetail() {
  const tokenLocal = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/User/${token.UserId}`);
        setUserDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
      setLoading(false);
    };

    if (tokenLocal === null) {
      const customData = { message: "You must log in first", type: "error" };
      navigate("/", { state: customData });
    } else {
      fetchData();
    }
  }, [tokenLocal, token.UserId, navigate]);

  return (
    <div className='userDetail-form'>
      {loading ? (
        <p>Loading...</p>
      ) : userDetail ? (
        <div className="user-detail-container">
          <Card className="user-detail-card">
            <Card.Img variant="top" src={userDetail.avatarUrl} className="user-avatar" />
            <Card.Body>
              <Card.Title>User Detail</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {userDetail.id} <br />
                <strong>Username:</strong> {userDetail.userName} <br />
                <strong>Email:</strong> {userDetail.email} <br />
                <strong>Gender:</strong> {userDetail.gender ? "Male" : "Female"} <br />
              </Card.Text>
              <Button variant="primary">Edit Profile</Button>
              
            </Card.Body>
          </Card>
        </div>
      ) : ( 
        <>
          <p>Error loading user detail.</p>
          <button onClick={() => { localStorage.removeItem("token"); }}>Click me</button>
        </>
      )}
    </div>
  );
}

export default UserDetail;
