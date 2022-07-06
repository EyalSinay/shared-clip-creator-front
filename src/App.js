import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome';
import SignUp from './components/Sign/SignUp';
import SignIn from './components/Sign/SignIn';
import Project from './components/Project/Project';
import Section from './components/Section/Section';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Link id='welcome-link' to="/">LOGO</Link>
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
