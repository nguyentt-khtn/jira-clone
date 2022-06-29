import { Router, Switch } from 'react-router-dom';
import './App.css';
import Loading from './GlobalSetting/Loading/Loading';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberbugs/LoginCyberBugs';
import { UserLoginTemplate } from './templates/UserLoginTemplate/UserLoginTemplate';
import { history } from './util/lib/history'
import CyberbugsTemplate from './templates/HomeTemplate/CyberbugsTemplate';
import IndexCyberbugs from './pages/CyberBugs/ProjectCyberBugs/IndexCyberbugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ManagementProject from './pages/ManagementProject/ManagementProject';
import PopupModal from './HOC/Modal/PopupModal';
import Register from './pages/CyberBugs/Register/Register';
import ManagementUser from './pages/ManagementUser/ManagementUser';

function App() {

  return (
    <Router history={history} >
      <Loading />
      <PopupModal />
      <Switch>
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <UserLoginTemplate exact path='/register' Component={Register} />
        <CyberbugsTemplate exact path='/home' Component={IndexCyberbugs} />
        <CyberbugsTemplate exact path='/' Component={IndexCyberbugs} />
        <CyberbugsTemplate exact path='/create' Component={CreateProject} />
        <CyberbugsTemplate exact path='/management' Component={ManagementProject} />
        <CyberbugsTemplate exact path='/userManagement' Component={ManagementUser} />
        <CyberbugsTemplate exact path='/projectDetail/:projectId' Component={IndexCyberbugs} />
      </Switch>
    </Router>
  );
}

export default App;
