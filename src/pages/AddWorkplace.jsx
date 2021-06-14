import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import WorkplaceService from '../services/workplaceService'

export default function AddWorkplace() {
    function handleSubmit(workplace) {
        let workplaceService = new WorkplaceService();
        workplaceService.add(workplace)
    }
    return (
        <div>
            <h2>Sisteme İş Yeri Ekle</h2>
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
                        <Field type="text" name="name" placeholder="İş yeri adı" />
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
