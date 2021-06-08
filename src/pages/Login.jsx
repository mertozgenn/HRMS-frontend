import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function Login() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Şifre</label>
                        <input type="password" placeholder='Şifre' />
                    </Form.Field>
                    <Button type='submit'>Giriş Yap</Button>
                </Form>
            </Grid>
        </div>
    )
}
