import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SchoolService from '../services/schoolService'

export default function AddSchool() {
    function handleSubmit(school) {
        let schoolService = new SchoolService();
        schoolService.add(school)
    }
    return (
        <div>
            <h2>Sisteme Okul Ekle</h2>
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
                        <Field type="text" name="name" placeholder="Okul adı"/>
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
