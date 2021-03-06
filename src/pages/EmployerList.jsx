import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import EmployerService from '../services/employerService'

export default function EmployerList() {
    const [employers, setemployers] = useState([])

    useEffect(() => {
        let employerService = new EmployerService()
        employerService.getByApproved().then(result => setemployers(result.data.data))
    }, [])

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>Website</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Telefon</Table.HeaderCell>
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
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>
        </div>
    )
}

