import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const WeeklyProgressChart = ({ data }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">Weekly Progress</h3>
        <p className="text-xs md:text-sm text-muted-foreground">Study hours and stress levels over the past week</p>
      </div>

      <div className="w-full h-64 md:h-72 lg:h-80" aria-label="Weekly Progress Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar dataKey="studyHours" fill="var(--color-primary)" name="Study Hours" radius={[8, 8, 0, 0]} />
            <Bar dataKey="stressLevel" fill="var(--color-secondary)" name="Stress Level" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;