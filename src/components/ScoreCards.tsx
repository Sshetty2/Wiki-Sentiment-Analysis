import { Box, styled } from '@mui/material';
import ScoreCard from './ScoreCard';

const ScoreCardsContainer = styled(Box)(({ theme }) => ({
  display                       : 'flex',
  justifyContent                : 'center',
  gap                           : theme.spacing(2),
  width                         : '100%',
  maxWidth                      : '1200px',
  marginTop                     : theme.spacing(4),
  marginBottom                  : theme.spacing(8),
  padding                       : theme.spacing(0, 2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column', // Stack vertically on small screens
    gap          : theme.spacing(1)
  }
}));

const ScoreCards = ({ emotionsColorMap, data }: { emotionsColorMap: any[], data: any}) => (
  <ScoreCardsContainer>
    {emotionsColorMap.map(emotion => (
      <ScoreCard key={emotion.name} emotion={emotion} data={data} />

    ))}
  </ScoreCardsContainer>
);

export default ScoreCards;
