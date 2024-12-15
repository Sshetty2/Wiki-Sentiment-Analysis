import { Box, styled } from '@mui/material';
import ScoreCard from './ScoreCard';

const ScoreCardsContainer = styled(Box)(({ theme }) => ({
  display               : 'flex',
  gap                   : theme.spacing(2),
  width                 : '100%',
  maxWidth              : '1200px',
  marginTop             : theme.spacing(4),
  marginBottom          : theme.spacing(8),
  padding               : theme.spacing(0, 2),
  overflowX             : 'auto',
  '&::-webkit-scrollbar': {
    height: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.default
  },
  '&::-webkit-scrollbar-thumb': {
    background  : theme.palette.grey[700],
    borderRadius: '3px'
  }
}));

const ScoreCards = ({ emotions, selectedPerson }: { emotions: any[], selectedPerson: any }) => (
  <ScoreCardsContainer>
    {emotions.map(emotion => (
      <ScoreCard key={emotion.name} emotion={emotion} selectedPerson={selectedPerson} />

    ))}
  </ScoreCardsContainer>
);

export default ScoreCards;
