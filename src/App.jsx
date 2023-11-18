import { Route, BrowserRouter as Routes } from 'react-router-dom';
import Home from './Home';
function App() {

  return (
    <>
      <h1>Hola Mundo</h1>
      <Route path='/' component={Home} />
    </>
  )
}

export default App
