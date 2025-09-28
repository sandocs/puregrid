import React, { useEffect, useRef } from 'react';

interface EnergyChartProps {
  data: {
    solar: number;
    wind: number;
    consumption: number;
    battery: number;
  };
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart settings
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const maxValue = Math.max(data.solar + data.wind, data.consumption, 100);

    // Draw background grid
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = margin.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }

    // Draw bars
    const barWidth = chartWidth / 4;
    const barSpacing = barWidth * 0.2;
    const effectiveBarWidth = barWidth - barSpacing;

    // Solar bar
    const solarHeight = (data.solar / maxValue) * chartHeight;
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(
      margin.left + barSpacing / 2,
      margin.top + chartHeight - solarHeight,
      effectiveBarWidth,
      solarHeight
    );

    // Wind bar
    const windHeight = (data.wind / maxValue) * chartHeight;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(
      margin.left + barWidth + barSpacing / 2,
      margin.top + chartHeight - windHeight,
      effectiveBarWidth,
      windHeight
    );

    // Consumption bar
    const consumptionHeight = (data.consumption / maxValue) * chartHeight;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(
      margin.left + barWidth * 2 + barSpacing / 2,
      margin.top + chartHeight - consumptionHeight,
      effectiveBarWidth,
      consumptionHeight
    );

    // Battery bar
    const batteryHeight = (data.battery / 100) * chartHeight;
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(
      margin.left + barWidth * 3 + barSpacing / 2,
      margin.top + chartHeight - batteryHeight,
      effectiveBarWidth,
      batteryHeight
    );

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'center';

    const labels = ['Solar', 'Wind', 'Usage', 'Battery'];
    labels.forEach((label, index) => {
      ctx.fillText(
        label,
        margin.left + barWidth * index + barWidth / 2,
        height - 10
      );
    });

    // Draw values on bars
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui';
    
    const values = [data.solar, data.wind, data.consumption, data.battery];
    const heights = [solarHeight, windHeight, consumptionHeight, batteryHeight];
    
    values.forEach((value, index) => {
      if (heights[index] > 20) {
        ctx.fillText(
          index < 3 ? `${value.toFixed(1)}kW` : `${value.toFixed(0)}%`,
          margin.left + barWidth * index + barWidth / 2,
          margin.top + chartHeight - heights[index] + 15
        );
      }
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * (5 - i);
      const y = margin.top + (chartHeight / 5) * i;
      ctx.fillText(
        value.toFixed(0),
        margin.left - 10,
        y + 4
      );
    }

  }, [data]);

  return (
    <div className="w-full h-64">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EnergyChart;