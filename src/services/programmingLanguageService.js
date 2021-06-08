import axios from "axios";

export default class ProgrammingLanguageService{
    getAll(){
        return axios.get("http://localhost:8080/api/programmingLanguages/getall")
    }

    add(programmingLanguage){
        return axios.post("http://localhost:8080/api/programmingLanguages/add", programmingLanguage)
    }
}