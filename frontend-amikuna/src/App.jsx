import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='navbar' element={<Navbar />} />
        {/* <Route path='login' element={<Login />} />
        
        <Route path='forgot/:id' element={<Forgot />} />
        <Route path='confirm/:token' element={<Confirm />} />
        <Route path='reset/:token' element={<Reset />} />
        <Route path='*' element={<NotFound />} />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route path='listar' element={<List />} />
          <Route path='visualizar/:id' element={<Details />} />
          <Route path='crear' element={<Create />} />
          <Route path='actualizar/:id' element={<Update />} />
          <Route path='chat' element={<Chat />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
