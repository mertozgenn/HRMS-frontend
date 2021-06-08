import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, Divider, Header, Input, Select, Item, TextArea } from 'semantic-ui-react'
import JobseekerCVService from '../services/jobseekerCVService'
import LanguageService from '../services/languageService'
import SchoolService from '../services/schoolService'
import ProgrammingLanguageService from '../services/programmingLanguageService'
import WorkplaceService from '../services/workplaceService'
import PositionService from '../services/positionService'
import ImageService from '../services/imageService'
import JobseekerService from '../services/jobseekerService'

export default function UpdateJobseekerCV() {

    const [languages, setlanguages] = useState([])
    const [jobseekerLanguages, setjobseekerLanguages] = useState([])
    const [jobseekerEducations, setjobseekerEducation] = useState([])
    const [schools, setschools] = useState([])
    const [departments, setdepartments] = useState([])
    const [jobseekerProgrammingLanguages, setjobseekerProgrammingLanguages] = useState([])
    const [programmingLanguages, setprogrammingLanguages] = useState([])
    const [workExperiences, setworkExperiences] = useState([])
    const [workplaces, setworkplaces] = useState([])
    const [positions, setpositions] = useState([])
    const [jobseekerImage, setjobseekerImage] = useState()

    const [jobseeker, setjobseeker] = useState({
        id: 0,
        firstName: "",
        lastName: "",
    })

    const [CVInfo, setCVInfo] = useState({
        githubAddress: " ",
        linkedinAddress: " ",
        coverLetter: " "
    })

    useEffect(() => {
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.getByUserId(1).then(result => setCVInfo(result.data.data))
        jobseekerCVService.getLanguagesByUserId(1).then(result => setjobseekerLanguages(result.data.data))
        jobseekerCVService.getEducationsByUserIdSortedByGraduationYearDesc(1).then(result => setjobseekerEducation(result.data.data))
        jobseekerCVService.getProgrammingLanguagesByUserId(1).then(result => setjobseekerProgrammingLanguages(result.data.data))
        jobseekerCVService.getWorkExperiencesByUserIdSortedByQuitYearDesc(1).then(result => setworkExperiences(result.data.data))

        let schoolService = new SchoolService()
        schoolService.getAll().then(result => setschools(result.data.data))
        schoolService.getAllDepartments().then(result => setdepartments(result.data.data))

        let programmingLanguageService = new ProgrammingLanguageService()
        programmingLanguageService.getAll().then(result => setprogrammingLanguages(result.data.data))

        let languageService = new LanguageService()
        languageService.getAll().then(result => setlanguages(result.data.data))

        let workplaceService = new WorkplaceService()
        workplaceService.getAll().then(result => setworkplaces(result.data.data))

        let positionService = new PositionService()
        positionService.getAll().then(result => setpositions(result.data.data))

        let imageService = new ImageService()
        imageService.getByUserId(1).then(result => setjobseekerImage("https://res.cloudinary.com/dex8fj7po/image/upload/v1622567361/" + result.data.data))

        let jobseekerService = new JobseekerService()
        jobseekerService.getById(1).then(result => setjobseeker(result.data.data))
    }, [])
    
    return (
        <div>
            <Item>
                <Item.Image size="small" src={jobseekerImage} />
                <Item.Content>
                    <Item.Header as='h1'>{jobseeker.firstName} {jobseeker.lastName}</Item.Header>
                    <Item.Description>
                        <Form>
                            <Form.Group>
                                <TextArea value={CVInfo.coverLetter} />
                                <Form.Field
                                    control={Input}
                                    label='GitHub Address'
                                    value={CVInfo.githubAddress}
                                />
                                <Form.Field
                                    control={Input}
                                    label='LinkedIn Address'
                                    placeholder={CVInfo.linkedinAddress}
                                    value = {CVInfo.linkedinAddress}
                                />
                            </Form.Group>
                        </Form>
                    </Item.Description>
                </Item.Content>
            </Item>
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
                        <Card.Content extra>
                            <Button basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>Eğitim Ekle</Header>
            </Container>
            <Form>
                <Form.Group>
                    <Form.Field
                        control={Select}
                        label='Okul Seçin'
                        options={schools.map(school => ({ key: school.id, text: school.name, value: school.name }))}
                        placeholder='Okullar'
                    />
                    <Form.Field
                        control={Select}
                        label='Bölüm Seçin'
                        options={departments.map(department => ({ key: department.id, text: department.name, value: department.name }))}
                        placeholder='Bölümler'
                    />
                    <Form.Field
                        control={Input}
                        label='Başlangıç Yılı'
                        placeholder='2010'
                    />
                    <Form.Field
                        control={Input}
                        label='Mezuniyet Yılı'
                        placeholder='2014'
                    />
                </Form.Group>
                <Form.Field as="" control={Button}>Ekle</Form.Field>
            </Form>
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
                        <Card.Content extra>
                            <Button basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>Dil Ekle</Header>
            </Container>
            <Form>
                <Form.Group>
                    <Form.Field
                        control={Select}
                        label='Dil Seçin'
                        options={languages.map(language => ({ key: language.id, text: language.name, value: language.name }))}
                        placeholder='Diller'
                    />
                    <Form.Field
                        control={Input}
                        label='Seviye'
                        placeholder='1-5'
                    />
                </Form.Group>
                <Form.Field as="" control={Button}>Ekle</Form.Field>
            </Form>
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
                        <Card.Content extra>
                            <Button basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>Programlama Dili veya Teknolojisi Ekle</Header>
            </Container>
            <Form>
                <Form.Group>
                    <Form.Field
                        control={Select}
                        label='Programlama Dili veya teknolojisi Seçin'
                        options={programmingLanguages.map(pl => ({ key: pl.id, text: pl.name, value: pl.name }))}
                        placeholder='Programlama Dilleri'
                    />
                    <Form.Field
                        control={Input}
                        label='Seviye'
                        placeholder='1-5'
                    />
                </Form.Group>
                <Form.Field as="" control={Button}>Ekle</Form.Field>
            </Form>
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
                        <Card.Content extra>
                            <Button basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>İş Deneyimi Ekle</Header>
            </Container>
            <Form>
                <Form.Group>
                    <Form.Field
                        control={Select}
                        label='İşyeri Seçin'
                        options={workplaces.map(workplace => ({ key: workplace.id, text: workplace.name, value: workplace.name }))}
                        placeholder='Okullar'
                    />
                    <Form.Field
                        control={Select}
                        label='Pozisyon Seçin'
                        options={positions.map(position => ({ key: position.id, text: position.name, value: position.name }))}
                        placeholder='Bölümler'
                    />
                    <Form.Field
                        control={Input}
                        label='Başlangıç Yılı'
                        placeholder='2010'
                    />
                    <Form.Field
                        control={Input}
                        label='Çıkış Yılı'
                        placeholder='2014'
                    />
                </Form.Group>
                <Form.Field as="" control={Button}>Ekle</Form.Field>
            </Form>
        </div>
    )
}