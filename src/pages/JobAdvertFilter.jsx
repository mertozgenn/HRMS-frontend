import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react'
import { Menu, Button, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
import EmployerService from '../services/employerService';
import CityService from '../services/cityService';
import HRMSSelectInput from '../utilities/customFormControls/HRMSSelectInput'

export default function JobAdvertFilter({ setjobAdverts, jobAdverts, pageSize, handleChangePageSize }) {
    const [employers, setEmployers] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        let employerService = new EmployerService()
        employerService.getByApproved().then(result => setEmployers(result.data.data))

        let cityService = new CityService()
        cityService.getAll().then(result => { setCities(result.data.data) })
    }, [])

    function handleCompanyFilter(filter) {
        setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.employer.id === parseInt(filter.userId)))
    }

    function handleCityFilter(filter) {
        setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.city.id === parseInt(filter.id)))
    }

    function handleTypeFilter(filter) {
        console.log(filter)
        if (filter.remoteWork) {
            setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.remoteWork))
        }

        if (filter.workplaceWork) {
            setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.workplaceWork === filter.workplaceWork))
        }

        if (filter.fullTime) {
            setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.fullTime === filter.fullTime))
        }

        if (filter.partTime) {
            setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.partTime === filter.partTime))
        }
    }
    return (
        <div>
            <Menu pointing vertical>
            <Menu.Item>
                    <Formik
                        initialValues={{ pageSize: pageSize }}
                        onSubmit={(values) => handleChangePageSize(values.pageSize)}
                    >
                        <Form className="ui form">
                            <label>Bir sayfada şu kadar ilan göster:</label>
                            <Field as="select"
                                name="pageSize"
                            >   
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </Field>
                            <ErrorMessage name="pageSize" component="div" />
                            <p/>
                            <Button size="mini" type="submit" style={{ marginLeft: "0.7em" }}>
                                Değiştir
                            </Button>
                        </Form>
                    </Formik>
                </Menu.Item>
                <Menu.Item>
                    <Formik
                        initialValues={{ userId: '' }}
                        validationSchema={Yup.object({
                            userId: Yup.number().required()
                        })}
                        onSubmit={(values) => handleCompanyFilter(values)}
                    >
                        <Form className="ui form">
                            <label>Şirkete göre filtrele:</label>
                            <Field as="select"
                                name="userId"
                            >   <option defaultValue>Seçin</option>
                                {
                                    employers.map(employer => (<option key={employer.id} value={parseInt(employer.id)}>{employer.companyName}</option>))
                                }
                            </Field>
                            <ErrorMessage name="userId" component="div" />
                            <p/>
                            <Button size="mini" type="submit" style={{ marginLeft: "0.7em" }}>
                                Filtrele
                            </Button>
                        </Form>
                    </Formik>
                </Menu.Item>
                <Menu.Item>
                    <Formik
                        initialValues={{ id: '' }}
                        validationSchema={Yup.object({
                            id: Yup.number().required()
                        })}
                        onSubmit={(values) => handleCityFilter(values)}
                    >
                        <Form className="ui form">
                            <label>Şehire göre filtrele:</label>
                            <HRMSSelectInput name="id" list={cities} />
                            <p/>
                            <Button size="mini" type="submit" style={{ marginLeft: "0.7em" }}>
                                Filtrele
                            </Button>
                        </Form>
                    </Formik>
                </Menu.Item>
                <Menu.Item>
                    <Formik
                        initialValues={{ remoteWork: false, workplaceWork: false, fullTime: false, partTime: false }}
                        onSubmit={(values) => handleTypeFilter(values)}
                    >
                        <Form className="ui form">
                            <label>Çalışma şekline göre filtrele:</label>
                            <p />
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <label>
                                            <Field type="checkbox" name="remoteWork" />
                                            Uzaktan çalışmaya uygun
                                        </label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <label>
                                            <Field type="checkbox" name="workplaceWork" />
                                            İş yerinde çalışmaya uygun
                                        </label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <label>
                                            <Field type="checkbox" name="fullTime" />
                                            Tam Zamanlı
                                        </label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <label>
                                            <Field type="checkbox" name="partTime" />
                                            Yarı Zamanlı
                                        </label>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <p/>
                            <Button size="mini" type="submit" style={{ marginLeft: "0.7em" }}>
                                Filtrele
                            </Button>
                        </Form>
                    </Formik>
                </Menu.Item>
            </Menu>
        </div >
    )
}
