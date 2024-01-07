import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/users",
})

// const user = {
//     lastname: lastName,
//     firstname: firstName,
//     email: email
// }
const UserService = {
    
    // createUser: (lastname, firstname, email) => axios({method: 'POST', url:'http://localhost:3000/users', data: {
    //     lastname, firstname, email
    // }})
    createUser: (user) => api.post('http://localhost:3000/users', user),

    getUsers: () => api.get('http://localhost:3000/users'),

    getUser: (id) => api.get(`http://localhost:3000/users/${id}`),

    editUser: (user) => api.put(`http://localhost:3000/users/${user.id}`, user),

    deleteUser: (user) => api.delete(`http://localhost:3000/users/${user.id}`)

}

export default UserService
