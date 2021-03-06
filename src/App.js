import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
    return(
        <>
            <Navbar />
            <AppRoutes />
            <Footer />
        </>
    );
};