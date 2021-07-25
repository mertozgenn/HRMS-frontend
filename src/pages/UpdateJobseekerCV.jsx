import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Divider, Header, Grid, Item, TextArea, CardGroup } from 'semantic-ui-react'
import JobseekerCVService from '../services/jobseekerCVService'
import LanguageService from '../services/languageService'
import SchoolService from '../services/schoolService'
import ProgrammingLanguageService from '../services/programmingLanguageService'
import WorkplaceService from '../services/workplaceService'
import PositionService from '../services/positionService'
import ImageService from '../services/imageService'
import JobseekerService from '../services/jobseekerService'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { Link, NavLink } from 'react-router-dom'
import HRMSTextInput from '../utilities/customFormControls/HRMSTextInput'
import * as Yup from "yup"
import HRMSSelectInput from '../utilities/customFormControls/HRMSSelectInput'

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


    let image
    function handleImagePreview(e) {
        image = e.target.files[0]
    }
    function handleSubmitFile() {
        if (image !== null) {
            let formData = new FormData();
            formData.append('file', image);
            if (formData.get("file") !== "undefined") {
                let imageService = new ImageService()
                imageService.add(formData, 1).then(() => {
                    imageService.getByUserId(1).then(result => setjobseekerImage("https://res.cloudinary.com/dex8fj7po/image/upload/v1622567361/" + result.data.data))
                })
            }
        }
    }
    function handleCVInfoSubmit(CVInfo) {
        CVInfo.userId = 1
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.add(CVInfo).then(() => {
            jobseekerCVService.getByUserId(1).then(result => setCVInfo(result.data.data))
        })
    }

    function handleEducationSubmit(education) {
        education.userId = 1
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.addEducation(education).then(() => {
            jobseekerCVService.getEducationsByUserIdSortedByGraduationYearDesc(1).then(result => setjobseekerEducation(result.data.data))
        })
    }

    function handleLanguageSubmit(language) {
        language.userId = 1
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.addLanguage(language).then(() => {
            jobseekerCVService.getLanguagesByUserId(1).then(result => setjobseekerLanguages(result.data.data))
        })
    }

    function handleProgrammingLanguageSubmit(programmingLanguage) {
        programmingLanguage.userId = 1
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.addProgrammingLanguage(programmingLanguage).then(() => {
            jobseekerCVService.getProgrammingLanguagesByUserId(1).then(result => setjobseekerProgrammingLanguages(result.data.data))
        })
    }

    function handleWorkExperienceSubmit(workExperience) {
        workExperience.userId = 1
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.addWorkExperience(workExperience).then(() => {
            jobseekerCVService.getWorkExperiencesByUserIdSortedByQuitYearDesc(1).then(result => setworkExperiences(result.data.data))
        })
    }

    function handleDeleteLanguage(language) {
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.deleteLanguage(parseInt(language.id)).then(() => {
            jobseekerCVService.getLanguagesByUserId(1).then(result => setjobseekerLanguages(result.data.data))
        })
    }

    function handleDeleteEducation(education) {
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.deleteEducation(parseInt(education.id)).then(() => {
            jobseekerCVService.getEducationsByUserIdSortedByGraduationYearDesc(1).then(result => setjobseekerEducation(result.data.data))
        })
    }

    function handleDeleteProgrammingLanguage(language) {
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.deleteProgrammingLanguage(parseInt(language.id)).then(() => {
            jobseekerCVService.getProgrammingLanguagesByUserId(1).then(result => setjobseekerProgrammingLanguages(result.data.data))
        })
    }

    function handleDeleteWorkExperience(workExperience) {
        let jobseekerCVService = new JobseekerCVService()
        jobseekerCVService.deleteWorkExperience(parseInt(workExperience.id)).then(() => {
            jobseekerCVService.getWorkExperiencesByUserIdSortedByQuitYearDesc(1).then(result => setworkExperiences(result.data.data))
        })
    }

    return (
        <div>
            <Item>
                <Item.Image size="small" src={jobseekerImage} />
                <CardGroup>
                    <Card centered>
                        <Formik
                            initialValues={{ photo: undefined }}
                            onSubmit={(values) => handleSubmitFile()}
                        >
                            <Form>
                                <Field type="file" name="photo" onChange={handleImagePreview} />
                                <ErrorMessage name="photo" component="div" />
                                <Button type="submit">
                                    Fotoğraf Güncelle
                                </Button>
                            </Form>
                        </Formik>
                    </Card>
                </CardGroup>
                <Item.Content>
                    <Item.Header as='h1'>{jobseeker.firstName} {jobseeker.lastName}</Item.Header>
                    <Item.Description>
                        <Formik
                            initialValues={{ id: CVInfo.id, coverLetter: CVInfo.coverLetter, githubAddress: CVInfo.githubAddress, linkedinAddress: CVInfo.linkedinAddress }}
                            enableReinitialize={true}
                            onSubmit={(values) => handleCVInfoSubmit(values)}
                        >
                            <Form>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <label>Ön Yazı</label>
                                            <p />
                                            <Field as={TextArea} style={{ minHeight: 100, minWidth: 750 }} name="coverLetter" />
                                            <ErrorMessage name="coverLetter" component="div" />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <label>GitHub Adresi: </label>
                                            <Field type="text" name="githubAddress" />
                                            <ErrorMessage name="githubAddress" component="div" />
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <label>LinkedIn Adresi: </label>
                                            <Field type="text" name="linkedinAddress" />
                                            <ErrorMessage name="linkedinAddress" component="div" />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <p />
                                <button type="submit">
                                    Güncelle
                                </button>
                            </Form>
                        </Formik>
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
                        <Card.Content extra>
                            <Button onClick={() => handleDeleteEducation(education)} basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>Eğitim Ekle</Header>
            </Container>
            <Formik
                initialValues={{ schoolId: '', schoolDepartmentId: '', startingYear: '', graduationYear: 0 }}
                validationSchema={Yup.object({
                    schoolId: Yup.number().integer().required("Okul seçmek zorunlu"),
                    schoolDepartmentId: Yup.number().integer().required("Bölüm seçmek zorunlu"),
                    startingYear: Yup.number().integer().required("Başlama yılı zorunlu"),
                    graduationYear: Yup.number().integer()
                })}
                onSubmit={(values) => handleEducationSubmit(values)}
            >
                <Form className="ui form">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <label>Okul Seçin:</label>
                                <HRMSSelectInput name="schoolId" list={schools} />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <label>Bölüm Seçin:</label>
                                <HRMSSelectInput name="schoolDepartmentId" list={departments} />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <label>Başlama Yılı:</label>
                                <HRMSTextInput name="startingYear" />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <label>Mezuniyet Yılı:</label>
                                <HRMSTextInput name="graduationYear" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Link as={NavLink} to="/add/school">Listeye okul eklemek için tıklayın</Link>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Link as={NavLink} to="/add/schooldepartment">Listeye bölüm eklemek için tıklayın</Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <p />
                    <Button type="submit">
                        Ekle
                    </Button>
                </Form>
            </Formik>
            <Divider />
            <Container text>
                <Header as='h2'>Diller</Header>
                <p></p>
            </Container>
            <Card.Group>
                {jobseekerLanguages.map(language => (
                    <Card key={language.id}>
                        <Card.Content>
                            <Card.Header>{language.language?.name}</Card.Header>
                            <Card.Description>
                                Seviye : {language.level}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button onClick={() => handleDeleteLanguage(language)} basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>Dil Ekle</Header>
            </Container>
            <Formik
                initialValues={{ languageId: '', level: '' }}
                validationSchema={Yup.object({
                    languageId: Yup.number().integer().required("Dil seçmek zorunlu"),
                    level: Yup.number().integer().max(5).min(0).required("Seviye girmek zorunlu")
                })}
                onSubmit={(values) => handleLanguageSubmit(values)}
            >
                <Form className="ui form">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <label>Dil Seçin</label>
                                <HRMSSelectInput name="languageId" list={languages} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <label>Seviye:</label>
                                <HRMSTextInput type="number" name="level" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Link as={NavLink} to="/add/language">Listeye dil eklemek için tıklayın</Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button type="submit">
                        Ekle
                    </Button>
                </Form>
            </Formik>
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
                            <Button onClick={() => handleDeleteProgrammingLanguage(pl)} basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>Programlama Dili veya Teknolojisi Ekle</Header>
                <p />
            </Container>
            <Formik
                initialValues={{ programmingLanguageOrTechnologyId: '', level: '' }}
                validationSchema={Yup.object({
                    programmingLanguageOrTechnologyId: Yup.number().integer().required("Dil seçmek zorunlu"),
                    level: Yup.number().integer().max(5).min(0).required("Seviye girmek zorunlu")
                })}
                onSubmit={(values) => handleProgrammingLanguageSubmit(values)}
            >
                <Form className="ui form">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <label>Programlama Dili veya teknolojisi Seçin</label>
                                <HRMSSelectInput name="programmingLanguageOrTechnologyId" list={programmingLanguages} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <label>Seviye:</label>
                                <HRMSTextInput name="level" type="number" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Link as={NavLink} to="/add/programminglanguage">Listeye programlama dili eklemek için tıklayın</Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button type="submit">
                        Ekle
                    </Button>
                </Form>
            </Formik>
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
                            <Button onClick={() => handleDeleteWorkExperience(workExperience)} basic color='red'>
                                Sil
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Container text>
                <Header>İş Deneyimi Ekle</Header>
                <p />
            </Container>
            <Formik
                initialValues={{ workplaceId: '', positionId: '', startingYear: '', quitYear: 0 }}
                validationSchema={Yup.object({
                    workplaceId: Yup.number().integer().required("İş yeri seçmek zorunlu"),
                    positionId: Yup.number().integer().required("Pozisyon seçmek zorunlu"),
                    startingYear: Yup.number().integer().required("Başlama yılı zorunlu"),
                    graduationYear: Yup.number().integer()
                })}
                onSubmit={(values) => handleWorkExperienceSubmit(values)}
            >
                <Form className="ui form">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <label>İş Yeri Seçin</label>
                                <HRMSSelectInput name="workplaceId" list={workplaces} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <label>Pozisyon Seçin</label>
                                <HRMSSelectInput name="positionId" list={positions} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <label>Başlama Yılı:</label>
                                <HRMSTextInput type="number" name="startingYear" />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <label>Çıkış Yılı:</label>
                                <HRMSTextInput type="number" name="quitYear" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Link as={NavLink} to="/add/workplace">Listeye iş yeri eklemek için tıklayın</Link>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Link as={NavLink} to="/add/position">Listeye iş pozisyonu eklemek için tıklayın</Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button type="submit">
                        Ekle
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}