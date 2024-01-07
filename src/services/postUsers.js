import axios from "axios";

function getUsers(props) {
  const url = "http://localhost:3000/users";
  return axios.get(url);
}

export default getUsers;