import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface border-t border-outline">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-outline">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-headline-md font-headline-md tracking-tight uppercase text-surface">
              HUSTLE WEAR
            </h3>
            <p className="text-body-sm text-surface-variant leading-relaxed">
              Elevated contemporary streetwear archive rooted in architectural minimalism and modern Indian subculture. Heavyweight fabrics engineered for daily momentum.
            </p>
            <div className="text-label-caps text-primary-fixed uppercase tracking-widest font-semibold">
              MUMBAI HQ • PAN-INDIA DISPATCH
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label-caps uppercase tracking-wider text-surface mb-4 font-bold">
              Collections
            </h4>
            <ul className="space-y-2 text-body-sm text-surface-variant">
              <li>
                <Link to="/shop?category=tees" className="hover:text-primary-fixed transition-colors">
                  Heavyweight T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fleece" className="hover:text-primary-fixed transition-colors">
                  Hoodies & French Terry
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bottoms" className="hover:text-primary-fixed transition-colors">
                  Tactical Cargo Systems
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-primary-fixed transition-colors">
                  Solid 925 Silver Chains
                </Link>
              </li>
              <li>
                <Link to="/shop?sale=true" className="hover:text-error transition-colors">
                  Archive Sale Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-label-caps uppercase tracking-wider text-surface mb-4 font-bold">
              Archive Support
            </h4>
            <ul className="space-y-2 text-body-sm text-surface-variant">
              <li>
                <Link to="/checkout" className="hover:text-primary-fixed transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <span className="hover:text-primary-fixed cursor-pointer transition-colors">
                  7-Day Doorstep Returns
                </span>
              </li>
              <li>
                <span className="hover:text-primary-fixed cursor-pointer transition-colors">
                  Size Guide & Measurements
                </span>
              </li>
              <li>
                <span className="hover:text-primary-fixed cursor-pointer transition-colors">
                  Fabric Care & GSM Guide
                </span>
              </li>
              <li>
                <span className="hover:text-primary-fixed cursor-pointer transition-colors">
                  Authenticate Garment
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-label-caps uppercase tracking-wider text-surface mb-4 font-bold">
              Priority Drop Access
            </h4>
            <p className="text-body-sm text-surface-variant mb-3">
              Receive limited release passkeys, lookbooks, and private drop coordinates.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to drop coordinates!'); }} className="flex">
              <input
                type="email"
                required
                placeholder="architect@urban.in"
                className="bg-surface text-on-surface px-3 py-2 text-body-sm w-full border border-outline-variant focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-4 py-2 text-label-caps uppercase font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-label-caps text-outline text-xs gap-4">
          <div>
            © 2026 HUSTLE WEAR ARCHIVE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 uppercase">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Standard 256-Bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
