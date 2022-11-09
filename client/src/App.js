import "./components/styles/App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={ <LandingPage /> } />
            <Route exact path="/home" element={ <Home/> } />
            <Route exact path="/home/:id" element={ <Detail /> } />
            <Route exact path="/form" element={ <Form /> } />
            <Route exact path="/edit/:id" element={ <EditRecipe /> } />
            <Route exact path="/about" element={ <About /> } />
            <Route path="/" element={ <NotFound subtitle={"Page not found!"} /> } />
        </Routes>
    );
}

export default App;
