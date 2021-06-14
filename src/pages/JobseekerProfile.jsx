import React, { useEffect, useState } from 'react'
import JobseekerService from '../services/jobseekerService'
import { Item, Card, Container, Header, Divider } from 'semantic-ui-react'
import JobseekerCVService from '../services/jobseekerCVService'
import ImageService from '../services/imageService'
import { useParams } from 'react-router'

export default function JobseekerProfile() {

    let { id } = useParams()

    const [jobseeker, setjobseeker] = useState({})

    const [CVInfo, setCVInfo] = useState({})

    const [jobseekerEducations, setjobseekerEducation] = useState([])
    const [jobseekerLanguages, setjobseekerLanguage] = useState([])
    const [jobseekerProgrammingLanguages, setjobseekerProgrammingLanguages] = useState([])
    const [workExperiences, setworkExperiences] = useState([])
    const [jobseekerImage, setjobseekerImage] = useState()

    useEffect(() => {

        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.getEducationsByUserIdSortedByGraduationYearDesc(id).then(result => setjobseekerEducation(result.data.data))
        jobseekerCVService.getLanguagesByUserId(id).then(result => setjobseekerLanguage(result.data.data))
        jobseekerCVService.getProgrammingLanguagesByUserId(id).then(result => setjobseekerProgrammingLanguages(result.data.data))
        jobseekerCVService.getWorkExperiencesByUserIdSortedByQuitYearDesc(id).then(result => setworkExperiences(result.data.data))
        jobseekerCVService.getByUserId(id).then(result => setCVInfo(result.data.data))

        let imageService = new ImageService()
        imageService.getByUserId(id).then(result => setjobseekerImage("https://res.cloudinary.com/dex8fj7po/image/upload/v1622567361/" + result.data.data)).catch(error =>{
            console.log(error)
        })

        let jobseekerService = new JobseekerService()
        jobseekerService.getById(id).then(result => setjobseeker(result.data.data))
    }, [id])
    return (
        <div>
            <Item>
                <Item.Image size="small" src={jobseekerImage} />
                <Item.Content>
                    <Item.Header as='h1'>{jobseeker?.firstName} {jobseeker?.lastName}</Item.Header>
                    <Item.Description>
                        <p>{CVInfo?.coverLetter}</p>
                        <p>GitHub Address : <a href={"https://www." + CVInfo?.githubAddress}>{CVInfo?.githubAddress}</a></p>
                        <p>LinkedIn Address : <a href={"https://www." + CVInfo?.linkedinAddress}>{CVInfo?.linkedinAddress}</a></p>
                    </Item.Description>
                </Item.Content>
            </Item>
            <Divider />
            <Container text>
                <Header as='h2'>Eğitimler</Header>
                <p></p>
            </Container>
            <Card.Group>
                {jobseekerEducations.map(education => (
                    <Card key={education.id}>
                        <Card.Content>
                            <Card.Header>{education.school.name}</Card.Header>
                            <Card.Description>
                                {education.schoolDeparment.name}
                                <p></p>
                                {education.startingYear} - {education.graduationYear === 0 ? "Devam Ediyor" : education.graduationYear}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Divider />
            <Container text>
                <Header as='h2'>Diller</Header>
                <p></p>
            </Container>
            <Card.Group>
                {jobseekerLanguages.map(language => (
                    <Card key={language.id}>
                        <Card.Content>
                            <Card.Header>{language.language.name}</Card.Header>
                            <Card.Description>
                                Seviye : {language.level}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Divider />
            <Container text>
                <Header as='h2'>Programlama Dilleri</Header>
                <p></p>
            </Container>
            <Card.Group>
                {jobseekerProgrammingLanguages.map(pl => (
                    <Card key={pl.id}>
                        <Card.Content>
                            <Card.Header>{pl.programmingLanguage.name}</Card.Header>
                            <Card.Description>
                                Seviye : {pl.level}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Divider />
            <Container text>
                <Header as='h2'>İş Deneyimleri</Header>
                <p></p>
            </Container>
            <Card.Group>
                {workExperiences.map(workExperience => (
                    <Card key={workExperience.id}>
                        <Card.Content>
                            <Card.Header>{workExperience.workplace.name}</Card.Header>
                            <Card.Meta>{workExperience.startingYear} - {workExperience.quitYear === 0 ? "Devam Ediyor" : workExperience.quitYear}</Card.Meta>
                            <Card.Description>
                                Pozisyon: {workExperience.position.name}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Divider />
        </div>
    )
}
