import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'

export default function Footer() {
    return (
        <div style={{ marginTop:'2em'}}>    
            <Segment inverted vertical style={{ padding: '3em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Hakkımızda' />
                                <List link inverted>
                                    <List.Item as='a'>Site Haritası</List.Item>
                                    <List.Item as='a'>Bize Ulaşın</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Sayfalar' />
                                <List link inverted>
                                    <List.Item as={NavLink} exact to="/jobadverts">İş İlanları</List.Item>
                                    <List.Item as={NavLink} exact to="/employers">İşverenler</List.Item>
                                    <List.Item as={NavLink} exact to="/jobseekers">İş Arayanlar</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    HRMS Project
                                </Header>
                                <a href="https://www.github.com/mertozgenn/HRMS-frontend" rel="noreferrer" target="_blank">
                                    www.github.com/mertozgenn/HRMS-frontend
                                </a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}
