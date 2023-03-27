import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import EmailCompose from './components/EmailCompose/EmailCompose';
import { Header } from './components/Header/Header';
import Home from './components/Home/Home';
import Inbox from './components/Inbox/Inbox';
import Login from './components/Login/Login';
import Sent from './components/Sent/Sent';
import Signup from './components/Signup/Signup';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  return (
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/email-compose' element={<ProtectedRoute Component={EmailCompose}/>}/>
      <Route path='/singup' element={ <Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/inbox' element={<ProtectedRoute Component={Inbox}/>}/>
      <Route path='/sent' element={<ProtectedRoute Component={Sent}/>}/>
    </Routes>
  </Router>
  );
}

export default App;
