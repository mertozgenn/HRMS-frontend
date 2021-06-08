import axios from "axios";

export default class EmployerService{
    getAll(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getByEmail(email){
        return axios.get("http://localhost:8080/api/employers/getByEmail?email=" + email)
    }

    getById(id){
        return axios.get("http://localhost:8080/api/employers/getById?id=" + id)
    }
}