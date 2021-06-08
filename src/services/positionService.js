import axios from "axios";

export default class PositionService{
    getAll(){
        return axios.get("http://localhost:8080/api/positions/getall")
    }

    add(position){
        return axios.post("http://localhost:8080/api/positions/add", position)
    }
}