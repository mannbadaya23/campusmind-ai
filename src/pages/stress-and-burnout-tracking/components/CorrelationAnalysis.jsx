import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const CorrelationAnalysis = ({ data }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Icon name="BarChart3" size={24} className="text-primary" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Stress vs Study Patterns
        </h3>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Stress and Study Correlation Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px'
              }}
            />
            <Bar dataKey="stress" fill="var(--color-destructive)" name="Stress Level" radius={[8, 8, 0, 0]} />
            <Bar dataKey="studyHours" fill="var(--color-primary)" name="Study Hours" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="BookOpen" size={20} className="text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Study Impact</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Higher study hours correlate with 23% increase in stress levels during exam weeks
          </p>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingDown" size={20} className="text-success" />
            <span className="text-xs md:text-sm font-medium text-success">Recovery Pattern</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Stress levels decrease by 45% within 2 days after major deadlines
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorrelationAnalysis;