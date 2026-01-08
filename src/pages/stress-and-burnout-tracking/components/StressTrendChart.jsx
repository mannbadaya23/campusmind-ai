import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const StressTrendChart = ({ data, dateRange, onDateRangeChange }) => {
  const dateRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
        <div className="flex items-center gap-3">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
            Stress Trends
          </h3>
        </div>
        
        <div className="flex gap-2">
          {dateRanges?.map((range) => (
            <button
              key={range?.value}
              onClick={() => onDateRangeChange(range?.value)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-smooth ${
                dateRange === range?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Stress Level Trend Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              domain={[0, 10]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="level" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              fill="url(#stressGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 md:p-4">
          <div className="text-xs md:text-sm text-success mb-1">Lowest</div>
          <div className="text-xl md:text-2xl font-heading font-bold text-success">2.1</div>
        </div>
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 md:p-4">
          <div className="text-xs md:text-sm text-error mb-1">Highest</div>
          <div className="text-xl md:text-2xl font-heading font-bold text-error">8.7</div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 md:p-4">
          <div className="text-xs md:text-sm text-primary mb-1">Average</div>
          <div className="text-xl md:text-2xl font-heading font-bold text-primary">5.4</div>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 md:p-4">
          <div className="text-xs md:text-sm text-secondary mb-1">Trend</div>
          <div className="flex items-center gap-1">
            <Icon name="TrendingDown" size={20} className="text-success" />
            <span className="text-xl md:text-2xl font-heading font-bold text-success">-12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTrendChart;