import axios from "axios";

export default class UserService{
    getById(id){
        return axios.get("http://localhost:8080/api/users/getById?id=" + id)
    }
}