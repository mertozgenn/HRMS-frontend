import SchoolService from '../services/schoolService'
import { Formik, Form} from 'formik';
import React from 'react'
import * as Yup from "yup"
import HRMSTextInput from "../utilities/customFormControls/HRMSTextInput"
import { Button } from 'semantic-ui-react';

export default function AddSchoolDepartment() {
    function handleSubmit(schoolDepartment) {
        let schoolService = new SchoolService();
        schoolService.addDepartment(schoolDepartment)
    }
    return (
        <div>
            <h2>Sisteme Okul Departmanı Ekle</h2>
            <Formik
                initialValues={{ name: ''}}
                validationSchema={Yup.object({
                    name : Yup.string().required("Bölüm İsmi Gerekli")
                })}
                onSubmit= {(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                        <Form class="ui form">
                        <HRMSTextInput placeholder="Bölüm adı" name="name"/>
                        <Button primary type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
