import React, { useState } from 'react';
import {
  Box,
  styled,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography
} from '@mui/material';
import SentimentRadarChart from './components/SentimentRadarChart';
import SearchBar from './components/SearchBar';
import logo from './logo.jpg';

import { fetchRawWikiPageDataWithPageId, fetchRawWikiPageDataWithPageTitle } from './api/wiki-requests';
import ScoreCards from './components/ScoreCards';

const darkTheme = createTheme({
  palette: {
    mode      : 'dark',
    background: {
      default: '#202022',
      paper  : '#1E1E1E'
    },
    primary: {
      main: '#90CAF9'
    }
  },
  typography: {
    h1: {
      fontSize            : '2.5rem',
      fontWeight          : 600,
      background          : 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor : 'transparent'
    }
  }
});

const PageContainer = styled(Box)({
  minHeight    : '100vh',
  display      : 'flex',
  flexDirection: 'column',
  alignItems   : 'center',
  padding      : '0 20px'
});

const LogoContainer = styled(Box)(({ theme }) => ({
  position           : 'relative',
  height             : 'auto',
  width              : '250px', // Fixed width
  display            : 'flex',
  justifyContent     : 'center',
  alignItems         : 'center',
  marginBottom       : theme.spacing(4),
  marginTop          : theme.spacing(4),
  backgroundBlendMode: 'darken',
  '& img'            : {
    width              : '100%',
    height             : 'auto',
    objectFit          : 'contain',
    backgroundBlendMode: 'darken'
  }
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  width       : '100%',
  textAlign   : 'center',
  marginBottom: theme.spacing(2),
  marginTop   : theme.spacing(4)
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  width          : '100%',
  maxWidth       : '600px',
  height         : '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius   : theme.shape.borderRadius * 2,
  padding        : theme.spacing(3),
  marginTop      : theme.spacing(4),
  marginBottom   : theme.spacing(8)
}));

const emotions = [
  { name : 'Sadness',
    color: '#64B5F6' },
  { name : 'Joy',
    color: '#81C784' },
  { name : 'Fear',
    color: '#FFB74D' },
  { name : 'Disgust',
    color: '#E57373' },
  { name : 'Anger',
    color: '#FF5252' }
];

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const sampleData: any = {
    einstein: {
      name     : 'Albert Einstein',
      sentiment: 0.378342,
      emotions : [
        { emotion: 'Sadness',
          value  : 0.199924 },
        { emotion: 'Joy',
          value  : 0.354803 },
        { emotion: 'Fear',
          value  : 0.085921 },
        { emotion: 'Disgust',
          value  : 0.031455 },
        { emotion: 'Anger',
          value  : 0.04224 }
      ]
    }

  };

  const handleSearch = async (value: string, pageId?: number) => {
    const term = value.toLowerCase();
    setSearchTerm(term);

    let pageData = null;

    if (pageId) {
      pageData = await fetchRawWikiPageDataWithPageId(pageId);

      //   const nluData = await analyzeText(rawPageData);
    }

    pageData = await fetchRawWikiPageDataWithPageTitle(value);

    // Simple search implementation
    if (term in sampleData) {
      setSelectedPerson(sampleData[term]);
    } else {
      setSelectedPerson(null);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PageContainer>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <TitleWrapper>
          <Typography variant="h1">
            Wiki Sentiment Analysis
          </Typography>
        </TitleWrapper>
        <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} />
        <ChartContainer>
          <SentimentRadarChart data={selectedPerson} />
        </ChartContainer>
        <ScoreCards emotions={emotions} selectedPerson={selectedPerson} />
      </PageContainer>
    </ThemeProvider>
  );
};

export default Dashboard;
