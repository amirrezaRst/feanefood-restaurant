import { createContext } from "react";

const AuthorizationContext = createContext({
    FullName: null,
    setFullName: () => { },
    role: null,
    setRole: () => { },
    email: null,
    setEmail: () => { },
    cart: [],
    setCart: () => { },
    id: null,
    setId: () => { }
})
export default AuthorizationContext