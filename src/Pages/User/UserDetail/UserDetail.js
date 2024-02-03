// In UserDetail component
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDetail() {
  const tokenLocal = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenLocal === null) {
      const customData = { message: "You must log in first", type: "error" };
      navigate("/", { state: customData });
    }
  }, [tokenLocal]);

  return (
    <div>
      This is user Detail
    </div>
  );
}

export default UserDetail;
