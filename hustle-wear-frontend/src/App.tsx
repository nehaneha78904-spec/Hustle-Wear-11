import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CartDrawer } from './components/layout/CartDrawer';
import { WishlistDrawer } from './components/layout/WishlistDrawer';
import { NotificationsPanel } from './components/layout/NotificationsPanel';
import { QuickViewModal } from './components/layout/QuickViewModal';
import { Toast } from './components/ui/Toast';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <WishlistDrawer />
        <NotificationsPanel />
        <QuickViewModal />
        <Toast />
      </div>
    </BrowserRouter>
  );
};

export default App;
