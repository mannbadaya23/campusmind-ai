import React from 'react';
import Icon from '../../../components/AppIcon';

const StressLevelInput = ({
  stressLevel,
  onStressLevelChange,
  selectedMood,
  onMoodChange
}) => {
  const moodOptions = [
    { value: 'calm', label: 'Calm', icon: 'Smile', color: 'text-success' },
    { value: 'neutral', label: 'Neutral', icon: 'Meh', color: 'text-muted-foreground' },
    { value: 'stressed', label: 'Stressed', icon: 'Frown', color: 'text-warning' },
    { value: 'anxious', label: 'Anxious', icon: 'AlertCircle', color: 'text-error' },
    { value: 'overwhelmed', label: 'Overwhelmed', icon: 'AlertTriangle', color: 'text-destructive' }
  ];

  const getStressEmoji = (level) => {
    if (level <= 2) return { icon: 'Smile', color: 'text-success' };
    if (level <= 4) return { icon: 'Meh', color: 'text-muted-foreground' };
    if (level <= 6) return { icon: 'Frown', color: 'text-warning' };
    if (level <= 8) return { icon: 'AlertCircle', color: 'text-error' };
    return { icon: 'AlertTriangle', color: 'text-destructive' };
  };

  const currentEmoji = getStressEmoji(stressLevel);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Current Stress Level
      </h3>

      <div className="flex flex-col items-center mb-6 md:mb-8">
        <Icon
          name={currentEmoji.icon}
          size={64}
          className={`${currentEmoji.color} mb-4 transition-smooth`}
        />

        <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary">
          {stressLevel}
        </div>
        <span className="text-sm text-muted-foreground">out of 10</span>
      </div>

      <div className="mb-6 md:mb-8">
        <input
          type="range"
          min="0"
          max="10"
          value={stressLevel}
          onChange={(e) => onStressLevelChange(parseInt(e.target.value))}
          className="w-full h-3 rounded-lg cursor-pointer accent-primary"
          style={{
            background:
              'linear-gradient(to right, var(--color-success), var(--color-warning), var(--color-destructive))'
          }}
        />
        <div className="flex justify-between mt-2 text-xs md:text-sm text-muted-foreground">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </div>

      <label className="block text-sm md:text-base font-medium text-foreground mb-3">
        How are you feeling?
      </label>

      {/* ✅ FINAL FIXED MOOD GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onMoodChange(mood.value)}
            className={`
              flex flex-col items-center justify-center
              min-h-[92px]
              px-2
              rounded-lg border-2
              text-center
              transition-smooth
              ${
                selectedMood === mood.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:bg-muted'
              }
            `}
          >
            <Icon
              name={mood.icon}
              size={24}
              className={`${mood.color} mb-2`}
            />

            <span className="text-xs md:text-sm font-medium text-foreground leading-tight text-center">
              {mood.value === 'overwhelmed' ? (
                <>
                  Over-
                  <br />
                  whelmed
                </>
              ) : (
                mood.label
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StressLevelInput;
