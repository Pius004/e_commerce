import {} from "antd" 
import './App.css';
import AppHeader from "./Components/Header";
import PageContent from "./Components/PageContent";
import Footer from "./Components/Footer";
import { BrowserRouter } from "react-router-dom";
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <Footer />
      </BrowserRouter>
      
    </div>
  
  );
 
 
 
}
export default App;
