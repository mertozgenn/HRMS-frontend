import React from 'react'
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react'

export default function HRMSSelectInput({ ...props }) {
    const [field, meta] = useField(props)
    return (
        <div>
            <FormField as="select" {...field} {...props} error={meta.touched && !!meta.error}>
                <option value="" defaultValue>Seçin</option>
                {
                    props.list.length > 0 ? props.list.map(item => (<option key={item.id} value={parseInt(item.id)}>{item.name}</option>)) : null
                }

            </FormField>
            {meta.touched && !!meta.error ? (
                <Label pointing basic color="red" content={meta.error}></Label>
            ) : null}
        </div>


    )
}
