import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Table, Button, Divider } from 'semantic-ui-react'
import JobAdvertService from '../services/jobAdvertService'
import EmployerService from '../services/employerService'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function JobAdvertList() {

    const [jobAdverts, setjobAdverts] = useState([])
    const [employers, setEmployers] = useState([])

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getallByActiveAndApprovedSortedByDate().then(result => setjobAdverts(result.data.data))

        let employerService = new EmployerService()
        employerService.getByApproved().then(result => setEmployers(result.data.data))
    }, [])

    function handleFilter(filter) {
        setjobAdverts(jobAdverts.filter(jobAdvert => jobAdvert.employer.id === parseInt(filter.userId)))
    }

    return (
        <div>
            <Formik
                initialValues={{ userId: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.userId) {
                        errors.userId = 'Required';
                    }
                    return errors;
                }}
                onSubmit= {(values) => handleFilter(values)}
            >
                {({ isSubmitting }) => (
                        <Form>
                        <label>Şirkete göre filtrele:</label>
                        <Field as="select"
                                        name="userId"
                                    >   <option  defaultValue>İş yeri seçin</option>
                                        {
                                            employers.map(employer => (<option key={employer.id} value={parseInt(employer.id)}>{employer.companyName}</option>))
                                        }
                                    </Field>
                        <ErrorMessage name="userId" component="div" />
                        <Button size="mini" type="submit" style={{marginLeft : "0.7em"}} disabled={isSubmitting}>
                            Filtrele
                        </Button>
                    </Form>
                )}
            </Formik>
            <Divider/>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Şirket</Table.HeaderCell>
                        <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                        <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
                        <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobAdverts.map(jobAdvert => (
                            <Table.Row key={jobAdvert.id}>
                                <Table.Cell>{jobAdvert.employer.companyName}</Table.Cell>
                                <Table.Cell>{jobAdvert.position.name}</Table.Cell>
                                <Table.Cell>{jobAdvert.openPosition}</Table.Cell>
                                <Table.Cell>{jobAdvert.publishingDate.substring(0,10)}</Table.Cell>
                                <Table.Cell>{jobAdvert.applicationDeadline.substring(0,10)}</Table.Cell>
                                <Table.Cell>
                                    <Button primary as={NavLink} to={`/jobadverts/${jobAdvert.id}`} animated>
                                        <Button.Content visible>Detaya Git</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>
        </div>
    )
}
