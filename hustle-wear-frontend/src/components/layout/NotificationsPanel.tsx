import React from 'react';
import { useUIStore } from '../../store/uiStore';

export const NotificationsPanel: React.FC = () => {
  const { isNotificationsOpen, closeNotifications } = useUIStore();

  if (!isNotificationsOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "AUTUMN DROP '25 LIVE",
      time: '12m ago',
      desc: 'Acid washed heavyweight boxy tees and tactical cargos restocked.',
      unread: true
    },
    {
      id: 2,
      title: 'METRO EXPRESS DISPATCH',
      time: '2h ago',
      desc: 'Orders placed before 2 PM dispatched within 4 hours via BlueDart.',
      unread: true
    },
    {
      id: 3,
      title: 'EXCLUSIVE PROMO CODE: HUSTLE10',
      time: '1d ago',
      desc: 'Use voucher HUSTLE10 at checkout for an instant 10% archive patron concession.',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={closeNotifications} className="absolute inset-0 bg-inverse-surface/60" />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <h2 className="text-headline-sm font-headline-sm uppercase text-on-surface">
                Archive Alerts
              </h2>
            </div>
            <button onClick={closeNotifications} className="p-1 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 border ${
                  n.unread ? 'border-primary bg-surface' : 'border-outline-variant bg-surface-container-lowest'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-label-caps uppercase font-bold text-on-surface">
                    {n.title}
                  </span>
                  <span className="text-label-caps text-outline text-[10px]">{n.time}</span>
                </div>
                <p className="text-body-sm text-on-surface-variant mt-1">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
