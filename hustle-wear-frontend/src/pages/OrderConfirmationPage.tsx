import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();

  const order = location.state?.order || {
    orderNumber: 'HW-849204',
    total: 2338,
    eta: 'Thursday, Oct 30, 2026',
    paymentMethod: 'upi',
    items: [
      {
        name: 'Monolith Heavyweight Hoodie',
        size: 'L',
        quantity: 1,
        price: 1499,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD97AzMFyygls_klXmiGeLrQyq8wsJCp3ZiwoFR4wTeRvLDnEpASgy1aXfZniWY1rNM55lBK3IHDqe49jcFcIPeK6mljrBtdbaW-kq3Nq9o5lCYcvpENmV9W9q46BD7UlZdMAg8SHDdRgX3wwthHcOfAVq6pyTNbtC0cl9V281p0jWN45FalNV61eYV5mWwUVM_a2-Hpltb4U0zAQF5aEkIg-7NkrbzF1gRlquwKMh1WlRLff_cLQU'
      },
      {
        name: 'Subculture Pattern Tee',
        size: 'M',
        quantity: 1,
        price: 839,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjhE_1uF89r7N6byo8JWN9PaK7CFwtsX6h81DEOBwm5mWJv5Os_476SjRcNET39VTUv32vDW_H_eXSt6MVgZQrcEsJAv95h2H-89d_-2Q6s4rumb-5MX-vxDZC1NaF5Ub7VJHjJOYHXIFi0Fzo8lIKWMJuqT4umexDIkl8WSKZZBq5sVoAZdjxTmNwNTE8e6ri5hWUS7_oqRBDP9OxWCA6eVNvVF8PW77w-JBOv2idgFpKEp5MIJo'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 flex-grow">
        <div className="max-w-[880px] mx-auto bg-surface-container-lowest border-2 border-outline-variant p-6 md:p-space-xl shadow-lg relative">
          {/* Celebration Header Tag */}
          <div className="flex items-center justify-between border-b border-outline-variant pb-space-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </div>
              <div>
                <span className="text-label-caps font-label-caps text-primary uppercase tracking-widest block font-bold">
                  TRANSACTION SUCCESSFUL
                </span>
                <h2 className="text-xl md:text-headline-md font-headline-md tracking-tight text-on-surface uppercase font-bold">
                  ORDER CONFIRMED #{order.orderNumber}
                </h2>
              </div>
            </div>
            <Link
              to="/"
              className="text-label-caps font-label-caps text-outline hover:text-on-surface uppercase flex items-center gap-1 font-bold"
            >
              <span className="material-symbols-outlined text-sm">close</span> Home
            </Link>
          </div>

          {/* Order Milestone Notification Banner */}
          <div className="my-space-lg bg-surface border border-outline-variant p-space-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_shipping
                </span>
                <span className="text-body-md font-body-md font-semibold text-on-surface">
                  Estimated Delivery: {order.eta}
                </span>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                Dispatched from Mumbai Central Archive Facility via BlueDart Express Air.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
              <span className="text-label-caps font-label-caps uppercase text-on-surface font-semibold">
                Preparing Package
              </span>
            </div>
          </div>

          {/* Communication Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
            <div className="p-space-md bg-surface border border-outline-variant">
              <span className="text-label-caps font-label-caps text-outline uppercase block mb-1 font-bold">
                Receipt & Tracking Notifications
              </span>
              <div className="text-body-sm text-on-surface">
                SMS dispatched to <strong className="text-on-surface">+91 98201 44820</strong><br />
                Order invoice sent to <strong className="text-on-surface">rahul.sharma@arch.design</strong>
              </div>
            </div>
            <div className="p-space-md bg-surface border border-outline-variant">
              <span className="text-label-caps font-label-caps text-outline uppercase block mb-1 font-bold">
                Shipping Destination
              </span>
              <div className="text-body-sm text-on-surface">
                <strong>Rahul Sharma</strong> — Flat 402, Architectural Enclave, Bandra West, Mumbai 400050
              </div>
            </div>
          </div>

          {/* Recap Purchased Items */}
          <div className="border-t border-b border-outline-variant py-space-md my-space-md">
            <span className="text-label-caps font-label-caps text-outline uppercase block mb-3 font-bold">
              Manifest Summary
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-surface-container border border-outline-variant overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-body-sm font-body-sm">
                    <span className="font-semibold text-on-surface block truncate max-w-[220px]">
                      {item.name}
                    </span>
                    <span className="text-label-caps font-label-caps text-on-surface-variant font-bold">
                      Size {item.size} • Qty {item.quantity} • ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Paid & Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-space-sm gap-4">
            <div className="text-left w-full md:w-auto">
              <span className="text-label-caps font-label-caps text-outline uppercase block font-bold">
                Settlement Method: {order.paymentMethod?.toUpperCase() || 'UPI INSTANT'}
              </span>
              <div className="text-price-lg font-price-lg font-bold text-on-surface">
                ₹{order.total.toLocaleString('en-IN')}{' '}
                <span className="text-body-sm font-body-sm font-normal text-primary font-bold">
                  PAID IN FULL
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm w-full md:w-auto">
              <Link
                to="/"
                className="flex-1 md:flex-initial px-space-lg h-[46px] border border-inverse-surface bg-transparent hover:bg-inverse-surface hover:text-surface text-label-caps font-label-caps uppercase tracking-wider transition-all flex items-center justify-center font-bold"
              >
                RETURN TO STOREFRONT
              </Link>
              <button
                type="button"
                onClick={() =>
                  alert(
                    `Dispatch Tracking: Consignment #${order.orderNumber} assigned to BlueDart Express Air AWB #BLR-98012481. Scheduled departure 23:45 IST.`
                  )
                }
                className="flex-1 md:flex-initial px-space-lg h-[46px] bg-inverse-surface text-inverse-on-surface hover:bg-primary hover:text-on-primary text-label-caps font-label-caps uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-bold"
              >
                <span className="material-symbols-outlined text-sm">explore</span> TRACK CONSIGNMENT
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
