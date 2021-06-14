import React, { useEffect, useState } from 'react'
import JobAdvertService from '../services/jobAdvertService'
import { Item, Card, Container, Header } from 'semantic-ui-react'
import { useParams } from 'react-router'

export default function JobAdvertDetail() {

    let {id} = useParams()

    const [jobAdvert, setjobAdvert] = useState({})
    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getById(id).then(result => setjobAdvert(result.data.data))
    })
    return (
        <div>
            <Item>
                <Item.Content>
                    <Item.Header as='h1'>{jobAdvert.employer?.companyName}</Item.Header>
                    <Item.Meta>Yayınlanma Tarihi: {jobAdvert.publishingDate?.substring(0, 10)}  -  Son Başvuru Tarihi: {jobAdvert.applicationDeadline?.substring(0, 10)}</Item.Meta>
                    <Item.Description>
                        <p></p>
                        <Card.Group>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Pozisyon</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.position?.name}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Şehir</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.city?.name}
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
                                    <Card.Header>Açık Pozisyon</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.openPosition}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Çalışma Şekli</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.workplaceWork? "İş yerinde" : ""}
                                        <p/>
                                        {jobAdvert.remoteWork? "Uzaktan" : ""}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Çalışma Süresi</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.fullTime? "Tam Zamanlı" : ""}
                                        <p/>
                                        {jobAdvert.partTime? "Yarı Zamanlı" : ""}
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
