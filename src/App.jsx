import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import SearchProducts from './pages/SearchProducts'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollTopButton'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import OrderDetail from './pages/OrderDetail'
import CartProduct from './pages/CartProduct'
import AdminLogin from './pages/Auth/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import AddProdct from './components/admin/AddProducts'
function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<MainLayout><Home /></MainLayout>}/>
          <Route path='/Contact' element={<Contact />} />
          <Route path='/About' element={<About />} />
          <Route path='/search-product' element={<SearchProducts />} />
          <Route path='/products/:categoryId' element={<Products/>} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/checkout/:type/:id' element={<Checkout />} />
          <Route path='/order-success/:orderId' element={<OrderSuccess />}/>
          <Route path='/order-detail/:orderDetailId' element={<OrderDetail />}/>
          <Route path='/login-page' element={ <AuthLayout><Login /></AuthLayout> } />
          <Route path='/register-page' element={ <AuthLayout><Register /></AuthLayout> } />
          <Route path='/footer' element={<Footer />} />
          <Route path='/cart-products' element={<CartProduct />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/AddProduct' element={<AddProdct />} />
        </Routes>
        <ScrollToTopButton/>
    </div>
  )
}

export default App