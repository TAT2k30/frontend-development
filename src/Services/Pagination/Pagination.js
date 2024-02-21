import { faRightLong, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Pagination.scss';

function Pagination({ totalPost, postPerPage, currentPage, setCurrentPage }) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination-container'>
            <button className='pagination-button' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faLeftLong} size="2x" />
            </button>
            <div className='page-number'>
                {pages.map((page, index) => (
                    <button
                        key={index}
                        className='pagination-button'
                        style={page === currentPage ? { backgroundColor: "#f0f0f0" } : {}}
                        onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}
            </div>
            <button className='pagination-button' onClick={() => {setCurrentPage(currentPage + 1)}} disabled={setCurrentPage === pages.length}>
                <FontAwesomeIcon icon={faRightLong} size='2x' />
            </button>
        </div>
    );
}

export default Pagination;
