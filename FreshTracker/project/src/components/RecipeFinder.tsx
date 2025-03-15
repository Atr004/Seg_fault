import React from 'react';
import { X } from 'lucide-react';
import { FoodItem } from '../types';

interface RecipeFinderProps {
  expiringItems: FoodItem[];
  onClose: () => void;
}

// Mock recipes data - in a real app, this would come from an API
const MOCK_RECIPES = [
  {
    id: 1,
    name: 'Vegetable Stir Fry',
    ingredients: ['Tomatoes', 'Bell Peppers', 'Onions'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Fruit Smoothie',
    ingredients: ['Bananas', 'Strawberries', 'Milk'],
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=400',
  },
];

export default function RecipeFinder({ expiringItems, onClose }: RecipeFinderProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recipe Suggestions</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Items Expiring Soon:</h3>
          <div className="flex flex-wrap gap-2">
            {expiringItems.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {MOCK_RECIPES.map((recipe) => (
            <div key={recipe.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-2">Ingredients needed:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className={`px-2 py-1 rounded-full text-sm ${
                        expiringItems.some((item) => item.name === ingredient)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}