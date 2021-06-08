import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function AddLanguage() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Dil Adı</label>
                        <input placeholder='Dil Adı' />
                    </Form.Field>
                    <Button type='submit'>Sisteme Ekle</Button>
                </Form>
            </Grid>
        </div>
    )
}
