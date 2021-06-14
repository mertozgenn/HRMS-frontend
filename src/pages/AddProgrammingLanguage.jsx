import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProgrammingLanguageService from '../services/programmingLanguageService'

export default function AddProgrammingLanguage() {

    function handleSubmit(programmingLanguage) {
        let programmingLanguageService = new ProgrammingLanguageService();
        programmingLanguageService.add(programmingLanguage)
    }
    return (
        <div>
            <h2>Sisteme Programlama Dili veya Teknolojisi Ekle</h2>
            <Formik
                initialValues={{ name: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="name" placeholder="programlama dili adı" />
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
