import './App.css';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {routings} from './route';
import {useStoreAuth} from './utils/useAuth';
import MainLayout from './components/MainLayout';



const PublicPage = ({
  component: Component,
  children,
  path,
  isPrivate = false,
  ...restProps
}) => {
  const { state } = useStoreAuth();
  const authIsLoaded = state.token && state.username;
  if (authIsLoaded && (path==="/login" ||path==="/register")) return <Redirect to="/" noThrow />;
  return (
  <MainLayout>
    <Component {...restProps}>{children}</Component>
  </MainLayout>);
};

const PrivatePage = ({ component: Component, children, path, ...restProps }) => {
  const { state } = useStoreAuth();
  const authIsLoaded = !state.token || !state.username;
  if (authIsLoaded) return <Redirect to="/login" noThrow />;
  return (
    <MainLayout>
      <Component {...restProps}>{children}</Component>
    </MainLayout>
  )
  
  
};

function App() {
  const routes = routings.map((el)=>{
    if(el.isPrivate){
      return(
        <PrivatePage {...el} key={el.name}/>
      )
    }
    else{
      return(
        <PublicPage {...el} key={el.name}/>
      )

    }
  
  })
  return (
    <Router>
      <Switch>
        {routes}
        <Redirect from="*" to={"/"} noThrow />
      </Switch>
    </Router>
  
  );
}




export default App;
