import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function EmployerRegister() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Şirket Adı</label>
                        <input placeholder='Şirket Adı' />
                    </Form.Field>
                    <Form.Field>
                        <label>Website</label>
                        <input placeholder='Website' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Telefon Numarası</label>
                        <input type="number" placeholder='Telefon Numarası' />
                    </Form.Field>
                    <Form.Field>
                        <label>Şifre</label>
                        <input type="password" placeholder='Şifre' />
                    </Form.Field>
                    <Form.Field>
                        <label>Şifre Tekrar</label>
                        <input type="password" placeholder='Şifre Tekrar' />
                    </Form.Field>
                    <Button type='submit'>Kayıt Ol</Button>
                </Form>
            </Grid>
        </div>
    )
}
