import React, { createContext, useContext, useState } from 'react';

const UpdateEditContext = createContext();

const UpdateEditProvider = ({ children }) => {
    const [ openEdit, setOpenEdit, openNew, setOpenNew, selectedUser, setSelectedUser ] = useState("");

    return (
        <UpdateEditContext.Provider value={{ openEdit, setOpenEdit, openNew, setOpenNew, selectedUser, setSelectedUser}}>
            {children}
        </UpdateEditContext.Provider>
    );
};

export { UpdateEditProvider, UpdateEditContext };