import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Notfound from './pages/Notfound';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Explore from './pages/Explore';
import MenuInfo from './pages/MenuInfo';
import CreateMenu from './pages/CreateMenu';
import UpdateMenu from './pages/UdpateMenu';
import CartPage from './pages/CartPage';
import SearchResults from './pages/SearchResults.jsx';
import MyOrders from './pages/Myorders.jsx';
function App() {

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="*" element={<Notfound />} />
          <Route index path="/" element={<LandingPage />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/signup" element={<SignUp />} />
          <Route index path="/explore" element={<Explore />} />
          <Route index path="/Menu/:id" element={<MenuInfo />} />
          <Route index path="/card" element={<MenuInfo />} />
          <Route index path="/createitem" element={<CreateMenu />} />
          <Route index path="/updateitem/:id" element={<UpdateMenu />} />
          <Route index path="/cart" element={<CartPage />} />
          <Route index path="/search" element={<SearchResults />} />
          <Route index path="/myorders" element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
