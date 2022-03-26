import "./App.css";
import Layout from "./components/wrapper/Layout";
import RouteBuilder from "./components/RouteBuilder";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
        <Layout>
          <NavBar />
          <RouteBuilder />
        </Layout>
    </>
  );
}
export default App;
