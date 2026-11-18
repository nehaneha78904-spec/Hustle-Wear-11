import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const [currentStep, setCurrentStep] = useState<number>(3);
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentTab, setPaymentTab] = useState<'upi' | 'cards' | 'netbanking' | 'cod'>('upi');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('HUSTLE10');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [upiVerified, setUpiVerified] = useState<boolean>(true);
  const [selectedBank, setSelectedBank] = useState<string>('HDFC');

  // Fallback items if user went directly to checkout
  const checkoutItems = items.length > 0 ? items : [
    {
      id: 'demo-1',
      productId: 'hw-005',
      name: 'Monolith Heavyweight Hoodie',
      price: 2499,
      size: 'L',
      color: 'Washed Iron',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACxVsObaE01akMCrCsljj-O0HlV-VlG16dBuycf7CQf15Vou4kLbEEXoUB_H996VtndTHtFpnWJ5gITHKfHXSQTYd-A25h0ptIye9X0rk8S7AJqiN8HX9FxXki7WIVfs4C5op_RBTkP6Jx7tR2UejPE6fmMkx_WnK7lNrrmUROWdoTiT8VMubADvYXLWWqC4fr6i4NdL5-F1qoq6GMfWMWUvvLHCGJN3M7x2SAUwwsK9GgCYZvgqk'
    },
    {
      id: 'demo-2',
      productId: 'hw-006',
      name: 'Subculture Pattern Tee',
      price: 1298,
      size: 'M',
      color: 'Chalk White',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUrNUtw0jrRGIg7B71OI7xN6ah9PoInA-iLSrUpNPUUqdSxRe1G-d1JPuZqYZJH5w98Jkar4eKtguPosxa5x8Km6gYVWeOSx01RNu1NC8Pkj3HV7DUBJ0toRjmsCOk8GQ_rTJHrpF5gY2wR13JkWwlEe-9LgXHv8MHG0tkSPdVQg64rF11fVdMvI9a7YG---pPEKN_EysITy2gAYOwuaZ3p9P0K5d1FBSYEfr-IyRoW0CM8lO7qbQ'
    }
  ];

  const subtotal = checkoutItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const seasonalDiscount = 1200;
  const couponDiscount = couponApplied ? Math.round((subtotal - seasonalDiscount) * 0.1) : 0;
  const deliveryFee = deliveryMethod === 'express' ? 99 : 0;
  const totalPayable = Math.max(0, subtotal - seasonalDiscount - couponDiscount + deliveryFee);

  const handlePlaceOrder = () => {
    const orderData = {
      orderNumber: 'HW-' + Math.floor(100000 + Math.random() * 900000),
      items: checkoutItems,
      total: totalPayable,
      subtotal,
      deliveryMethod,
      paymentMethod: paymentTab,
      eta: deliveryMethod === 'express' ? 'Tomorrow by 6:00 PM' : 'Thursday, Oct 30, 2026'
    };
    clearCart();
    navigate('/order-confirmation', { state: { order: orderData } });
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* Top Ticker */}
      <div className="w-full bg-inverse-surface text-inverse-on-surface py-1 border-b border-outline-variant overflow-hidden">
        <div className="flex items-center space-x-8 text-label-caps font-label-caps tracking-widest uppercase text-center justify-center">
          <span>AUTUMN/WINTER ARCHIVE 04 — ORDERS DISPATCHED WITHIN 24 HOURS</span>
          <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
          <span>COMPLIMENTARY EXPRESS METRO DISPATCH FOR PRE-PAID ORDERS</span>
          <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
          <span>AUTHENTIC STREETWEAR TAILORING — MUMBAI HQ</span>
        </div>
      </div>

      {/* Checkout Header */}
      <header className="bg-surface docked full-width top-0 sticky z-40 border-b border-outline-variant">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop flex items-center justify-between h-20">
          <div className="flex items-center gap-space-lg">
            <Link
              to="/"
              className="text-headline-md font-headline-md tracking-tight uppercase text-on-surface hover:opacity-90"
            >
              HUSTLE WEAR
            </Link>
            <span className="hidden md:inline-block px-2.5 py-1 text-label-caps font-label-caps tracking-widest bg-surface-container-highest text-on-surface-variant border border-outline-variant font-bold">
              ARCHIVE CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-1.5 text-on-surface-variant text-body-sm bg-surface-container px-3 py-1.5 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
              <span className="text-label-caps font-label-caps uppercase text-on-surface font-semibold">
                256-Bit Encrypted
              </span>
            </div>
            <div className="h-6 w-[1px] bg-outline-variant"></div>
            <button
              onClick={() => alert('Customer Support helpline: +91 98201 44820 (10 AM - 7 PM IST)')}
              className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">help</span>
              Need Help?
            </button>
          </div>
        </div>
      </header>

      {/* 4-Step Progress Bar */}
      <section className="w-full bg-surface-container-lowest border-b border-outline-variant py-space-md">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div
                className={`w-7 h-7 flex items-center justify-center text-label-caps font-label-caps font-bold ${
                  currentStep >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                }`}
              >
                {currentStep > 1 ? (
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                ) : (
                  '01'
                )}
              </div>
              <div>
                <span className="text-label-caps font-label-caps block text-primary uppercase font-bold">
                  Step 01
                </span>
                <span className="text-body-sm font-body-sm font-semibold text-on-surface">Address</span>
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div
                className={`w-7 h-7 flex items-center justify-center text-label-caps font-label-caps font-bold ${
                  currentStep >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                }`}
              >
                {currentStep > 2 ? (
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                ) : (
                  '02'
                )}
              </div>
              <div>
                <span className="text-label-caps font-label-caps block text-primary uppercase font-bold">
                  Step 02
                </span>
                <span className="text-body-sm font-body-sm font-semibold text-on-surface">Delivery Speed</span>
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div
                className={`w-7 h-7 flex items-center justify-center text-label-caps font-label-caps font-bold ${
                  currentStep === 3
                    ? 'bg-inverse-surface text-inverse-on-surface ring-2 ring-primary-container ring-offset-2'
                    : currentStep > 3
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                }`}
              >
                03
              </div>
              <div>
                <span className="text-label-caps font-label-caps block text-primary font-bold uppercase">
                  Step 03
                </span>
                <span className="text-body-sm font-body-sm font-bold text-on-surface underline decoration-2 decoration-primary">
                  Payment Details
                </span>
              </div>
            </button>

            {/* Step 4 */}
            <button
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div
                className={`w-7 h-7 flex items-center justify-center text-label-caps font-label-caps font-bold ${
                  currentStep === 4
                    ? 'bg-inverse-surface text-inverse-on-surface ring-2 ring-primary-container ring-offset-2'
                    : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                }`}
              >
                04
              </div>
              <div>
                <span className="text-label-caps font-label-caps block text-outline uppercase font-bold">
                  Step 04
                </span>
                <span className="text-body-sm font-body-sm text-on-surface-variant">Review & Place</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workflow View */}
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-space-xl flex-grow">
        <div className="grid grid-cols-12 gap-gutter-desktop items-start">
          {/* Left Column: Multi-step panels (7 cols) */}
          <div className="col-span-12 lg:col-span-7 space-y-space-xl">
            {/* SECTION A: ADDRESS */}
            <div className="bg-surface-container-lowest border border-outline-variant p-space-lg">
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="text-label-caps font-label-caps bg-inverse-surface text-inverse-on-surface px-2 py-0.5 font-bold">
                    01
                  </span>
                  <h2 className="text-headline-sm font-headline-sm tracking-tight text-on-surface uppercase">
                    Shipping Address
                  </h2>
                </div>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-label-caps font-label-caps text-primary uppercase tracking-wider flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">edit</span> Change / Add
                </button>
              </div>

              <div className="space-y-3">
                {/* Address 1 */}
                <label
                  onClick={() => setSelectedAddress(1)}
                  className={`block cursor-pointer p-space-md relative transition-all ${
                    selectedAddress === 1 ? 'border-2 border-primary bg-surface' : 'border border-outline-variant bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-space-sm">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === 1}
                        onChange={() => setSelectedAddress(1)}
                        className="mt-1 text-primary focus:ring-primary border-outline-variant"
                      />
                      <div className="ml-2">
                        <div className="flex items-center gap-2">
                          <span className="text-body-md font-semibold text-on-surface">Rahul Sharma</span>
                          <span className="px-2 py-0.2 text-label-caps font-label-caps bg-primary-container text-on-primary-container uppercase font-bold">
                            Home
                          </span>
                          <span className="text-label-caps text-outline uppercase">[Default]</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          Flat 402, Architectural Enclave, 14th Road, Off Turner Rd, Bandra West
                        </p>
                        <p className="text-body-sm text-on-surface-variant font-medium">
                          Mumbai, Maharashtra — 400050
                        </p>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          Mobile: <span className="font-semibold text-on-surface">+91 98201 44820</span>
                        </p>
                      </div>
                    </div>
                    {selectedAddress === 1 && (
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    )}
                  </div>
                </label>

                {/* Address 2 */}
                <label
                  onClick={() => setSelectedAddress(2)}
                  className={`block cursor-pointer p-space-md relative transition-all ${
                    selectedAddress === 2 ? 'border-2 border-primary bg-surface' : 'border border-outline-variant bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-space-sm">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === 2}
                        onChange={() => setSelectedAddress(2)}
                        className="mt-1 text-primary focus:ring-primary border-outline-variant"
                      />
                      <div className="ml-2">
                        <div className="flex items-center gap-2">
                          <span className="text-body-md font-semibold text-on-surface">Rahul Sharma</span>
                          <span className="px-2 py-0.2 text-label-caps font-label-caps bg-surface-container-high text-on-surface-variant uppercase font-bold">
                            Studio / Work
                          </span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          Studio 09, The Design Foundry, Mathuradas Mills Compound, Lower Parel
                        </p>
                        <p className="text-body-sm text-on-surface-variant font-medium">
                          Mumbai, Maharashtra — 400013
                        </p>
                      </div>
                    </div>
                    {selectedAddress === 2 && (
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* SECTION B: DELIVERY SPEED */}
            <div className="bg-surface-container-lowest border border-outline-variant p-space-lg">
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="text-label-caps font-label-caps bg-inverse-surface text-inverse-on-surface px-2 py-0.5 font-bold">
                    02
                  </span>
                  <h2 className="text-headline-sm font-headline-sm tracking-tight text-on-surface uppercase">
                    Delivery Method
                  </h2>
                </div>
                <span className="text-label-caps font-label-caps text-outline uppercase font-semibold">
                  Fast Fulfillment
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Standard */}
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`cursor-pointer p-space-md flex flex-col justify-between transition-all ${
                    deliveryMethod === 'standard' ? 'border-2 border-primary bg-surface' : 'border border-outline-variant bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="text-primary focus:ring-primary border-outline-variant"
                      />
                      <span className="text-body-md font-semibold text-on-surface ml-1">
                        Standard Dispatch
                      </span>
                    </div>
                    <span className="text-label-caps font-label-caps text-primary bg-primary-container px-2 py-0.5 uppercase font-bold">
                      FREE
                    </span>
                  </div>
                  <div className="mt-3 text-body-sm text-on-surface-variant">
                    Estimated Delivery:<br />
                    <span className="font-semibold text-on-surface">3-4 Business Days (Thu, Oct 30)</span>
                  </div>
                  <div className="mt-2 text-label-caps text-outline uppercase font-semibold">
                    Dispatched via BlueDart Courier
                  </div>
                </label>

                {/* Express */}
                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`cursor-pointer p-space-md flex flex-col justify-between transition-all ${
                    deliveryMethod === 'express' ? 'border-2 border-primary bg-surface' : 'border border-outline-variant bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="text-primary focus:ring-primary border-outline-variant"
                      />
                      <span className="text-body-md font-semibold text-on-surface ml-1">
                        Express Air Cargo
                      </span>
                    </div>
                    <span className="text-body-sm font-semibold text-on-surface font-price-md">
                      ₹99
                    </span>
                  </div>
                  <div className="mt-3 text-body-sm text-on-surface-variant">
                    Guaranteed Next Day:<br />
                    <span className="font-semibold text-on-surface">Tomorrow by 6:00 PM</span>
                  </div>
                  <div className="mt-2 text-label-caps text-outline uppercase font-semibold">
                    Priority Handover
                  </div>
                </label>
              </div>
            </div>

            {/* SECTION C: PAYMENT MECHANISM */}
            <div className="bg-surface-container-lowest border border-outline-variant p-space-lg">
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="text-label-caps font-label-caps bg-inverse-surface text-inverse-on-surface px-2 py-0.5 font-bold">
                    03
                  </span>
                  <h2 className="text-headline-sm font-headline-sm tracking-tight text-on-surface uppercase">
                    Payment Mechanism
                  </h2>
                </div>
                <span className="text-label-caps font-label-caps text-outline uppercase font-semibold">
                  Zero Convenience Fee
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-4 gap-2 mb-space-lg border-b border-outline-variant pb-space-md">
                {[
                  { id: 'upi', label: 'UPI Instant' },
                  { id: 'cards', label: 'Credit / Debit' },
                  { id: 'netbanking', label: 'Net Banking' },
                  { id: 'cod', label: 'COD (Cash)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPaymentTab(tab.id as any)}
                    className={`py-2.5 text-center text-label-caps uppercase font-bold transition-all ${
                      paymentTab === tab.id
                        ? 'border-b-2 border-primary text-on-surface'
                        : 'border-b-2 border-transparent text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* UPI Tab */}
              {paymentTab === 'upi' && (
                <div className="space-y-space-md">
                  <div className="p-space-md bg-surface border border-outline-variant flex flex-col md:flex-row gap-space-md items-center justify-between">
                    <div className="flex items-center gap-space-md">
                      {/* Geometric QR Simulation */}
                      <div className="w-24 h-24 bg-surface-container-lowest p-1.5 border border-outline-variant flex items-center justify-center">
                        <div className="w-full h-full border border-on-surface p-1 grid grid-cols-4 gap-0.5 bg-surface-variant">
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-inverse-surface"></div>
                          <div className="bg-surface"></div>
                          <div className="bg-inverse-surface"></div>
                        </div>
                      </div>
                      <div>
                        <span className="text-label-caps font-label-caps text-primary uppercase font-bold">
                          Scan & Pay Any App
                        </span>
                        <div className="text-body-md font-semibold text-on-surface">
                          Instant BharatQR / UPI QR
                        </div>
                        <div className="text-body-sm text-on-surface-variant mt-0.5">
                          Google Pay, PhonePe, Paytm, BHIM
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-label-caps text-outline uppercase font-semibold">
                        Auto-Verifying
                      </span>
                      <div className="text-body-sm font-semibold text-primary flex items-center justify-end gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary inline-block animate-ping"></span>
                        Live Connection active
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-label-caps uppercase text-on-surface-variant mb-2 font-bold">
                      Or enter Virtual Payment Address (UPI ID)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        defaultValue="sharma.rahul@okaxis"
                        className="flex-grow bg-surface border border-outline-variant px-space-md py-3 text-body-md text-on-surface focus:border-on-surface focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setUpiVerified(true)}
                        className="bg-inverse-surface text-inverse-on-surface px-space-lg py-3 text-label-caps uppercase tracking-widest font-bold hover:bg-primary-container hover:text-on-surface transition-colors"
                      >
                        Verify UPI
                      </button>
                    </div>
                    {upiVerified && (
                      <div className="text-body-sm text-primary font-medium mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        Verified: Rahul Sharma (Axis Bank)
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cards Tab */}
              {paymentTab === 'cards' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="4242 8891 0029 4242"
                        className="w-full bg-surface border border-outline-variant px-space-md py-3 text-body-md text-on-surface focus:border-on-surface focus:ring-0 font-mono"
                      />
                      <span className="absolute right-3 top-3.5 text-label-caps text-on-surface-variant font-bold">
                        VISA / RUPAY
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        defaultValue="10/28"
                        className="w-full bg-surface border border-outline-variant px-space-md py-3 text-body-md text-on-surface focus:border-on-surface focus:ring-0"
                      />
                    </div>
                    <div>
                      <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        defaultValue="892"
                        className="w-full bg-surface border border-outline-variant px-space-md py-3 text-body-md text-on-surface focus:border-on-surface focus:ring-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      defaultValue="RAHUL SHARMA"
                      className="w-full bg-surface border border-outline-variant px-space-md py-3 text-body-md text-on-surface uppercase focus:border-on-surface focus:ring-0"
                    />
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {paymentTab === 'netbanking' && (
                <div className="space-y-3">
                  <span className="text-label-caps uppercase text-on-surface-variant block font-bold">
                    Popular Banks
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['HDFC', 'ICICI', 'SBI', 'Axis'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 text-label-caps uppercase text-on-surface font-semibold text-center transition-all ${
                          selectedBank === bank
                            ? 'border-2 border-primary bg-surface'
                            : 'border border-outline-variant bg-surface hover:border-on-surface'
                        }`}
                      >
                        {bank} Bank
                      </button>
                    ))}
                  </div>
                  <div className="text-body-sm text-primary font-medium mt-1">
                    Selected Bank: {selectedBank} Bank Instant NetBanking
                  </div>
                </div>
              )}

              {/* COD Tab */}
              {paymentTab === 'cod' && (
                <div className="p-4 bg-surface-container border border-outline-variant">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">info</span>
                    <div>
                      <div className="text-body-md font-semibold text-on-surface">
                        Cash on Delivery Verification
                      </div>
                      <p className="text-body-sm text-on-surface-variant mt-1">
                        An automated verification PIN will be sent via SMS to{' '}
                        <span className="font-semibold text-on-surface">+91 98201 44820</span> before
                        driver dispatch. Please keep exact change ready.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION D: REVIEW STEP */}
            <div className="bg-surface-container-lowest border border-outline-variant p-space-lg">
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="text-label-caps font-label-caps bg-inverse-surface text-inverse-on-surface px-2 py-0.5 font-bold">
                    04
                  </span>
                  <h2 className="text-headline-sm font-headline-sm tracking-tight text-on-surface uppercase">
                    Review & Place Order
                  </h2>
                </div>
                <span className="text-label-caps font-label-caps text-primary font-bold uppercase">
                  Final Step
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-3">
                Please verify your shipment destination, selected courier speed, and settlement channel before placing order.
              </p>
              <div className="border border-outline-variant p-3 bg-surface text-body-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-outline uppercase text-label-caps font-bold">Ship to:</span>
                  <span className="font-semibold text-on-surface">Rahul Sharma, Bandra West, Mumbai 400050</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline uppercase text-label-caps font-bold">Speed:</span>
                  <span className="font-semibold text-on-surface">
                    {deliveryMethod === 'express' ? 'Express Air Cargo (₹99)' : 'Standard Dispatch (FREE)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline uppercase text-label-caps font-bold">Payment:</span>
                  <span className="font-semibold text-on-surface uppercase">
                    {paymentTab === 'upi' ? 'UPI Instant (Instant BharatQR)' : paymentTab === 'cards' ? 'Debit/Credit Card' : paymentTab === 'netbanking' ? `${selectedBank} NetBanking` : 'Cash on Delivery'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary (5 cols) */}
          <div className="col-span-12 lg:col-span-5 sticky top-28 space-y-space-md">
            <div className="bg-surface-container-lowest border border-outline-variant p-space-lg shadow-sm">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant">
                <h3 className="text-headline-sm font-headline-sm uppercase text-on-surface">
                  Order Summary ({checkoutItems.length})
                </h3>
                <span className="text-label-caps font-label-caps bg-primary-container text-on-primary-container px-2 py-0.5 font-bold">
                  VERIFIED BAG
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-outline-variant my-space-md max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                {checkoutItems.map((item: any, idx: number) => (
                  <div key={idx} className="py-3 flex gap-space-md items-start">
                    <div className="w-16 h-20 bg-surface-container flex-shrink-0 border border-outline-variant overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-body-md font-semibold text-on-surface leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-label-caps text-outline uppercase block mt-0.5 font-bold">
                            CORE ARCHIVE RUN
                          </span>
                        </div>
                        <span className="text-price-md font-price-md font-bold text-on-surface">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-label-caps text-on-surface-variant font-bold">
                        <span>Size: <strong className="text-on-surface">{item.size}</strong></span>
                        <span>Qty: <strong className="text-on-surface">{item.quantity}</strong></span>
                        <span>Color: <strong className="text-on-surface">{item.color}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="border border-outline-variant p-2.5 bg-surface-container-low mb-space-md">
                {couponApplied ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        loyalty
                      </span>
                      <div>
                        <span className="text-label-caps text-on-surface uppercase font-bold">
                          {couponCode} APPLIED
                        </span>
                        <span className="text-body-sm text-primary block leading-none">
                          10% archive patron concession
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCouponApplied(false)}
                      className="text-label-caps text-error hover:underline uppercase font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                      Have a Promo or Archive Voucher?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="e.g. HUSTLE10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-grow bg-surface border border-outline-variant px-2.5 py-1.5 text-body-sm uppercase font-semibold text-on-surface focus:border-on-surface focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setCouponApplied(true)}
                        className="bg-inverse-surface text-inverse-on-surface px-3 py-1.5 text-label-caps uppercase tracking-wider font-bold hover:bg-primary hover:text-on-primary transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 pt-2 border-t border-outline-variant text-body-sm font-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-price-md font-bold text-on-surface">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-primary">
                  <span>Bag Seasonal Discount</span>
                  <span className="font-price-md font-semibold">-₹{seasonalDiscount}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-primary">
                    <span>Coupon Discount ({couponCode})</span>
                    <span className="font-price-md font-semibold">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Delivery Fee</span>
                  <span className="text-label-caps uppercase text-primary font-bold">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="h-[1px] bg-outline-variant my-2"></div>
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-body-lg font-bold text-on-surface uppercase tracking-tight">
                      Total Payable
                    </span>
                    <span className="block text-label-caps text-outline uppercase font-semibold">
                      Inclusive of all GST & duties
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-price-lg font-price-lg font-bold text-on-surface">
                      ₹{totalPayable.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-label-caps text-primary uppercase font-bold">
                      You Save ₹{(seasonalDiscount + couponDiscount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-space-lg h-[52px] bg-inverse-surface text-surface flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-surface font-label-caps tracking-widest uppercase font-bold transition-all"
              >
                PLACE ORDER & PAY ₹{totalPayable.toLocaleString('en-IN')}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-4 text-label-caps text-outline uppercase font-semibold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">lock</span> 100% Secure Checkout
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">autorenew</span> 7-Day Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/80 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-outline-variant max-w-lg w-full p-space-lg shadow-lg relative">
            <div className="flex items-center justify-between border-b border-outline-variant pb-space-sm mb-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">add_location</span>
                <h3 className="text-headline-sm uppercase text-on-surface font-semibold">
                  Add New Delivery Address
                </h3>
              </div>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddressModalOpen(false);
              }}
              className="space-y-3 text-body-sm"
            >
              <div>
                <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                  Full Recipient Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-surface border border-outline-variant px-3 py-2 text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                  10-Digit Mobile Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98201 44820"
                  className="w-full bg-surface border border-outline-variant px-3 py-2 text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                  Street Address
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat 402, Architectural Enclave, Bandra West"
                  className="w-full bg-surface border border-outline-variant px-3 py-2 text-on-surface"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="Mumbai"
                    className="w-full bg-surface border border-outline-variant px-3 py-2 text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-label-caps uppercase text-on-surface-variant mb-1 font-bold">
                    PIN Code
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="400050"
                    className="w-full bg-surface border border-outline-variant px-3 py-2 text-on-surface"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-label-caps uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-inverse-surface text-surface text-label-caps uppercase font-bold hover:bg-primary transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
