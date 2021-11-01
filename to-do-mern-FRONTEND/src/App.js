import { Switch, Route } from 'react-router-dom';
import MainPage from './page/MainPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" render={() => <MainPage />} />
      </Switch>
    </div>
  );
}

export default App;
