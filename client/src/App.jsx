import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'

import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore.jsx'

const App = () => {

  const { theme } = useThemeStore();

  const { isLoading, authUser } = useAuthUser()

  const isAuthenticated = Boolean(authUser)
  //console.log("Auth : ", isAuthenticated);

  if (isLoading) return <PageLoader />

  const isOnboarded = authUser?.isOnboarded;
  //console.log("onboard: ",isOnboarded);


  return (
    <><div className='h-screen' data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={isAuthenticated && isOnboarded ?
            (<Layout showSidebar={true}>
              <HomePage />
            </Layout>
            )
            :
            (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)
          }
        />
        <Route
          path='/signup'
          element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />}
        />
        <Route
          path='/login'
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />}
        />
        <Route
          path='/call/:id'
          element={
            isAuthenticated && isOnboarded ?
              (<Layout showSidebar={false}><CallPage /></Layout>)
              :
              (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)
          }
        />
        <Route
          path='/chat/:id'
          element={
            isAuthenticated && isOnboarded ?
              (<Layout showSidebar={false}><ChatPage /></Layout>)
              :
              (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)
          }
        />
        <Route
          path='/notifications'
          element={
            isAuthenticated && isOnboarded ?
              (<Layout showSidebar={true}><NotificationPage /></Layout>)
              :
              (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)
          }
        />
        <Route
          path='/onboarding'
          element={isAuthenticated ?
            (!isOnboarded ? (<OnboardingPage />) : (<Navigate to='/' />))
            :
            (<Navigate to='/login' />)
          }
        />
      </Routes>
      

      <Toaster />
    </div>
    </>
  )
}

export default App