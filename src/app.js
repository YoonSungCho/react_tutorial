import logo from './logo.png';
import './App.css';
import Login from './components/login/login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Login />
    </div>
  );
}

export default App;
