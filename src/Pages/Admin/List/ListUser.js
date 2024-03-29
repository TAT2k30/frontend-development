
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../Assets/Data/DataContext';
import './ListUser.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import LoadingImg from '../../../Services/Loading/LoadingImg';

function ListUser(props) {
  //Data
  const { deleteUserById, getAllAccounts, userList, navigate } = useContext(DataContext);
  const [roleFilter, setRoleFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Function
  // const filterUserList = () => {
  //   if (roleFilter === 'Admin') {
  //     return userList.filter(user => user.role === 'Admin');
  //   } else if (roleFilter === 'User') {
  //     return userList.filter(user => user.role === 'User');
  //   } else {
  //     return userList;
  //   }
  // };
  const filterUserList = () => {
    let filteredUsers = userList;
    if (roleFilter) {
      filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
    }
    if (statusFilter) {
      filteredUsers = filteredUsers.filter(user => user.status.toString() === statusFilter);
    }
    if (genderFilter) {
      filteredUsers = filteredUsers.filter(user => user.gender === genderFilter);
    }
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredUsers;
  };

  const IsUserOnline = (time) => {
    if (!time) return ''; // Kiểm tra nếu time là null hoặc không tồn tại, trả về chuỗi rỗng
    const lastLoginTime = new Date(time.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "20$3-$1-$2"));
    const currentTime = new Date();
    const timeDifference = currentTime - lastLoginTime;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutesDifference / 60);
    const minutes = minutesDifference % 60;

    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes === 0) {
      return `Just now`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  useEffect(() => {
    getAllAccounts();

  }, []);

  return (
    <div className='admin-list'>
      <div className="card mt-4">
        <div className="card-header">
          <h2>User Data</h2>
          <div className="user-info">
            <button onClick={() => { navigate("/create") }} className="user-name">Create a new User</button>
            <input
              type="text"
              placeholder="Search users..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="filter-area">
          <label>Filter by Role:</label>
          <input
            type="radio"
            id="adminFilter"
            checked={roleFilter === 'Admin'}
            onChange={() => setRoleFilter('Admin')}
          />
          Admin &nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            id="userFilter"
            checked={roleFilter === 'User'}
            onChange={() => setRoleFilter('User')}
          />
          User &nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            id="allFilter"
            checked={!roleFilter}
            onChange={() => setRoleFilter('')}
          />
          All
          <label>Filter by Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="true">Online</option>
          <option value="false">Offline</option>
        </select>

        <label>Filter by Gender:</label>
        <select onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        </div>
      
        <div className="card-body">
          {filterUserList().length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterUserList().map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="user-info">
                        <img src={user.avatarUrl} alt="User Avatar" className="imgAvatar" />
                        <span className="user-name">{user.userName}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.gender ? 'Male' : 'Female'}</td>
                    <td>
                      <b className={user.role === 'Admin' ? 'text-danger' : 'text-primary'}>{user.role}</b>
                    </td>
                    <td>
                      <span className="user-status">
                        <span className={`status-indicator ${user.status ? 'online' : 'offline'}`} />
                        <span
                          className={`status-text ${user.status ? 'text-success' : 'text-secondary'}`}
                        >
                          {user.status ? 'Online' : 'Offline'}
                        </span>
                        <span
                          className={`last-login ${IsUserOnline(user.lastLoginTime) === 'Online'
                            ? 'text-success'
                            : 'text-secondary'
                            }`}
                        >
                          {IsUserOnline(user.lastLoginTime)}
                        </span>
                      </span>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faPenToSquare} className='actions-btn-edit' />
                      <FontAwesomeIcon icon={faTrash} className='actions-btn-delete' onClick={() => deleteUserById(user.id)} />
                      <FontAwesomeIcon icon={faEye} className='actions-btn-view' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className='user-list-loading'><LoadingImg /></span>
          )}
        </div>
      </div>
    </div>
  );
}


export default ListUser;
