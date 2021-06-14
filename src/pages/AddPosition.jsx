import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PositionService from '../services/positionService'

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
                        <Field type="text" name="name" placeholder="pozisyon adı"/>
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
