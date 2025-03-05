import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import BookingDetail from './pages/BookingDetail';
import ModifyBooking from './pages/ModifyBooking';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetail />
      },
      {
        path: '/booking/:id',
        element: <Booking />
      },
      {
        path: '/booking-confirmation',
        element: <BookingConfirmation />
      },
      {
        path: '/my-bookings',
        element: <MyBookings />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/booking/:id/detail',
        element: <BookingDetail />
      },
      {
        path: '/booking/:id/modify',
        element: <ModifyBooking />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);