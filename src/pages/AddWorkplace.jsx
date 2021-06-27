import WorkplaceService from '../services/workplaceService'
import { Formik, Form} from 'formik';
import React from 'react'
import * as Yup from "yup"
import HRMSTextInput from "../utilities/customFormControls/HRMSTextInput"
import { Button } from 'semantic-ui-react';

export default function AddWorkplace() {
    function handleSubmit(workplace) {
        let workplaceService = new WorkplaceService();
        workplaceService.add(workplace)
    }
    return (
        <div>
            <h2>Sisteme İş Yeri Ekle</h2>
            <Formik
                initialValues={{ name: ''}}
                validationSchema={Yup.object({
                    name : Yup.string().required("İş Yeri İsmi Gerekli")
                })}
                onSubmit= {(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                        <Form class="ui form">
                        <HRMSTextInput placeholder="İş yeri adı" name="name"/>
                        <Button primary type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
