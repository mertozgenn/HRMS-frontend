import axios from "axios";

export default class JobAdvertService{
    getAll(){
        return axios.get("http://localhost:8080/api/jobadverts/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobadverts/getById?id=" + id)
    }

    getByEmployerId(id){
        return axios.get("http://localhost:8080/api/jobadverts/getByEmployerId?id=" + id)
    }

    getByNotApproved(){
        return axios.get("http://localhost:8080/api/jobadverts/getByNotApproved")
    }

    getAllActiveApproved(){
        return axios.get("http://localhost:8080/api/jobadverts/getallActiveAndApproved")
    }

    getallByActiveAndApprovedAndEmployer(employer){
        return axios.get("http://localhost:8080/api/jobadverts/getallByActiveAndApprovedAndEmployer?employerId=" + employer)
    }

    getallByActiveAndApprovedSortedByDate(){
        return axios.get("http://localhost:8080/api/jobadverts/getallByActiveAndApprovedSortedByDate")
    }

    add(jobAdvert){
        return axios.post("http://localhost:8080/api/jobadverts/add", jobAdvert)
    }

    update(jobAdvert){
        return axios.post("http://localhost:8080/api/jobadverts/update", jobAdvert)
    }
}