import React, { useEffect, useState } from 'react'
import UserService from '../services/userService'
import * as Yup from "yup"
import { Formik, Form } from 'formik'
import { Grid, Label, Button } from 'semantic-ui-react'
import HRMSTextInput from '../utilities/customFormControls/HRMSTextInput'
import HRMSSelectInput from '../utilities/customFormControls/HRMSSelectInput'
import PositionService from '../services/positionService'
import SystemEmployeeService from '../services/systemEmployeeService'
import EmployerService from '../services/employerService'

export default function UpdateProfile() {
    const [user, setUser] = useState({})
    const [positions, setPositions] = useState([])
    const [employerPendingUpdates, setEmployerPendingUpdates] = useState({})

    useEffect(() => {
        let userService = new UserService()
        userService.getById(6).then(result => setUser(result.data.data))

        let positionService = new PositionService()
        positionService.getAll().then(result => setPositions(result.data.data))

        let employerService = new EmployerService()
        employerService.getPendingUpdatesByUserId(6).then(result => setEmployerPendingUpdates(result.data.data))
    }, [])

    function handleSystemEmployeeUpdate(values) {
        user.name = values.name
        user.surname = values.surname
        user.email = values.email
        user.position.id = values.positionId

        let userService = new UserService()
        let systemEmployeeService = new SystemEmployeeService()
        systemEmployeeService.update(user).then(()=>{
            userService.getById(6).then(result => setUser(result.data.data))
        })
    }

    function handleEmployerUpdate(employerToUpdate) {
        employerToUpdate.userId = user.id
        let employerService = new EmployerService()
        employerService.update(employerToUpdate).then(()=>{
            employerService.getPendingUpdatesByUserId(6).then(result => setEmployerPendingUpdates(result.data.data))
        })
    }
    return (
        <div>
            {user.position &&
                <Formik
                    initialValues={{ name: user.firstName, surname: user.lastName, email: user.email, positionId: user.position.id }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Ad gerekli"),
                        surname: Yup.string().required("Soyad gerekli"),
                        email: Yup.string().email().required("Email gerekli"),
                        positionId: Yup.number().required("Pozisyon Zorunlu"),
                    })}
                    onSubmit={(values) => { handleSystemEmployeeUpdate(values) }}
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
                                        <Label pointing="right">Pozisyon</Label>
                                    </Grid.Column>
                                    <Grid.Column width="9">
                                        <HRMSSelectInput name="positionId" list={positions} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <p />
                            <Button primary type="submit" disabled={isSubmitting}>
                                Güncelle
                            </Button>
                        </Form>
                    )}
                </Formik>
            }

            {user.companyName &&
                <Formik
                    initialValues={{ newWebsite: user.website, newCompanyName: user.companyName, newEmail: user.email, newPhoneNumber: user.phoneNumber }}
                    validationSchema={Yup.object({
                        newWebsite: Yup.string().required("Web sitesi gerekli"),
                        newCompanyName: Yup.string().required("Şirket adı gerekli"),
                        newEmail: Yup.string().email().required("Email gerekli"),
                        newPhoneNumber: Yup.number().required("Telefon numarası gerekli"),
                    })}
                    onSubmit={(values) => { handleEmployerUpdate(values) }}
                >
                    {({ isSubmitting }) => (
                        <Form className="ui form">
                            <Grid centered>
                                <Grid.Row>
                                    <Grid.Column width="2">
                                        <Label pointing="right">Web sitesi</Label>
                                    </Grid.Column>
                                    <Grid.Column width="9">
                                        <HRMSTextInput placeholder="web sitesi" name="newWebsite" />
                                        {employerPendingUpdates?.newWebsite && 
                                        <Label>Değişiklik için onay bekliyor : {employerPendingUpdates.newWebsite}</Label>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width="2">
                                        <Label pointing="right">Şirket adı</Label>
                                    </Grid.Column>
                                    <Grid.Column width="9">
                                        <HRMSTextInput placeholder="şirket adı" name="newCompanyName" />
                                        {employerPendingUpdates?.newCompanyName && 
                                        <Label>Değişiklik için onay bekliyor : {employerPendingUpdates.newCompanyName}</Label>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width="2">
                                        <Label pointing="right">Email</Label>
                                    </Grid.Column>
                                    <Grid.Column width="9">
                                        <HRMSTextInput placeholder="email" name="newEmail" />
                                        {employerPendingUpdates?.newEmail && 
                                        <Label>Değişiklik için onay bekliyor : {employerPendingUpdates.newEmail}</Label>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width="2">
                                        <Label pointing="right">Telefon numarası</Label>
                                    </Grid.Column>
                                    <Grid.Column width="9">
                                        <HRMSTextInput placeholder="telefon numarası" name="newPhoneNumber"/>
                                        {employerPendingUpdates?.newPhoneNumber && 
                                        <Label>Değişiklik için onay bekliyor : {employerPendingUpdates.newPhoneNumber}</Label>}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <p />
                            <Button primary type="submit" disabled={isSubmitting}>
                                Onaya Gönder
                            </Button>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    )
}
