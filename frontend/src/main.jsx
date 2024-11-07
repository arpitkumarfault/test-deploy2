import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import RegisterPage from './Pages/signup/index.jsx'
import LoginPage from './Pages/login/index.jsx'
import HomePage from './Pages/home/index.jsx'
import CompletedTasks from './Pages/completedtasks/index.jsx'
import OngoingTasks from './Pages/ongoingtasks/index.jsx'
import PendingTasks from './Pages/pendingtasks/index.jsx'
import AllTasks from './Pages/alltasks/index.jsx'
import ProfilePage from './Pages/profile/index.jsx'
import EmailVerification from './Pages/emailVerification/index.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/email-verify" element={<EmailVerification />} />
      <Route path="/home" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="ongoing" element={<OngoingTasks />} />
        <Route path="pending" element={<PendingTasks />} />
        <Route path="all" element={<AllTasks />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/home/profile" element={<ProfilePage />} />
      </Route>
    </>,
  ),
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
