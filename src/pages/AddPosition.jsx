import PositionService from '../services/positionService'
import { Formik, Form} from 'formik';
import React from 'react'
import * as Yup from "yup"
import HRMSTextInput from "../utilities/customFormControls/HRMSTextInput"
import { Button } from 'semantic-ui-react';

export default function AddPosition() {

    function handleSubmit(position) {
        let positionService = new PositionService();
        positionService.add(position)
    }

    return (
        <div>
            <h2>Sisteme Pozisyon Ekle</h2>
            <Formik
                initialValues={{ name: ''}}
                validationSchema={Yup.object({
                    name : Yup.string().required("Pozisyon İsmi Gerekli")
                })}
                onSubmit= {(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                        <Form class="ui form">
                        <HRMSTextInput placeholder="Pozisyon adı" name="name"/>
                        <Button primary type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
