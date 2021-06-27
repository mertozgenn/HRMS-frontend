import ProgrammingLanguageService from '../services/programmingLanguageService'
import { Formik, Form} from 'formik';
import React from 'react'
import * as Yup from "yup"
import HRMSTextInput from "../utilities/customFormControls/HRMSTextInput"
import { Button } from 'semantic-ui-react';

export default function AddProgrammingLanguage() {

    function handleSubmit(programmingLanguage) {
        let programmingLanguageService = new ProgrammingLanguageService();
        programmingLanguageService.add(programmingLanguage)
    }
    return (
        <div>
            <h2>Sisteme Programlama Dili veya Teknolojisi Ekle</h2>
            <Formik
                initialValues={{ name: ''}}
                validationSchema={Yup.object({
                    name : Yup.string().required("Programlama Dili veya Teknolojisi İsmi Gerekli")
                })}
                onSubmit= {(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                        <Form class="ui form">
                        <HRMSTextInput placeholder="Programlama Dili veya Teknolojisi adı" name="name"/>
                        <Button primary type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
