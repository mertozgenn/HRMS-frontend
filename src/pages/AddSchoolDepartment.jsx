import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function AddSchoolDepartment() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Bölüm Adı</label>
                        <input placeholder='Bölüm Adı' />
                    </Form.Field>
                    <Button type='submit'>Sisteme Ekle</Button>
                </Form>
            </Grid>
        </div>
    )
}
