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

    getByNotApproved(){
        return axios.get("http://localhost:8080/api/employers/getByNotApproved")
    }
    getByApproved(){
        return axios.get("http://localhost:8080/api/employers/getByApproved")
    }

    update(employer){
        return axios.post("http://localhost:8080/api/employers/update", employer)
    }
}