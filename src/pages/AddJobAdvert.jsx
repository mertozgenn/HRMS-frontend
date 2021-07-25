import React, { useEffect, useState } from 'react'
import { Button, Divider, Grid, Header, Segment, TextArea } from 'semantic-ui-react'
import PositionService from '../services/positionService'
import JobAdvertService from '../services/jobAdvertService'
import CityService from '../services/cityService'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom'
import * as Yup from "yup"
import HRMSSelectInput from "../utilities/customFormControls/HRMSSelectInput"
import HRMSTextInput from "../utilities/customFormControls/HRMSTextInput"

export default function AddJobAdvert() {

    const history = useHistory()

    function handleSubmit(jobAdvert) {
        jobAdvert.userId = 6
        let jobAdvertService = new JobAdvertService();
        jobAdvertService.add(jobAdvert)
        history.goBack()
    }
    const [positions, setpositions] = useState([])

    const [cities, setcities] = useState([])

    useEffect(() => {
        let positionService = new PositionService()
        positionService.getAll().then(result => setpositions(result.data.data))

        let cityService = new CityService()
        cityService.getAll().then(result => setcities(result.data.data))
    }, [])
    return (
        <div>
            <Header style={{marginTop:"0.5em"}} as="h2" > İş İlanı Ekle</Header>
            <Divider />
            <Formik
                initialValues={{
                    positionId: '', openPosition: '', minimumSalary: '', maximumSalary: '',
                    applicationDeadline: '', cityId: '', jobDescription: '', remoteWork: false,
                    workplaceWork: false, fullTime: false, partTime: false
                }}
                validationSchema={Yup.object({
                    positionId: Yup.number().required("Pozisyon gerekli"),
                    openPosition: Yup.number().required("Açık pozisyon sayısı gerekli"),
                    applicationDeadline: Yup.date().required("Son başvuru tarihi gerekli"),
                    cityId: Yup.number().required("Şehir gerekli"),
                    jobDescription: Yup.string().required("Açıklama gerekli")
                })}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                    <Form className="ui form">
                        <Grid padded centered>
                            <p />
                            <Segment style={{ padding: '1m 1em', minWidth: 100 }}>
                                <label>Pozisyon:</label>
                                <HRMSSelectInput name="positionId" list={positions} />

                                <label>Açık Pozisyon Sayısı:</label>
                                <HRMSTextInput type="number" name="openPosition" placeholder="Açık Pozisyon" />
                            </Segment>

                            <Segment style={{ minHeight: 100, padding: '1em 1em', minWidth: 100 }}>
                                <label>Minimum Maaş:</label>
                                <HRMSTextInput type="number" name="minimumSalary" placeholder="Minimum Maaş" />

                                <label>Maksimum Maaş:</label>
                                <HRMSTextInput type="number" name="maximumSalary" placeholder="Maksimum Maaş" />
                            </Segment>
                            <Segment style={{ padding: '1em 1em', minWidth: 100 }}>
                                <label>Şehir:</label>
                                <HRMSSelectInput name="cityId" list={cities} />
                            </Segment>

                            <Segment style={{ maxHeight: 100, padding: '1em 1em', minWidth: 100 }}>
                                <label>Son başvuru Tarihi:</label>
                                <HRMSTextInput type="date" name="applicationDeadline" />
                            </Segment>

                        </Grid>
                        <Grid container padded centered>
                            <Grid.Column width="6">
                                <Segment style={{ padding: '1em 1em' }}>
                                    <label>
                                        <Field type="checkbox" name="remoteWork" />
                                        Uzaktan çalışmaya uygun
                                    </label>
                                    <p />
                                    <label>
                                        <Field type="checkbox" name="workplaceWork" />
                                        İş yerinde çalışmaya uygun
                                    </label>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width="5">
                                <Segment style={{ padding: '1em 1em'}}>
                                    <label>
                                        <Field type="checkbox" name="fullTime" />
                                        Tam Zamanlı
                                    </label>

                                    <label>
                                        <Field type="checkbox" name="partTime" />
                                        Yarı Zamanlı
                                    </label>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <p />
                        <label>Açıklamalar</label>
                        <p />
                        <Field as={TextArea} style={{ minHeight: 300, minWidth: 100 }} name="jobDescription" />
                        <p />
                        <ErrorMessage name="jobDescription" component="div" />
                        <Button type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
