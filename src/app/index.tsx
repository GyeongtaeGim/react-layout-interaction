import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from './layout';
import RootProvider from './provider';

import IndexPage from './page';
import ProductDetailPage from './[productId]/page';

function AppRouter() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <RootLayout>
      <Routes location={previousLocation || location}>
        <Route element={<RootLayout />}>
          <Route path='/' element={<IndexPage />} />
        </Route>
      </Routes>
      <Routes>
        <Route path='/:productId' element={<ProductDetailPage />} />
      </Routes>
    </RootLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RootProvider>
        <AppRouter />
      </RootProvider>
    </BrowserRouter>
  );
}

export default App;
