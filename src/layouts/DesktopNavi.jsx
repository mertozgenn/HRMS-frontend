import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Container, Menu, Segment, Visibility } from 'semantic-ui-react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import Favorites from './Favorites'

export default function DesktopNavi() {
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

    const [fixed, setFixed] = useState(false)

    function showFixedMenu() {
        setFixed(true)
    }

    function hideFixedMenu() {
        setFixed(false)
    }
    return (
        <div>
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                <Segment
                    inverted
                    textAlign='center'
                    vertical
                >
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
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
                                <Menu.Item as={NavLink} exact to="/approve/employer" name="İşverenleri Onayla" />
                            }

                            <Menu.Menu position='right'>
                                {favoriteAdverts.length > 0 &&
                                    <Favorites />
                                }
                                {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Segment>
            </Visibility>
        </div>
    )
}
