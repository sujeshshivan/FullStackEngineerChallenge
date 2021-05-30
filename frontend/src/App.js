import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Landing from './pages/Landing';
import ReviewPerformance from './pages/ReviewPerformance';
import AdminReviewAdd from './pages/AdminReviewAdd';

function App() {
  // const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute component={Login} path="/" exact />
          <PublicRoute component={Login} path="/login" exact />
          <PrivateRoute component={Landing} path="/admin-landing" exact />
          <PrivateRoute component={AdminReviewAdd} path="/review-add" exact />
          <PrivateRoute component={ReviewPerformance} path="/performance-review" exact />
        </Switch>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
