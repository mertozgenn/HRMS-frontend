import axios from "axios";

export default class JobAdvertService{
    getAll(){
        return axios.get("http://localhost:8080/api/jobadverts/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobadverts/getById?id=" + id)
    }

    getAllActive(){
        return axios.get("http://localhost:8080/api/jobadverts/getallActive")
    }

    getAllByActiveAndEmployer(employer){
        return axios.get("http://localhost:8080/api/jobadverts/getallByActiveAndEmployer?employerId=" + employer)
    }

    getAllByActiveSortedByDate(){
        return axios.get("http://localhost:8080/api/jobadverts/getallByActiveSortedByDate")
    }

    add(jobAdvert){
        return axios.post("http://localhost:8080/api/jobadverts/add", jobAdvert)
    }
}