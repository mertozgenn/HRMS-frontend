import axios from "axios";

export default class ImageService{
    getByUserId(id){
        return axios.get("http://localhost:8080/api/images/getByUserId?userId=" + id)
    }

    add(image, userId){
        return axios.post("http://localhost:8080/api/images/add?userId=" + userId, image)
    }
}