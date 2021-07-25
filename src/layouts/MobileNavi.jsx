import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Favorites from './Favorites'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'

export default function MobileNavi() {
    const { favoriteAdverts } = useSelector(state => state.favorites)

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [isEmployer, setIsEmployer] = useState(true)

    const [isJobseeker, setIsJobseeker] = useState(true)

    const [isSystemEmployer, setIsSystemEmployer] = useState(true)

    const history = useHistory()

    function handleSignOut() {
        setIsAuthenticated(false)
        history.push("/")
    }

    function handleSignIn() {
        setIsAuthenticated(true)
    }
    const [sidebarOpened, setSidebarOpened] = useState(false)
    function handleSidebarHide() {
        setSidebarOpened(false)
    }

    function handleToggle() {
        setSidebarOpened(true)
    }
    return (
        <div>
            <Sidebar
                as={Menu}
                animation='overlay'
                inverted
                onHide={handleSidebarHide}
                vertical
                visible={sidebarOpened}
            >
                <Container>
                    <Menu.Item as={NavLink} exact to="/" name='Ana sayfa' />

                    <Menu.Item as={NavLink} exact to="/jobadverts" name='İş ilanları' />

                    <Menu.Item as={NavLink} exact to="/employers" name='İşverenler' />

                    <Menu.Item as={NavLink} exact to="/jobseekers" name='İş arayanlar' />

                    {isJobseeker &&
                        <Menu.Item as={NavLink} exact to="/profile" name="Profilim" />
                    }

                    {isEmployer &&
                        <Menu.Item as={NavLink} exact to="/add/jobadvert" name="İş İlanı Ekle" />
                    }

                    {isEmployer &&
                        <Menu.Item as={NavLink} exact to="/myAdverts" name="Verdiğim İlanlar" />
                    }

                    {isSystemEmployer &&
                        <Menu.Item as={NavLink} exact to="/approve/jobadvert" name="İlanları Onayla" />
                    }

                    {isSystemEmployer &&
                        <Menu.Item as={NavLink} exact to="/approve/employer" name="İş verenleri Onayla" />
                    }
                </Container>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened}>
                <Segment
                    inverted
                    textAlign='center'
                    vertical
                >
                    <Container>
                        <Menu inverted pointing secondary size='large'>
                            <Menu.Item onClick={handleToggle}>
                                <Icon name='sidebar' />
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                {favoriteAdverts.length > 0 &&
                                    <Favorites />
                                }
                                {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
                            </Menu.Menu>
                        </Menu>
                    </Container>
                </Segment>
            </Sidebar.Pusher>
        </div>
    )
}
