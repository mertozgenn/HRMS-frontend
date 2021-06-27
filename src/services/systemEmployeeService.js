import axios from "axios";

export default class SystemEmployeeService{
    update(systemEmployee){
        return axios.post("http://localhost:8080/api/systemEmployees/add", systemEmployee)
    }
}