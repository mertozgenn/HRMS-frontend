import './App.css';
import Navi from './layouts/Navi';
import 'semantic-ui-css/semantic.min.css'
import Dashboard from './layouts/Dashboard';
import { Sidebar } from 'semantic-ui-react';
import Footer from './layouts/Footer';


function App() {
  return (
    <div className="App">
      <div className="Webpage">
        <Navi />
        <div className="Webpage-content">
          <Sidebar.Pushable>
            <Dashboard />
          </Sidebar.Pushable>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
