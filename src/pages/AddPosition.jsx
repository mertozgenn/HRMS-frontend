import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function AddPosition() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Pozisyon Adı</label>
                        <input placeholder='Pozisyon Adı' />
                    </Form.Field>
                    <Button type='submit'>Sisteme Ekle</Button>
                </Form>
            </Grid>
        </div>
    )
}
