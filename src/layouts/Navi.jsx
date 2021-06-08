import React from 'react'
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react'

export default function Navi() {
    return (
        <div>
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item
                        name='İş ilanları'
                    />
                    <Menu.Item
                        name='İş verenler'
                    />
                    <Menu.Item
                        name='İş arayanlar'
                    />
                    <Menu.Item
                        name="Profilim"
                    />
                    <Menu.Item
                        name="İş İlanı Ekle"
                    />
                    <Menu.Item
                        name="Verdiğim İlanlar"
                    />
                    <Menu.Menu position='right'>
                        <Dropdown item text='Hoşgeldiniz'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Bilgileri Düzenle</Dropdown.Item>
                                <Dropdown.Item>Çıkış Yap</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item>
                            <Button primary>Giriş Yap</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button primary>Kayıt ol</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
