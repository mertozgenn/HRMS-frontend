import React, { useEffect, useState } from 'react'
import JobAdvertService from '../services/jobAdvertService'
import { Item, Card, Container, Header } from 'semantic-ui-react'

export default function JobAdvertDetail() {
    const [jobAdvert, setjobAdvert] = useState({
        id: 0,
        jobDescription: "",
        minimumSalary: 0,
        maximumSalary: 0,
        openPosition: 0,
        applicationDeadline: "",
        publishingDate: "",
        city: {
            name: ""
        },
        position: {
            name: ""
        },
        employer: {
            companyName: ""
        }
    })
    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getById(3).then(result => setjobAdvert(result.data.data))
    })
    return (
        <div>
            <Item>
                <Item.Content>
                    <Item.Header as='h1'>{jobAdvert.employer.companyName}</Item.Header>
                    <Item.Meta>Yayınlanma Tarihi: {jobAdvert.publishingDate.substring(0, 10)}  -  Son Başvuru Tarihi: {jobAdvert.applicationDeadline.substring(0, 10)}</Item.Meta>
                    <Item.Description>
                        <p></p>
                        <Card.Group>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Pozisyon</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.position.name}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Şehir</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.city.name}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Maaş Aralığı</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.minimumSalary} - {jobAdvert.maximumSalary}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Açık Poziston</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.openPosition}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                        <Container text>
                            <Header as='h2'>Açıklamalar</Header>
                            <p>
                            {jobAdvert.jobDescription}
                            </p>
                        </Container>
                    </Item.Description>
                </Item.Content>
            </Item>
        </div>
    )
}
