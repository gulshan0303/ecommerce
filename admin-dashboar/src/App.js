
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/login/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MainLayout from './components/mainLayout/MainLayout.jsx';
import Dashboard from './pages/Dashboard';
import Addproduct from './pages/Addproduct';
import Addbrand from './pages/Addbrand';
import Brandlist from './pages/Brandlist';
import Addcat from './pages/Addcat';
import Categorylist from './pages/Categorylist';
import Addcolor from './pages/Addcolor';
import Colorlist from './pages/Colorlist';
import Customers from './pages/Customers';
import Vieworder from './pages/Vieworder';
import Order from './pages/Order';
import Addblogcat from './pages/Addblogcat';
import Blogcatlist from './pages/Blogcatlist';
import Addcoupon from './pages/Addcoupon';
import Couponlist from './pages/Couponlist';
import Addblog from './pages/Addblog';
import Bloglist from './pages/Bloglist';
import ViewEnq from './pages/ViewEnq';
import Enquiries from './pages/Enquiries';
import Productlist from './pages/Productlist';
function App() {

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
        
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<Addcoupon />} />
          <Route path="coupon/:id" element={<Addcoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Order />} />
          <Route path="order/:id" element={<Vieworder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct/>} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
