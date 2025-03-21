import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ContentWrapper from './components/ContentWrapper'
import Sign from './components/Sign';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import StreamBoard from './components/StreamBoard'
import JobPortal from './components/JobPortal'
import Prep from './components/Prep';
import PrepDetails from './components/PrepDeatils';


function App() {

  return (
    <>
   
    <ContentWrapper>
      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign' element={<Sign/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/upload' element={<Upload/>}/>
    <Route path='/board' element={<StreamBoard/>}/>
    <Route path='/jobs' element={<JobPortal/>}/>
    <Route path='/prep' element={<Prep/>}/>
    <Route path="/prepDetail/:topic" element={<PrepDetails />} />
      </Routes>
    </ContentWrapper>
  
    </>
  );
}

export default App
