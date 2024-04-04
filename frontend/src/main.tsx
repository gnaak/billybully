import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/store/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render( 
  <AuthProvider>  
    <App /> 
  </AuthProvider> 
)
