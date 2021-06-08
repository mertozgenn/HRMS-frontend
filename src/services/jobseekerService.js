import axios from "axios";

export default class JobseekerService{
    getAll(){
        return axios.get("http://localhost:8080/api/jobseekers/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobseekers/getById?id=" + id)
    }
}