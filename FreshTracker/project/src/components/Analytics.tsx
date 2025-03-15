import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FoodItem } from '../types';

interface AnalyticsProps {
  foodItems: FoodItem[];
}

const mockData = [
  { month: 'Jan', wasteReduction: 20, savings: 45 },
  { month: 'Feb', wasteReduction: 35, savings: 60 },
  { month: 'Mar', wasteReduction: 45, savings: 80 },
  { month: 'Apr', wasteReduction: 60, savings: 100 },
  { month: 'May', wasteReduction: 75, savings: 120 },
  { month: 'Jun', wasteReduction: 85, savings: 150 },
];

export default function Analytics({ foodItems }: AnalyticsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">Food Waste Reduction</h3>
          <p className="text-3xl font-bold text-emerald-600">85%</p>
          <p className="text-sm text-emerald-600">vs. last month</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Monthly Savings</h3>
          <p className="text-3xl font-bold text-blue-600">$150</p>
          <p className="text-sm text-blue-600">This month</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Usage Efficiency</h3>
          <p className="text-3xl font-bold text-purple-600">92%</p>
          <p className="text-sm text-purple-600">Items used before expiry</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Progress Over Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="wasteReduction"
                name="Waste Reduction"
                stroke="#059669"
                fill="#059669"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="savings"
                name="Savings ($)"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}