import { Formik, Form } from 'formik'
import React from 'react'
import { Button, Grid, Label } from 'semantic-ui-react'
import * as Yup from "yup"
import HRMSTextInput from '../utilities/customFormControls/HRMSTextInput'

export default function Login() {
    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email().required("Email gerekli"),
                    password: Yup.string().required("Parola Zorunlu"),
                })}
                onSubmit={(values) => { console.log(values) }}
            >
                {({ isSubmitting }) => (
                    <Form className="ui form">
                        <Grid padded centered>
                            <Grid.Row>
                                <Label pointing="right">Email</Label>
                                <HRMSTextInput placeholder="email" name="email" />
                                </Grid.Row>
                            <Grid.Row>
                                <Label pointing="right">Parola</Label>
                                <HRMSTextInput placeholder="parola" name="password" type="password" />
                            </Grid.Row>
                        </Grid>
                        <p />
                        <Button primary type="submit" disabled={isSubmitting}>
                            Giriş Yap
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
