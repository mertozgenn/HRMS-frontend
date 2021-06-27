import React from 'react'
import { Button, Grid, Label } from 'semantic-ui-react'
import * as Yup from "yup"
import { Formik, Form } from 'formik'
import HRMSTextInput from '../utilities/customFormControls/HRMSTextInput'

export default function EmployerRegister() {
    return (
        <div>
            <Formik
                initialValues={{ companyName: '', website: '', email: '', phoneNumber: '', password: '' }}
                validationSchema={Yup.object({
                    companyName: Yup.string().required("Şirket adı gerekli"),
                    website: Yup.string().required("Web sitesi gerekli"),
                    email: Yup.string().email().required("Email gerekli"),
                    phoneNumber: Yup.number().required("Telefon numarası gerekli"),
                    password: Yup.string().required("Parola Zorunlu"),
                })}
                onSubmit={(values) => { console.log(values) }}
            >
                {({ isSubmitting }) => (
                    <Form className="ui form">
                        <Grid centered>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label basic pointing="right">Şirket adı</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="Şirket adı" name="companyName" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label basic pointing="right">Web sitesi</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="Web sitesi" name="website" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label basic pointing="right">Email</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="email" name="email" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label basic pointing="right">Telefon Numarası</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="Telefon Numarası" type="number" name="phoneNumber" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label basic pointing="right">Parola</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="parola" name="password" type="password" />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <p />
                        <Button primary type="submit" disabled={isSubmitting}>
                            Kayıt Ol
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
