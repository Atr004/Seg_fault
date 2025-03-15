import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { FoodItem } from '../types';

interface ShoppingListProps {
  foodItems: FoodItem[];
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  isAISuggested: boolean;
  checked: boolean;
}

export default function ShoppingList({ foodItems }: ShoppingListProps) {
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: '1',
      name: 'Milk',
      quantity: '1 gallon',
      isAISuggested: true,
      checked: false,
    },
    {
      id: '2',
      name: 'Eggs',
      quantity: '1 dozen',
      isAISuggested: true,
      checked: false,
    },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Shopping List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-lg border ${
              item.checked ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                item.checked
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-gray-300'
              }`}
            >
              {item.checked && <Check size={16} />}
            </button>
            <div className="flex-1">
              <p className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {item.name}
              </p>
              <p className="text-sm text-gray-500">{item.quantity}</p>
            </div>
            {item.isAISuggested && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                AI Suggested
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}