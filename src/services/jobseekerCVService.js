import axios from "axios";

export default class JobseekerCVService{
    getByUserId(id){
        return axios.get("http://localhost:8080/api/jobseekerCVInfo/getByUserId?userId=" + id)
    }

    add(jobseekerCVInfo){
        return axios.post("http://localhost:8080/api/jobseekerCVInfo/add", jobseekerCVInfo)
    }

    getEducationsByUserId(id){
        return axios.get("http://localhost:8080/api/jobseekereducations/getByUserId?userId=" + id)
    }

    getEducationsByUserIdSortedByGraduationYearDesc(id){
        return axios.get("http://localhost:8080/api/jobseekereducations/getByUserIdSortedByGraduationYearDesc?userId=" + id)
    }

    addEducation(jobseekerEducation){
        return axios.post("http://localhost:8080/api/jobseekereducations/add", jobseekerEducation)
    }

    deleteEducation(id){
        return axios.post("http://localhost:8080/api/jobseekereducations/delete?id=" + id)
    }

    getLanguagesByUserId(id){
        return axios.get("http://localhost:8080/api/jobseekerlanguages/getByUserId?userId=" + id)
    }

    addLanguage(jobseekerLanguage){
        return axios.post("http://localhost:8080/api/jobseekerlanguages/add", jobseekerLanguage)
    }

    deleteLanguage(id){
        return axios.post("http://localhost:8080/api/jobseekerlanguages/delete?id=" + id)
    }

    getProgrammingLanguagesByUserId(id){
        return axios.get("http://localhost:8080/api/jobseekerProgrammingLanguages/getByUserId?userId=" + id)
    }

    addProgrammingLanguage(jobseekerProgrammingLanguage){
        return axios.post("http://localhost:8080/api/jobseekerProgrammingLanguages/add", jobseekerProgrammingLanguage)
    }

    deleteProgrammingLanguage(id){
        return axios.post("http://localhost:8080/api/jobseekerProgrammingLanguages/delete?id=" + id)
    }

    getWorkExperiencesByUserIdSortedByQuitYearDesc(id){
        return axios.get("http://localhost:8080/api/workexperiences/getByUserIdSortedByQuitYearDesc?userId=" + id)
    }

    addWorkExperience(workExperience){
        return axios.post("http://localhost:8080/api/workexperiences/add", workExperience)
    }

    deleteWorkExperience(id){
        return axios.post("http://localhost:8080/api/workexperiences/delete?id=" + id)
    }
}