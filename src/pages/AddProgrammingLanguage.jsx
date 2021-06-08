import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function AddProgrammingLanguage() {
    return (
        <div>
            <Grid centered>
                <Form>
                    <p></p>
                    <Form.Field>
                        <label>Programlama Dili veya Teknolojisi Adı</label>
                        <input placeholder='Programlama Dili veya Teknolojisi Adı' />
                    </Form.Field>
                    <Button type='submit'>Sisteme Ekle</Button>
                </Form>
            </Grid>
        </div>
    )
}
