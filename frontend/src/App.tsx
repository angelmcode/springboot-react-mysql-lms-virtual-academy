import { Routes, Route} from 'react-router';
import SignUpPage from './pages/SignUp';
import Header from './components/Header';
import LoginPage from './pages/LogIn';
import RootRouter from './components/RootRouter';
import TeacherPanel from './pages/TeacherPanel';
import PortalSelection from './pages/PortalSelection';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';


const TOAST_BASE = "!bg-zinc-900 !text-zinc-100 !border-solid !border !border-[1px] !rounded-2xl !px-4 !py-3 !shadow-2xl";

const App = () => {
  return (
    <>
      <Toaster 
        toastOptions={{
          duration: 4000,
          className: `${TOAST_BASE} !border-zinc-800`,
          
          success: {
            className: `${TOAST_BASE} !border-green-500 !shadow-[0_0_15px_rgba(34,197,94,0.2)]`,
            iconTheme: { primary: '#22c55e', secondary: '#000' },
          },
          
          error: {
            className: `${TOAST_BASE} !border-red-900 !shadow-[0_0_15px_rgba(239,68,68,0.2)]`,
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
          
          loading: {
            className: `${TOAST_BASE} !border-yellow-600`,
            iconTheme: { primary: '#f59e0b', secondary: '#18181b' },
          },
        }} 
      />
      <Routes>
        {/* ROUTES WITHOUT HEADER                      */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/portal" element={
          <ProtectedRoute allowedRoles={["ROLE_TEACHER", "ROLE_ADMIN"]}>
            <PortalSelection />
          </ProtectedRoute>
        } />

        {/* ROUTES WITH HEADER                         */}
        <Route element={<Header />}>
          
          <Route path="/" element={<RootRouter />} />

          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={["ROLE_TEACHER", "ROLE_ADMIN"]}>
              <TeacherPanel />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </>
  );
}

export default App;