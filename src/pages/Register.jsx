import React from 'react'
import { Tab } from 'semantic-ui-react'
import JobseekerRegister from './JobseekerRegister'
import EmployerRegister from './EmployerRegister'

export default function Register() {
    const panes = [
        { menuItem: 'İş Arayan Olarak Kayıt Ol', render: () => <Tab.Pane><JobseekerRegister/></Tab.Pane> },
        { menuItem: 'İş Veren Olarak Kayıt Ol', render: () => <Tab.Pane><EmployerRegister/></Tab.Pane> }
      ]
    return (
        <div>
            <Tab panes={panes} />
        </div>
    )
}
