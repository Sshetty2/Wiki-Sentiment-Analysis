import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface Emotion {
  emotion: string;
  value: number;
}

interface RadarChartProps {
  data?: {
    name: string;
    sentiment: number;
    emotions: Emotion[];
  };
}

const SentimentRadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<Emotion[]>([]);

  useEffect(() => {
    if (data?.emotions) {
      setChartData(data.emotions);
    }
  }, [data]);

  if (!data) {
    return (
      <Box
        sx={{
          height        : '100%',
          display       : 'flex',
          alignItems    : 'center',
          justifyContent: 'center',
          flexDirection : 'column',
          gap           : 2,
          color         : 'text.secondary'
        }}
      >
        <Typography variant="body1">
          Search for a historical figure to see their sentiment analysis
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width : '100%',
      height: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mb       : 2,
          color    : theme.palette.primary.main
        }}
      >
        {data.name}
      </Typography>

      <ResponsiveContainer width="100%" height="80%">
        <RadarChart data={chartData}>
          <PolarGrid
            stroke={theme.palette.grey[700]}
          />
          <PolarAngleAxis
            dataKey="emotion"
            tick={{ fill    : theme.palette.text.secondary,
              fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 0.4]}
            tick={{ fill    : theme.palette.text.secondary,
              fontSize: 10 }}
          />
          <Radar
            name="Emotion Value"
            dataKey="value"
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
            fillOpacity={0.3}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border         : `1px solid ${theme.palette.divider}`,
              borderRadius   : theme.shape.borderRadius
            }}
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Value']}
          />
        </RadarChart>
      </ResponsiveContainer>

      <Typography
        sx={{
          textAlign: 'center',
          mt       : 1,
          color    : data.sentiment >= 0 ? 'success.main' : 'error.main'
        }}
      >
        Sentiment Score: {data.sentiment.toFixed(3)}
      </Typography>
    </Box>
  );
};

export default SentimentRadarChart;
