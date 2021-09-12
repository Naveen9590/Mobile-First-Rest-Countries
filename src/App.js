
import './App.css';
import Filters from './Components/Filters';
import Header from './Components/Header';
import ErrorModal from './Components/Error'
import 'bootstrap/dist/css/bootstrap.css';
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import DetailPage from './Components/DetailPage';
import { useState } from 'react';

function App() {
  const [theme,setTheme]=useState(0)
  const [showerr,setShowErr]=useState(false)
  const [errmsg,setErrMsg]=useState('')

  const checkTheme=()=>{
    Boolean(!theme)?setTheme(1):setTheme(0)
  }

  const handleError=(err)=>{
    setShowErr(true)
    setErrMsg(err.message)
  }

  // hiding modal
  const hideError=()=>{
    setShowErr(false)
  }
  
  return (
    <Router>
    <div className="App  App-Dark">
      <Header check={checkTheme} theme={theme}/>
      <ErrorModal show={showerr} error={errmsg} hide={hideError}/>
      <div className='body-container'>
        <Switch>
          <Route exact path='/' render={(props)=><Filters routeprops={props} theme={theme} handleError={handleError}/>}/>
          <Route exact path='/:country' render={(props)=><DetailPage routeprops={props} theme={theme} handleError={handleError}/>}/>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
