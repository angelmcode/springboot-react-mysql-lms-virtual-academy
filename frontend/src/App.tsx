import { Routes, Route} from 'react-router';
import SignUpPage from './pages/signup';
import Home from './pages/home';
import Header from './components/header';

export default function App() {

  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}
