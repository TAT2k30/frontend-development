import React, { useRef, useState } from 'react';

function CreatePage(props) {
    return (
        <div>
            {start && <div>{gift}</div>}
            <button onClick={getGift} disabled={start} className=''>
                Start
            </button>
            <button onClick={stopGift} disabled={!start} className=''>
                Stop
            </button>
        </div>
    );
}

export default CreatePage;
