import React, { useEffect, useState } from 'react'
import { Grid, TextArea } from 'semantic-ui-react'
import PositionService from '../services/positionService'
import JobAdvertService from '../services/jobAdvertService'
import CityService from '../services/cityService'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom'

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
                validate={values => {
                    const errors = {};
                    if (!values.positionId) {
                        errors.positionId = 'Required';
                    }
                    if (!values.openPosition) {
                        errors.openPosition = 'Required';
                    }
                    if (!values.cityId) {
                        errors.cityId = 'Required';
                    }
                    if (!values.applicationDeadline) {
                        errors.applicationDeadline = 'Required';
                    }
                    if (!values.jobDescription) {
                        errors.jobDescription = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <label>Pozisyon:</label>
                                    <Field as="select"
                                        name="positionId"
                                    >
                                        {
                                            positions.map(position => (<option key={position.id} value={parseInt(position.id)}>{position.name}</option>))
                                        }
                                    </Field>
                                    <ErrorMessage name="positionId" component="div" />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>Açık Pozisyon Sayısı:</label>
                                    <Field type="number" name="openPosition" placeholder="Açık Pozisyon" />
                                    <ErrorMessage name="openPosition" component="div" />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <label>Minimum Maaş:</label>
                                    <Field type="number" name="minimumSalary" placeholder="Minimum Maaş" />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>Maksimum Maaş:</label>
                                    <Field type="number" name="maximumSalary" placeholder="Maksimum Maaş" />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <label>Şehir:</label>
                                    <Field as="select"
                                        name="cityId"
                                    >
                                        {
                                            cities.map(city => (<option key={city.id} value={parseInt(city.id)}>{city.name}</option>))
                                        }
                                    </Field>
                                    <ErrorMessage name="cityId" component="div" />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <label>Son başvuru Tarihi:</label>
                                    <Field type="date" name="applicationDeadline" />
                                    <ErrorMessage name="applicationDeadline" component="div" />
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
