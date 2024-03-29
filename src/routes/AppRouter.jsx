import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import ProductHome from '../layout/details'
import SerialHome from '../layout/SerialHome'
import NewWareHouse from '../layout/NewWareHouse'
import NewProduct from '../layout/NewProduct'
import NewSerialFrom from '../layout/NewSerialFrom'

import Hom_addmin from '../layout_addmin/Hom_addmin'
import NewProduct_addmin from '../layout_addmin/NewProduct_addmin'
import NewSerialForm_addmin from '../layout_addmin/NewSerialForm_addmin'
import SerialHom_addmin from '../layout_addmin/SerialHom_addmin'
import UserHome_addmin from '../layout_addmin/UserHome_addmin'
import WarHouseCard_addmin from '../layout_addmin/WarHouseCard_addmin'
import Header_addmin from '../layout_addmin/Header_addmin'
import Details_addmin from '../layout_addmin/details_addmin'

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/new', element: <NewWareHouse />},
      { path: '/product', element: <ProductHome />},
      { path: '/addproduct', element: <NewProduct />},
      { path: '/serial', element: <SerialHome />},
      { path: '/addserial', element: <NewSerialFrom />},
      { path: '/addserial', element: <NewSerialFrom />},
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header_addmin />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Hom_addmin/> },
      { path: "/newproduct_addmin", element: <NewProduct_addmin /> },
      { path: "/newserialform_addmin", element: <NewSerialForm_addmin/> },
      { path: "/serialhom_addmin", element: <SerialHom_addmin/> },
      { path: "/userhome_addmin", element: <UserHome_addmin/> },
      { path: "/warhousecard_addmin", element: <WarHouseCard_addmin/> },
      { path: "/header_addmin", element: <Header_addmin/> },
      { path: "/details_addmin", element: <Details_addmin/> },
      { path: '/addproduct', element: <NewProduct />},
    ],
  },
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.role === 'ADMIN' ? adminRouter : user ?  userRouter : guestRouter;
  return (
    <RouterProvider router={finalRouter} />
  )
}