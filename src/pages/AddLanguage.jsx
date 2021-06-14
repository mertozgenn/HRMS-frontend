import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react'
import LanguageService from '../services/languageService'

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
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    return errors;
                }}
                onSubmit= {(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                        <Form>
                        <Field type="text" name="name" placeholder="Dil adı"/>
                        <ErrorMessage name="name" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Sisteme Kaydet
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
