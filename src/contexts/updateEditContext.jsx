import { createContext } from "react";

export const UpdateEditContext = createContext();

export const UpdateEditProvider = ({ children }) => {
    return (
        <UpdateEditContext.Provider value={{}}>
        {children}
        </UpdateEditContext.Provider>
    );
}