import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar/Navbar';

import ITapPage from './pages/iTap/ITapPage';
import Login from './pages/Login/Login';
import Graph from './pages/iTap/Graph/Graph';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
          <Routes> 
            <Route path='/' element={
              <>
                <Navbar/>
                <ITapPage/>
              </>
            } /> 
          </Routes>
          <Routes> 
            <Route path='/login' element={<Login/>} /> 
          </Routes>
      </div>
    </Router>
  );
}

export default App;
