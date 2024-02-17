import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxesPacking, faChevronDown, faListCheck } from '@fortawesome/free-solid-svg-icons';
import './DataAnalytic.scss';

function DataAnalytic(props) {
    return (
        <div className='data-Page'>
            <div className='title'>Analytic Overview</div>
            <div className='analytic-box'>
                <div className='item user-box'>
                    <div className='data'>
                        <div className='number'>5000</div>
                        <div className='text'>Active Accounts</div>
                        <div className='arrow-down'><FontAwesomeIcon icon={faChevronDown}/></div>
                    </div>
                    <div className='icon'>
                        <div className='user-icon'>
                            <FontAwesomeIcon icon={faUsers} size='2x' />
                        </div>
                        <div className='view-detail'>5 Minutes Ago</div>
                    </div>
                </div>
                <div className='item budget-box'>
                    <div className='data'>
                        <div className='number'>47200$</div>
                        <div className='text'>Total Budget</div>
                        <div className='arrow-down'><FontAwesomeIcon icon={faChevronDown}/></div>
                    </div>
                    <div className='icon'>
                        <div className='budget-icon'>
                            <FontAwesomeIcon icon={faBoxesPacking} size='2x' />
                        </div>
                        <div className='view-detail'>Last Month</div>
                    </div>
                </div>
                <div className='item task-box'>
                    <div className='data'>
                        <div className='number'>20</div>
                        <div className='text'>Total Tasks Done</div>
                        <div className='arrow-down'><FontAwesomeIcon icon={faChevronDown}/></div>
                    </div>
                    <div className='icon'>
                        <div className='task-icon'>
                            <FontAwesomeIcon icon={faListCheck} size='2x' />
                        </div>
                        <div className='view-detail'>Last Month</div>
                    </div>
                </div>
                <div className='item budget-box'>
                    <div className='data'>
                        <div className='number'>47200$</div>
                        <div className='text'>Total Budget</div>
                        <div className='arrow-down'><FontAwesomeIcon icon={faChevronDown}/></div>
                    </div>
                    <div className='icon'>
                        <div className='budget-icon'>
                            <FontAwesomeIcon icon={faBoxesPacking} size='2x' />
                        </div>
                        <div className='view-detail'>Last Month</div>
                    </div>
                </div>
                <div className='item budget-box'>
                    <div className='data'>
                        <div className='number'>47200$</div>
                        <div className='text'>Total Budget</div>
                        <div className='arrow-down'><FontAwesomeIcon icon={faChevronDown}/></div>
                    </div>
                    <div className='icon'>
                        <div className='budget-icon'>
                            <FontAwesomeIcon icon={faBoxesPacking} size='2x' />
                        </div>
                        <div className='view-detail'>Last Month</div>
                    </div>
                </div>
                <div className='item budget-box'>
                    <div className='data'>
                        <div className='number'>47200$</div>
                        <div className='text'>Total Budget</div>
                        <div className='arrow-down'><FontAwesomeIcon icon={faChevronDown}/></div>
                    </div>
                    <div className='icon'>
                        <div className='budget-icon'>
                            <FontAwesomeIcon icon={faBoxesPacking} size='2x' />
                        </div>
                        <div className='view-detail'>Last Month</div>
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default DataAnalytic;
