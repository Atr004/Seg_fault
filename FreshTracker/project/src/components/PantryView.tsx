import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { FoodItem } from '../types';

interface PantryViewProps {
  foodItems: FoodItem[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, change: number) => void;
  getExpiryStatus: (date: Date) => string;
}

export default function PantryView({ foodItems, removeItem, updateQuantity, getExpiryStatus }: PantryViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foodItems.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-lg border transition-all hover:shadow-md ${
            getExpiryStatus(item.expiryDate) === 'expired'
              ? 'bg-red-50 border-red-200'
              : getExpiryStatus(item.expiryDate) === 'expiring-soon'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-green-50 border-green-200'
          }`}
        >
          <div className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Expires: {item.expiryDate.toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm text-gray-600">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                    {item.category}
                  </span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}