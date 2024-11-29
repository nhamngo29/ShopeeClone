import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import RegisterHeader from './components/RegisterHeader'
import Layout from './layouts'
import CartHeader from './components/CartHeader'
import UserLayout from './pages/User/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import Profile from './pages/User/pages/Profile'

function ProtectedRouted() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRouted() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <Layout>
          <ProductList />
        </Layout>
      )
    },

    {
      path: path.cart,
      element: (
        <Layout Header={<CartHeader />}>
          <Cart />
        </Layout>
      )
    },
    {
      path: path.profile,
      element: <ProtectedRouted />,
      children: [
        {
          path: path.profile,
          element: (
            <Layout>
              <UserLayout>
                <Profile />
              </UserLayout>
            </Layout>
          )
        }
      ]
    },
    {
      path: path.user,
      element: <ProtectedRouted />,
      children: [
        {
          path: path.profile,
          element: (
            <Layout>
              <UserLayout>
                <Profile />
              </UserLayout>
            </Layout>
          )
        },
        {
          path: path.changPassword,
          element: (
            <Layout>
              <UserLayout>
                <ChangePassword />
              </UserLayout>
            </Layout>
          )
        },
        {
          path: path.historyPurchase,
          element: (
            <Layout>
              <UserLayout>
                <HistoryPurchase />
              </UserLayout>
            </Layout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <Layout>
          <ProductDetail />
        </Layout>
      )
    },
    {
      path: '',
      element: <RejectedRouted />,
      children: [
        {
          path: path.login,
          element: (
            <Layout Header={<RegisterHeader />}>
              <Login />
            </Layout>
          )
        },
        {
          path: path.register,
          element: (
            <Layout Header={<RegisterHeader />}>
              <Register />
            </Layout>
          )
        }
      ]
    }
  ])
  return routeElements
}
