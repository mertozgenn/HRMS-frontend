import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Icon, Table } from 'semantic-ui-react'
import JobseekerService from '../services/jobseekerService'

export default function JobseekerList() {
    const [jobseekers, setjobseekers] = useState([])

    useEffect(() => {
        let jobseekerService = new JobseekerService()
        jobseekerService.getAll().then(result => setjobseekers(result.data.data))
    }, [])

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Ad</Table.HeaderCell>
                        <Table.HeaderCell>Soyad</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobseekers.map(jobseeker => (
                            <Table.Row key={jobseeker.id}>
                                <Table.Cell>{jobseeker.firstName}</Table.Cell>
                                <Table.Cell>{jobseeker.lastName}</Table.Cell>
                                <Table.Cell>{jobseeker.email}</Table.Cell>
                                <Table.Cell width={3}>
                                    <Button as={NavLink} to={`/jobseekers/${jobseeker.id}`} primary animated color="blue">
                                        <Button.Content visible>Profili Görüntüle</Button.Content>
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
