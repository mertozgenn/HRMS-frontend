import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'

export default function SignedOut({signIn}) {
    return (
        <div>
            <Menu.Item>
                <Button as={NavLink} to="/login" onClick={signIn} primary>Giriş Yap</Button>
                <Button as={NavLink} to="/register" onClick={signIn} primary style={{marginLeft : "0.5em"}}>Kayıt Ol</Button>
            </Menu.Item>
        </div>
    )
}
