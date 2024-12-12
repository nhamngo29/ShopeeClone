import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
//import Login from './pages/Login'
import Register from './pages/Register'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import Layout from './layouts'
import CartHeader from './components/CartHeader'
import UserLayout from './pages/User/UserLayout'

const Login = lazy(() => import('./pages/Login'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./components/RegisterHeader'))
const RegisterHeader = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
          <Suspense fallback={<div>Loading</div>}>
            <Cart />
          </Suspense>
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
                <Suspense fallback={<div>Loading</div>}>
                  <Profile />
                </Suspense>
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
                <Suspense fallback={<div>Loading</div>}>
                  <Profile />
                </Suspense>
              </UserLayout>
            </Layout>
          )
        },
        {
          path: path.changPassword,
          element: (
            <Layout>
              <UserLayout>
                <Suspense fallback={<div>Loading</div>}>
                  <ChangePassword />
                </Suspense>
              </UserLayout>
            </Layout>
          )
        },
        {
          path: path.historyPurchase,
          element: (
            <Layout>
              <UserLayout>
                <Suspense fallback={<div>Loading</div>}>
                  <HistoryPurchase />
                </Suspense>
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
          <Suspense fallback={<div>Loading</div>}>
            <ProductDetail />
          </Suspense>
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
              <Suspense fallback={<div>Loading</div>}>
                <Login />
              </Suspense>
            </Layout>
          )
        },
        {
          path: path.register,
          element: (
            <Layout Header={<RegisterHeader />}>
              <Suspense fallback={<div>Loading</div>}>
                <Register />
              </Suspense>
            </Layout>
          )
        }
      ]
    }, {
      path: "*",
      element: (
        <NotFound />
      )
    }
  ])
  return routeElements
}
