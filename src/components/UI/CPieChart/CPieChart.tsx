import { Box, SxProps, Theme, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { cPieChartStyles } from './styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { PieChartData } from '../types';
import { ChartsColorPalette } from '@mui/x-charts';
import bezierEasing from 'bezier-easing';

interface CPieChartProps {
  data: PieChartData[];
  hasTotal?: boolean;
  colors?: ChartsColorPalette;
  sx?: SxProps<Theme>;
}

const CPieChart = ({ data, hasTotal = false, colors, sx }: CPieChartProps) => {
  const theme = useTheme();
  const [endAngle, setEndAngle] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const [currentEndAngle, setCurrentEndAngle] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  const pieColors = colors || [
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.primary.darkest,
    theme.palette.primary.light,
    theme.palette.primary.lightest,
  ];

  const total = data.reduce((accumulator, item) => accumulator + item.value, 0);

  useEffect(() => {
    const duration = 5000; // Durée de l'animation en millisecondes
    const easing = bezierEasing(0.25, 0.1, 0.25, 1); // Courbe de Bézier personnalisée

    const animate = () => {
      const progress = currentEndAngle / 360; // Calculer la progression de 0 à 1
      const easedProgress = easing(progress); // Appliquer la courbe de Bézier
      const newEndAngle = 360 * easedProgress; // Calculer le nouvel angle en fonction de la progression

      setEndAngle(newEndAngle);

      const newTotal = Math.round(total * easedProgress);

      setCurrentTotal(newTotal);

      if (currentEndAngle < 360) {
        setCurrentEndAngle(currentEndAngle + (360 / duration) * 16); // Incrémenter l'angle en fonction du temps
        setAnimationFrameId(requestAnimationFrame(animate));
      }
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentEndAngle, animationFrameId]);

  return (
    <Box sx={[cPieChartStyles().wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <PieChart
        height={300}
        width={500}
        legend={{
          direction: 'column',
          position: {
            vertical: 'middle',
            horizontal: 'right',
          },
        }}
        sx={{
          '--ChartsLegend-rootOffsetX': '-100px',
          '--ChartsLegend-rootOffsetY': '0px',
          '--ChartsLegend-itemWidth': '160px',
        }}
        colors={pieColors}
        series={[
          {
            data: data,
            innerRadius: 80,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 50,
            startAngle: 0,
            endAngle: endAngle,
            cx: 150,
            cy: 150,
          },
        ]}
      />
      {hasTotal && (
        <Typography sx={cPieChartStyles().totalTypo} variant="h2">
          {currentTotal}
        </Typography>
      )}
    </Box>
  );
};

export default CPieChart;
