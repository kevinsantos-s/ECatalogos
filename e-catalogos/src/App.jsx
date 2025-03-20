import './global.css'; 
import { DataProvider } from "./context/contextdata"
import { ContextCompraProvider } from './context/contextcompra';
import { AppRoutes } from "./routes/route";




export const App = () => {

  return (
    <DataProvider>
      <ContextCompraProvider>
    <AppRoutes />
    </ContextCompraProvider>
    </DataProvider>
    
    
  )
}


