import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { FoodItem } from '../types';

interface NotificationBellProps {
  count: number;
  expiringItems: FoodItem[];
}

export default function NotificationBell({ count, expiringItems }: NotificationBellProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  if (count === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Expiring Soon</h3>
            <div className="space-y-2">
              {expiringItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Expires: {item.expiryDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}