import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Grid, Header, Icon, Segment, Sidebar, Visibility} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='İş arayanları işverenlerle buluşturuyoruz.'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Kendinize uygun bir iş seçin.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button as={NavLink} exact to="/jobadverts" primary size='huge'>
      İlanlara göz atın
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  render() {
    const { children } = this.props

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <HomepageHeading mobile />
            </Segment>

            {children}
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row centered>
          <Grid.Column>
            <Header textAlign="center" as='h3' style={{ fontSize: '2em'}}>
              Şirket olarak bize katılın.
            </Header>
            <p style={{ fontSize: '1.33em', textAlign:'center' }}>
              Aradığınız çalışanı kısa sürede bulun.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button as={NavLink} exact to="/register" color="black" size='huge'>Şirket olarak kayıt olun</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Her geçen gün daha çok kişi bizi tercih ediyor.
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Siz de katılın!
        </p>
        <Button as={NavLink} exact to="/login" size='large'>
          Giriş Yap
        </Button>
        <Button as={NavLink} exact to="/register" size='large'>
          Kayıt Ol
        </Button>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
