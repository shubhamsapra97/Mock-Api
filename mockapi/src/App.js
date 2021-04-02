import AppRoutes from "./components/AppRoutes";
import UserProvider from "./components/UserProvider/UserProvider";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </header>
    </div>
  );
}

export default App;
