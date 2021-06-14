import React, { useEffect, useState } from 'react'
import { Icon, Table, Button } from 'semantic-ui-react'
import EmployerService from '../services/employerService'

export default function EmployerListToApprove() {

    const [employers, setEmployers] = useState([])

    useEffect(() => {
        let employerService = new EmployerService()
        employerService.getByNotApproved().then(result => setEmployers(result.data.data))
    }, [])

    function handleApprove(employer) {
        employer.systemVerified = true
        let employerService = new EmployerService()
        employerService.update(employer)
        window.location.reload()
    }

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>Website</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Telefon</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employers.map(employer => (
                            <Table.Row key={employer.id}>
                                <Table.Cell>{employer.companyName}</Table.Cell>
                                <Table.Cell>{employer.website}</Table.Cell>
                                <Table.Cell>{employer.email}</Table.Cell>
                                <Table.Cell>{employer.phoneNumber}</Table.Cell>
                                <Table.Cell>
                                    <Button color="green" onClick={()=> handleApprove(employer)} animated>
                                        <Button.Content visible>Onayla</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='checkmark' />
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
