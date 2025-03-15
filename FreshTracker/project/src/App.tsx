import React, { useState } from 'react';
import { PlusCircle, ChefHat, Bell, Search, Trash2, Settings, ShoppingCart, BarChart } from 'lucide-react';
import { FoodItem, Recipe, Tab } from './types';
import AddItemModal from './components/AddItemModal';
import RecipeFinder from './components/RecipeFinder';
import NotificationBell from './components/NotificationBell';
import PantryView from './components/PantryView';
import ShoppingList from './components/ShoppingList';
import Analytics from './components/Analytics';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('pantry');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Milk',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      quantity: '1 gallon',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '2',
      name: 'Tomatoes',
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      quantity: '4 pieces',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1546470427-1ec6e8f28309?auto=format&fit=crop&q=80&w=200'
    },
  ]);

  const addItem = (item: FoodItem) => {
    setFoodItems([...foodItems, { ...item, id: Date.now().toString() }]);
    setShowAddModal(false);
  };

  const removeItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, change: number) => {
    setFoodItems(foodItems.map(item => {
      if (item.id === id) {
        const currentQuantity = parseInt(item.quantity) || 0;
        const newQuantity = Math.max(0, currentQuantity + change);
        return {
          ...item,
          quantity: `${newQuantity} ${item.quantity.split(' ')[1] || 'pieces'}`
        };
      }
      return item;
    }));
  };

  const getExpiryStatus = (date: Date) => {
    const daysUntilExpiry = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 2) return 'expiring-soon';
    return 'fresh';
  };

  const expiringItems = foodItems.filter(
    item => getExpiryStatus(item.expiryDate) === 'expiring-soon'
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pantry':
        return (
          <PantryView
            foodItems={foodItems}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            getExpiryStatus={getExpiryStatus}
          />
        );
      case 'shopping':
        return <ShoppingList foodItems={foodItems} />;
      case 'analytics':
        return <Analytics foodItems={foodItems} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">FreshTracker</h1>
          <div className="flex gap-4">
            <NotificationBell count={expiringItems.length} expiringItems={expiringItems} />
            <button
              onClick={() => setShowRecipes(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <ChefHat size={20} />
              Find Recipes
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <PlusCircle size={20} />
              Add Item
            </button>
          </div>
        </header>

        <nav className="bg-white rounded-xl shadow-md p-2 mb-6">
          <ul className="flex gap-2">
            {[
              { id: 'pantry', icon: ChefHat, label: 'Pantry' },
              { id: 'shopping', icon: ShoppingCart, label: 'Shopping List' },
              { id: 'analytics', icon: BarChart, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {renderTabContent()}
        </div>

        {showAddModal && (
          <AddItemModal onAdd={addItem} onClose={() => setShowAddModal(false)} />
        )}

        {showRecipes && (
          <RecipeFinder
            expiringItems={foodItems.filter(
              item => getExpiryStatus(item.expiryDate) === 'expiring-soon'
            )}
            onClose={() => setShowRecipes(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;