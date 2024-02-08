import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'; // Import các thành phần từ Bootstrap
import "./UserDetail.scss";
import { DataContext } from '../../../Assets/Data/DataContext';

function UserDetail() {
  const tokenLocal = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenLocal === null) {
      const customData = { message: "You must log in first", type: "error" };
      navigate("/", { state: customData });
    }
  }, [tokenLocal]);

  const { token } = useContext(DataContext);

  return (
    <div className='userDetail-form'>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>User Detail</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">ID: {token.id}</Card.Subtitle>
          <Card.Text>
            Username: {token.UserName} <br />
            Email: {token.Email} <br />
            Gender: {token.Gender ? "Male" : "Female"} <br />
            Date of Birth: {token.DateOfBirth}
          </Card.Text>
          <Button variant="primary">Edit Profile</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserDetail;
