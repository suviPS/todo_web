import { Auth } from '../features/auth/Auth';
import { ToDo } from '../features/todo/Todo';
import './App.css';
import { useSelector } from "react-redux";

function App() {
  let content = <Auth/>
  const token = useSelector((state) => state.auth.token);

  if(token != null){  
    content = <ToDo userToken={token}/>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          ToDo Applikacija
        </p>
      </header>

      <div className="content">
        {content}
      </div>
    </div>
  );
}

export default App;
