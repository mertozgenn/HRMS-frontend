import axios from "axios";

export default class SchoolService{
    getAll(){
        return axios.get("http://localhost:8080/api/schools/getall")
    }

    add(school){
        return axios.post("http://localhost:8080/api/schools/add", school)
    }

    getAllDepartments(){
        return axios.get("http://localhost:8080/api/schooldepartments/getall")
    }

    addDepartment(schoolDepartment){
        return axios.post("http://localhost:8080/api/schooldepartments/add", schoolDepartment)
    }
}