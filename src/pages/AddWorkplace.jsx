import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function AddWorkplace() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>İşyeri Adı</label>
                        <input placeholder='İşyeri Adı' />
                    </Form.Field>
                    <Button type='submit'>Sisteme Ekle</Button>
                </Form>
            </Grid>
        </div>
    )
}
