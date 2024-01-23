import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../../Assets/Data/baseUrl';
import { DataContext } from '../../Assets/Data/DataContext';
import { getItem } from '../../Services/apiService';
import './ListUser.css';
function ListUser(props) {
    const { token } = useContext(DataContext);
    const [listUser, setListUser] = useState([]);
    const IsUserOnline = () => {
        const lastLoginTime = new Date(token.LastLoginTime.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "20$3-$1-$2"));
        const currentTime = new Date();
        const timeDifference = currentTime - lastLoginTime;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        
        const onlineThreshold = 5;
      
        if (minutesDifference <= onlineThreshold) {
          return 'Online';
        } else {
          const hours = Math.floor(minutesDifference / 60);
          const minutes = minutesDifference % 60;
      
          if (hours > 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
          } else {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
          }
        }
      };
      
      
    useEffect(() => {
        async function getAllAccounts() {
            try {
                const response = await axios.get(`${baseUrl}/User`);
                console.log(response.data);
                setListUser(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        getAllAccounts();
    }, []);

    return (
        <div className="card mt-4">
        <div className="card-header">
          <h2>User Data</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '10px' }}>
        <b>{token.UserName}</b>
        <div><b className={token.Status == "Offline" ? "text-secondary":"text-success"}>{token.Status}</b></div>
        <div><b className={IsUserOnline() === 'Online' ? 'text-success' : 'text-secondary'}>{IsUserOnline()}</b></div>

      </span>
      <img src={token.AvatarUrl} width={50} className='img-thumbnail' alt="User Avatar" />
    </div>
        </div>
        <div className="card-body">
          {listUser.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((user, index) => (
                  <tr key={index}>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.gender ? "Male" : "Female"}</td>
                    <td><b className={user.role === "Admin" ? "text-danger" : "text-primary"}>{user.role}</b></td>
                    <td>
                    
                      <button className="btn btn-primary actions-btn">Edit</button>
                      <button className="btn btn-danger actions-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>There is no data</span>
          )}
        </div>
      </div>
    );
  }
export default ListUser;
