import axios from "axios";

export default class EmployerService{
    getAll(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getAllPendingUpdates(){
        return axios.get("http://localhost:8080/api/employers/getallPendingUpdates")
    }

    getPendingUpdatesByUserId(userId){
        return axios.get("http://localhost:8080/api/employers/getPendingUpdatesByUserId?userId=" + userId)
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

    update(employerToUpdate){
        return axios.post("http://localhost:8080/api/employers/update", employerToUpdate)
    }

    confirmUpdate(employerToUpdate){
        return axios.post("http://localhost:8080/api/employers/confirmUpdate", employerToUpdate)
    }
}