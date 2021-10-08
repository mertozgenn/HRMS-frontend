import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://cdn.pixabay.com/photo/2016/02/10/21/59/landscape-1192669_1280.jpg"/>
                <Dropdown pointing="top left" text="Mert">
                <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} exact to="/update-profile" text="Bilgilerim" icon="info"/>
                    <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
