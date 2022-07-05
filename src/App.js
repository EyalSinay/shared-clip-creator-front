import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome';
import SignUp from './components/Sign/SignUp';
import SignIn from './components/Sign/SignIn';
import UserProjects from './components/UserProjects/UserProjects';
import Project from './components/Project/Project';
import Section from './components/Section/Section';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/my-projects' element={<UserProjects/>} />
        <Route path='/my-projects/:id' element={<Project/>} />
        <Route path='/my-projects/:id/:sec' element={<Section/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
