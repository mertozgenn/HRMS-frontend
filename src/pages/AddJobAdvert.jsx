import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Input, Select, TextArea } from 'semantic-ui-react'
import PositionService from '../services/positionService'
import CityService from '../services/cityService'

export default function AddJobAdvert() {
    const [positions, setpositions] = useState([])

    const [cities, setcities] = useState([])

    useEffect(() => {
        let positionService = new PositionService()
        positionService.getAll().then(result => setpositions(result.data.data))

        let cityService = new CityService()
        cityService.getAll().then(result => setcities(result.data.data))
    }, [])
    return (
        <div>
             <Form>
                    <p></p>
                    <Form.Group>
                        <Grid>
                        <Grid.Row>
                            <Grid.Column width = {3}>
                            <Form.Field
                                control={Select}
                                label='Pozisyon Seçin'
                                required
                                options={positions.map(position => ({ key: position.id, text: position.name, value: position.name }))}
                                placeholder='Pozisyonlar'
                            />
                            </Grid.Column>
                            <Grid.Column width={3}>
                            <Form.Field
                                control={Input}
                                label='Açık Pozisyon Sayısı'
                                required
                                type="number"
                                placeholder='Açık Pozisyon Sayısı'
                            />
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <Form.Field
                                control={Input}
                                label='Minimum Maaş'
                                type="number"
                                placeholder='Minimum Maaş'
                            />
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <Form.Field
                                control={Input}
                                type="number"
                                label='Maksimum Maaş'
                                placeholder='Maximum Maaş'
                            />
                            </Grid.Column>
                            <Grid.Column width={3}>
                            <Form.Field
                                control={Select}
                                label='Şehir Seçin'
                                required
                                options={cities.map(city => ({ key: city.id, text: city.name, value: city.name }))}
                                placeholder='Şehirler'
                            />
                            </Grid.Column>
                            <Grid.Column width={3}>
                            <Form.Field
                                control={Input}
                                type="date"
                                required
                                label='Son Başvuru Tarihi'
                            />
                            </Grid.Column>
                            
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                            <Form.Field
                                control={TextArea}
                                style={{ minHeight: 300 }}
                                label='Açıklamalar'
                            />
                            </Grid.Column>
                            
                        </Grid.Row>
                        </Grid>
                    </Form.Group>
                    <Form.Field as="" control={Button}>Ekle</Form.Field>
                </Form>
        </div>
    )
}
