import { Paper, styled, Typography } from '@mui/material';

const ScoreCardContainer = styled(Paper)(({ theme }: { theme: any }) => ({
  flex           : '1 0 200px',
  padding        : theme.spacing(2),
  display        : 'flex',
  flexDirection  : 'column',
  alignItems     : 'center',
  gap            : theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius   : theme.shape.borderRadius * 2,
  transition     : 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover'      : {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}));

const ScoreCard = ({ emotion, selectedPerson }: { emotion: any, selectedPerson: any }) => (
  <ScoreCardContainer>
    <Typography
      variant="h6"
      sx={{
        color     : emotion.color,
        fontWeight: 500
      }}
    >
      {emotion.name}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
      {selectedPerson ? `${(selectedPerson.emotions.find(
        (e: any) => e.emotion === emotion.name
      )?.value * 100 || 0).toFixed(1)}%` : '0.0%'
      }
    </Typography>
  </ScoreCardContainer>
);

export default ScoreCard;
