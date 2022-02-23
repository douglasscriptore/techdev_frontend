/* eslint-disable react/react-in-jsx-scope */
import { Switch } from 'react-router-dom';
import Route from './Route';

import Welcome from '../pages/Welcome';
import Dashboard from '../pages/Dashboard';
import Developers from '../pages/Developers';
import DeveloperForm from '../pages/Developers/Form';
import Levels from '../pages/Levels';
import LevelsForm from '../pages/Levels/Form';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Welcome} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/developers" exact component={Developers} isPrivate />
    <Route path="/developers/new" component={DeveloperForm} isPrivate />
    <Route path="/developers/:id/edit" component={DeveloperForm} isPrivate />
    <Route path="/levels" exact component={Levels} isPrivate />
    <Route path="/levels/new" component={LevelsForm} isPrivate />
    <Route path="/levels/:id/edit" component={LevelsForm} isPrivate />
  </Switch>
);

export default Routes;
