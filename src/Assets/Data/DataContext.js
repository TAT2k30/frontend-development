import React, { createContext } from 'react';

const DataContext = createContext();
function DataProvider({ children }) {
    return (
        <div>
            <DataContext.Provider value={values}>
                {children}
            </DataContext.Provider>
        </div>
    );
}


export default DataProvider;