import axios from "axios";
const baseUrl = `http://localhost:3004/users`;

class UserService {
  getData = async (params) => {
    const request = await axios.get(baseUrl, {
      params,
    });
    return request;
  };
}

export default UserService;
