import React from 'react'
import { Sidebar } from 'semantic-ui-react'
import { createMedia } from '@artsy/fresnel'
import MobileNavi from './MobileNavi'
import DesktopNavi from './DesktopNavi'

export default function Navi() {

    const { MediaContextProvider, Media } = createMedia({
        breakpoints: {
            mobile: 0,
            tablet: 1290,
            computer: 1600,
        },
    })
    return (
        <div>
            <MediaContextProvider>
                <Media as={Sidebar.Pushable} at='mobile'>
                    <MobileNavi></MobileNavi>
                </Media>
                <Media greaterThan='mobile'>
                    <DesktopNavi></DesktopNavi>
                </Media>
            </MediaContextProvider>
        </div>
    )
}
