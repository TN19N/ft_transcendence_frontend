import './App.css';
import RoutesApp from './Component/RoutesApp';
import Background from './Component/Background';
import { ToastContainer } from "react-toastify";
function App() {
   return (
     <div className="h-[100vh] flex items-center justify-center">
       <Background />
       <RoutesApp />
       <ToastContainer />
     </div>
   );
  }
  
  export default App;