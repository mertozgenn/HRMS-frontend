import React from 'react'
import { Button, Grid, Label } from 'semantic-ui-react'
import * as Yup from "yup"
import { Formik, Form } from 'formik'
import HRMSTextInput from '../utilities/customFormControls/HRMSTextInput'

export default function JobseekerRegister() {
    return (
        <div>
            <Formik
                initialValues={{ name: '', surname: '', email: '', nationalIdentity: '', yearOfBirth: '', password: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Ad gerekli"),
                    surname: Yup.string().required("Soyad gerekli"),
                    email: Yup.string().email().required("Email gerekli"),
                    nationalIdentity: Yup.number().required("Kimlik numarası gerekli"),
                    yearOfBirth: Yup.number().required("Doğum yılı zorunlu"),
                    password: Yup.string().required("Parola Zorunlu"),
                })}
                onSubmit={(values) => { console.log(values)}}
            >
                {({ isSubmitting }) => (
                    <Form className="ui form">
                        <Grid centered>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label pointing="right">Ad</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="Ad" name="name" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label pointing="right">Soyad</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="Soyad" name="surname" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label pointing="right">Email</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="email" name="email" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label pointing="right">TC Kimlik No</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput placeholder="TC Kimlik No" type="number" name="nationalIdentity" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label pointing="right">Doğum Yılı</Label>
                                </Grid.Column>
                                <Grid.Column width="9">
                                    <HRMSTextInput type="number" placeholder="Doğum yılı" name="yearOfBirth" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width="2">
                                    <Label pointing="right">Parola</Label>
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
