import React, { useEffect, useState } from 'react'
import { Grid, TextArea } from 'semantic-ui-react'
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
            <h2>İş İlanı Ekle</h2>
            <Formik
                initialValues={{
                    positionId: '', openPosition: '', minimumSalary: '', maximumSalary: '',
                    applicationDeadline: '', cityId: '', jobDescription: '', remoteWork: false,
                    workplaceWork: false, fullTime: false, partTime: false
                }}
                validationSchema={Yup.object({
                    positionId : Yup.number().required("Pozisyon gerekli"),
                    openPosition : Yup.number().required("Açık pozisyon sayısı gerekli"),
                    applicationDeadline : Yup.date().required("Son başvuru tarihi gerekli"),
                    cityId : Yup.number().required("Şehir gerekli"),
                    jobDescription : Yup.string().required("Açıklama gerekli")
                })}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                    <Form className="ui form">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <label>Pozisyon:</label>
                                    <HRMSSelectInput name="positionId" list={positions}/>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>Açık Pozisyon Sayısı:</label>
                                    <HRMSTextInput type="number" name="openPosition" placeholder="Açık Pozisyon" />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <label>Minimum Maaş:</label>
                                    <HRMSTextInput type="number" name="minimumSalary" placeholder="Minimum Maaş" />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>Maksimum Maaş:</label>
                                    <HRMSTextInput type="number" name="maximumSalary" placeholder="Maksimum Maaş" />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <label>Şehir:</label>
                                    <HRMSSelectInput name="cityId" list={cities}/>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>Son başvuru Tarihi:</label>
                                    <HRMSTextInput type="date" name="applicationDeadline" />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <label>
                                        <Field type="checkbox" name="remoteWork" />
                                        Uzaktan çalışmaya uygun
                                    </label>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>
                                        <Field type="checkbox" name="workplaceWork" />
                                        İş yerinde çalışmaya uygun
                                    </label>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>
                                        <Field type="checkbox" name="fullTime" />
                                        Tam Zamanlı
                                    </label>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>
                                        <Field type="checkbox" name="partTime" />
                                        Yarı Zamanlı
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <p />
                        <label>Açıklamalar</label>
                        <p />
                        <Field as={TextArea} style={{ minHeight: 300, minWidth: 1000 }} name="jobDescription" />
                        <p />
                        <ErrorMessage name="jobDescription" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
