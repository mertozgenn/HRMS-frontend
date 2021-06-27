import { Formik, Form} from 'formik';
import React from 'react'
import LanguageService from '../services/languageService'
import * as Yup from "yup"
import HRMSTextInput from "../utilities/customFormControls/HRMSTextInput"
import { Button } from 'semantic-ui-react';

export default function AddLanguage() {

    function handleSubmit(language) {
        let languageService = new LanguageService();
        languageService.add(language)
    }

    return (
        <div>
            <h2>Sisteme Dil Ekle</h2>
            <Formik
                initialValues={{ name: ''}}
                validationSchema={Yup.object({
                    name : Yup.string().required("Dil İsmi Gerekli")
                })}
                onSubmit= {(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                        <Form class="ui form">
                        <HRMSTextInput placeholder="Dil adı" name="name"/>
                        <Button primary type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
