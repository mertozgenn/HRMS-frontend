import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://www.gercekgundem.com/images/galleries/gallery_11296/df08104b3896e2d8.jpg"/>
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
