import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import Favorites from './Favorites'

export default function Navi() {

    const {favoriteAdverts} = useSelector(state => state.favorites)

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
    return (
        <div>
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={NavLink} exact to="/" name='İş ilanları' />

                    <Menu.Item as={NavLink} exact to="/employers" name='İş verenler' />

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

                    <Menu.Menu position='right'>
                        {favoriteAdverts.length > 0 &&
                            <Favorites />
                        }
                        {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
