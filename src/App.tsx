import './App.css';
import RoutesApp from './Component/RoutesApp';
import Background from './Component/Background'

function App() {
   return (
     <div className='h-[100vh] flex items-center justify-center'>
      <Background />
      <RoutesApp />
  </div>
    );
  }
  
  export default App;