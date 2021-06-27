import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Table, Button } from 'semantic-ui-react'
import JobAdvertService from '../services/jobAdvertService'

export default function JobAdvertListToApprove() {

    const [jobAdverts, setjobAdverts] = useState([])

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getByNotApproved().then(result => setjobAdverts(result.data.data))
    }, [])

    function handleApprove(jobAdvert) {
        jobAdvert.approved = true
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.update(jobAdvert).then(()=>{
            jobAdvertService.getByNotApproved().then(result => setjobAdverts(result.data.data))
        })
    }

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Şirket</Table.HeaderCell>
                        <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                        <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
                        <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
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
                                <Table.Cell>{jobAdvert.publishingDate.substring(0, 10)}</Table.Cell>
                                <Table.Cell>{jobAdvert.applicationDeadline.substring(0, 10)}</Table.Cell>
                                <Table.Cell>
                                    <Button color="green" onClick={()=> handleApprove(jobAdvert)} animated>
                                        <Button.Content visible>Onayla</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='checkmark' />
                                        </Button.Content>
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="blue" as={NavLink} to={`/jobadverts/${jobAdvert.id}`} animated>
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
