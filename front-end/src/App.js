import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
