import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome';
import SignUp from './components/Sign/SignUp';
import SignIn from './components/Sign/SignIn';
import Project from './components/Project/Project';
import Section from './components/Section/Section';
import ErrorPage from './components/ErrorPage/ErrorPage';
import logoImg from './assets/logo.png';

function App() {
  return (
    <BrowserRouter>
      <Link className='hover-opacity' id='welcome-link' to="/"><img src={logoImg} alt="CollaClip" style={{width: "100px", margin: "20px"}} /></Link>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/project/:id' element={<Project />} />
        <Route path='/project/:id/:sec' element={<Section />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
