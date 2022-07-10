import "./components/styles/App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={ ()=> <LandingPage/> } />
                <Route exact path="/home" render={ ()=> <Home/> } />
                <Route exact path="/home/:id" render={ ()=> <Detail/> } />
                <Route exact path="/form" render={ ()=> <Form/> } />
                <Route exact path="/edit/:id" render={ ()=> <EditRecipe/> } />
                <Route exact path="/about" render={ ()=> <About/> } />
                <Route path="/" render={ ()=> <NotFound subtitle={"Page not found!"}/> } />
            </Switch>
        </div>
    );
}

export default App;
