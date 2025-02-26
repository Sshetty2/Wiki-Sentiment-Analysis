import React, { useState } from 'react';
import {
  Box,
  styled,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Skeleton
} from '@mui/material';
import SentimentRadarChart from './components/SentimentRadarChart';
import SearchBar from './components/SearchBar';
import ScoreCards from './components/ScoreCards';
import logo from './assets/logo.jpg';
import { analyzeTextViaLambda } from './api/ibm-nlu-request';
import { fetchWikiDataViaLambda } from './api/wiki-requests';

const darkTheme = createTheme({
  palette: {
    mode      : 'dark',
    background: {
      default: '#0b0c12',
      paper  : '#1e1e1e'
    },
    primary: {
      main: '#90CAF9'
    }
  },
  typography: {
    h1: {
      fontSize            : '2.5rem',
      fontWeight          : 600,
      background          : 'linear-gradient(45deg, #90CAF9 30%, #0087f3  90%)',
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
  marginTop          : theme.spacing(6),
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
  marginTop   : theme.spacing(2)
}));
const ChartContainer = styled(Box)<{ isLoading?: boolean }>(({ theme, isLoading }) => ({
  width          : '100%',
  maxWidth       : '600px',
  height         : '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius   : theme.shape.borderRadius * 2,
  padding        : isLoading ? 0 : theme.spacing(3),
  marginTop      : theme.spacing(4),
  marginBottom   : theme.spacing(8)
}));

const emotionsColorMap = [
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

const formatEmotions = (emotions: any) => Object.entries(emotions).map(([emotion, value]) => ({
  emotion,
  value
}));

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [selectedEntityEmotions, setSelectedEntityEmotions] = useState<any>(null);

  const handleSearch = async (value: string, pageId?: number) => {
    const term = value.toLowerCase();
    setSearchTerm(term);

    setIsLoading(true);

    const pageData = await fetchWikiDataViaLambda(value, pageId?.toString());

    const content = pageData?.content;

    if (!content) {
      setIsLoading(false);

      return;
    }

    const nluData = await analyzeTextViaLambda(content);

    const formattedEmotions = formatEmotions(nluData?.emotion?.document?.emotion);

    setSelectedEntity(value);
    setSelectedEntityEmotions(formattedEmotions);
    setIsLoading(false);
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
            Wiki Sentiment Analyzer
          </Typography>
        </TitleWrapper>
        <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} />
        <ChartContainer isLoading={isLoading}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />

          ) : (
            <SentimentRadarChart
              data={selectedEntityEmotions}
              selectedEntity={selectedEntity}
            />
          )}
        </ChartContainer>
        <ScoreCards emotionsColorMap={emotionsColorMap} data={selectedEntityEmotions} />
      </PageContainer>
    </ThemeProvider>
  );
};

export default Dashboard;
