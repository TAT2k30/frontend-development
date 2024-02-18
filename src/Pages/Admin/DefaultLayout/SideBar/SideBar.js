
import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';

function SideBar({ sidebarVisible, toggleSidebar }) {
    return (
        <div className={`sidebar ${sidebarVisible ? '' : 'collapsed'}`}>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
    );
}

export default SideBar;
