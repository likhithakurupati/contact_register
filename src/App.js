import logo from "./logo.svg";
import "./App.css";
import Contacts from "./components/Contacts";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <Navbar />
        <Contacts />
      </div>
    </div>
  );
}

export default App;
