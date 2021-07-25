import React from 'react'
import { Route } from 'react-router'
import JobAdvertList from '../pages/JobAdvertList'
import EmployerList from '../pages/EmployerList'
import JobseekerList from '../pages/JobseekerList'
import JobseekerProfile from '../pages/JobseekerProfile'
import AddJobAdvert from '../pages/AddJobAdvert'
import JobAdvertDetail from '../pages/JobAdvertDetail'
import AddLanguage from '../pages/AddLanguage'
import AddPosition from '../pages/AddPosition'
import AddProgrammingLanguage from '../pages/AddProgrammingLanguage'
import AddSchool from '../pages/AddSchool'
import AddSchoolDepartment from '../pages/AddSchoolDepartment'
import AddWorkplace from '../pages/AddWorkplace'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UpdateJobseekerCV from "../pages/UpdateJobseekerCV"
import JobAdvertListToApprove from '../pages/JobAdvertListToApprove'
import EmployerListToApprove from '../pages/EmployerListToApprove'
import EmployerJobAdverts from '../pages/EmployerJobAdverts'
import UpdateProfile from '../pages/UpdateProfile'
import HomePageLayout from '../pages/Home'
import { ToastContainer } from 'react-toastify'
import { Container } from 'semantic-ui-react'
import { createMedia } from '@artsy/fresnel'

export default function Dashboard() {
    const { MediaContextProvider, Media } = createMedia({
        breakpoints: {
            mobile: 0,
            tablet: 1290,
            computer: 1600,
        },
    })
    return (
        <div>
            <ToastContainer position="bottom-right" />
            <Route exact path="/" component={HomePageLayout} />
            <Container>
                <MediaContextProvider>
                    <Media at='mobile'>
                        <Route exact path="/jobadverts">
                            <JobAdvertList mobile={true} />
                        </Route>
                    </Media>
                    <Media greaterThan='mobile'>
                        <Route exact path="/jobadverts">
                            <JobAdvertList mobile={false} />
                        </Route>
                    </Media>
                </MediaContextProvider>

                <Route exact path="/employers" component={EmployerList} />
                <Route exact path="/jobseekers" component={JobseekerList} />
                <Route exact path="/jobseekers/:id" component={JobseekerProfile} />
                <Route exact path="/jobadverts/:id" component={JobAdvertDetail} />
                <Route exact path="/add/jobadvert" component={AddJobAdvert} />
                <Route exact path="/add/language" component={AddLanguage} />
                <Route exact path="/add/position" component={AddPosition} />
                <Route exact path="/add/programminglanguage" component={AddProgrammingLanguage} />
                <Route exact path="/add/school" component={AddSchool} />
                <Route exact path="/add/schooldepartment" component={AddSchoolDepartment} />
                <Route exact path="/add/workplace" component={AddWorkplace} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={UpdateJobseekerCV} />
                <Route exact path="/approve/jobadvert" component={JobAdvertListToApprove} />
                <Route exact path="/approve/employer" component={EmployerListToApprove} />
                <Route exact path="/myAdverts" component={EmployerJobAdverts} />
                <Route exact path="/update-profile" component={UpdateProfile} />
            </Container>

        </div>
    )
}
