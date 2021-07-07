import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
function Rotas() {
  <Router>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>;
}

export default Rotas;
