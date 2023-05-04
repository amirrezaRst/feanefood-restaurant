import { createContext } from "react";

const UserContext = createContext({
    userFullName: null,
    setUserFullName: () => { },
    userEmail: null,
    setUserEmail: () => { },
    userPassword: null,
    setUserPassword: () => { }
})
export default UserContext