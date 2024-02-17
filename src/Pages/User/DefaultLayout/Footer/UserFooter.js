import React from 'react';
import './UserFooter.scss';

function UserFooter(props) {
    return (
        <div className="footer-container">
            <div className="footer-links">
                <span>
                    <a href='/'><b>Help</b></a> | <a href='/'><b>Website Accessibility</b></a> | <a href='/'><b>Terms & Conditions</b></a> | <a href='/'><b>Privacy Notice</b></a> | <a href='/'><b>Cookie Notice</b></a> | <a href='/'><b>Pricing</b></a>
                </span>
            </div>
            <div className="social-media">
                Connect with us
            </div>
        </div>
    );
}

export default UserFooter;
