import React, { useEffect, useState } from 'react'
import { Icon, Table, Button } from 'semantic-ui-react'
import JobAdvertService from '../services/jobAdvertService'

export default function EmployerJobAdverts() {

    const [jobAdverts, setjobAdverts] = useState([])

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getByEmployerId(6).then(result => setjobAdverts(result.data.data))
    }, [])

    function handleMakePassive(jobAdvert) {
        jobAdvert.active = false
        console.log(jobAdvert)
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.update(jobAdvert).then(()=>{
            jobAdvertService.getByEmployerId(6).then(result => setjobAdverts(result.data.data))
        })
    }

    function handleMakeActive(jobAdvert) {
        jobAdvert.active = true
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.update(jobAdvert).then(()=>{
            jobAdvertService.getByEmployerId(6).then(result => setjobAdverts(result.data.data))
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
                                {jobAdvert.active &&
                                    <Table.Cell>
                                        <Button color="red" onClick={()=> handleMakePassive(jobAdvert)} animated>
                                            <Button.Content visible>Pasifleştir</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name='close' />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                }

                                {!jobAdvert.active &&
                                    <Table.Cell>
                                        <Button color="green" onClick={()=> handleMakeActive(jobAdvert)} animated>
                                            <Button.Content visible>Aktifleştir</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name='check' />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                }

                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>
        </div>
    )
}
