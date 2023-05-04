const { createContext } = require("react");

const AdminContext = createContext({
    allFood: [],
    setAllFood: () => { },
    users: [],
    setUsers: () => { },
    sales: null,
    setSales: () => { },
    allContact: [],
    setAllContact: () => { }
})

export default AdminContext;