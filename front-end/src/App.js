import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import RouteWithAuth from "./utils/RouteWithAuth";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <RouteWithAuth exact path="/login" component={Login} />
          <RouteWithAuth exact path="/register" component={Register} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:PostId" component={Post} />
        </Router>
      </Container>
    </AuthProvider>
  );
}
export default App;
