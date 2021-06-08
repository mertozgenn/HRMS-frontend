import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function JobseekerRegister() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Ad</label>
                        <input placeholder='Ad' />
                    </Form.Field>
                    <Form.Field>
                        <label>Soyad</label>
                        <input placeholder='Soyad' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>TC Kimlik No</label>
                        <input type="number" placeholder='TC Kimlik No' />
                    </Form.Field>
                    <Form.Field>
                        <label>Doğum Yılı</label>
                        <input type="number" placeholder='Doğum Yılı' />
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
