import React, { useEffect, useState } from 'react'
import JobAdvertService from '../services/jobAdvertService'
import { Item, Card, Button, Divider, Container, Header } from 'semantic-ui-react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { addToFavorites } from '../store/actions/favoritesActions'
import { toast } from 'react-toastify'

export default function JobAdvertDetail() {

    const dispatch = useDispatch()

    let { id } = useParams()

    const [jobAdvert, setjobAdvert] = useState({})

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getById(id).then(result => setjobAdvert(result.data.data))
    },[id])

    const handleAddToFavorites = (jobAdvert) => {
        dispatch(addToFavorites(jobAdvert))
        toast.success("Favorilere eklendi")
    }

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
                                        {jobAdvert.workplaceWork ? "İş yerinde" : ""}
                                        <p />
                                        {jobAdvert.remoteWork ? "Uzaktan" : ""}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Çalışma Süresi</Card.Header>
                                    <Card.Description>
                                        {jobAdvert.fullTime ? "Tam Zamanlı" : ""}
                                        <p />
                                        {jobAdvert.partTime ? "Yarı Zamanlı" : ""}
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
                    <Divider/>
                    <Item.Extra>
                        <Button onClick={() => {handleAddToFavorites(jobAdvert)}}>Favorilere Ekle</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        </div>
    )
}
