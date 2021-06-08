import './App.css';
import Navi from './layouts/Navi';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import JobAdvertList from './pages/JobAdvertList'


function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className="main">
        <JobAdvertList/>
      </Container>
    </div>
  );
}

export default App;
