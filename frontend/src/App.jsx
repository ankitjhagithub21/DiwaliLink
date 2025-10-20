import "./App.css"
import HomePage from './pages/HomePage'
import WishPage from './pages/WishPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wish/:name" element={<WishPage />} />
      </Routes>
    </Router>
  );
}

   
export default App