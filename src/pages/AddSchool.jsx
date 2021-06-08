import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function AddSchool() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Okul Adı</label>
                        <input placeholder='Okul Adı' />
                    </Form.Field>
                    <Button type='submit'>Sisteme Ekle</Button>
                </Form>
            </Grid>
        </div>
    )
}
