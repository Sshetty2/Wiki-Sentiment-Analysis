import { Paper, styled, Typography } from '@mui/material';

const ScoreCardContainer = styled(Paper)(({ theme }) => ({
  flex           : '0 0 150px', // Reduce base width to 150px
  padding        : theme.spacing(1.5), // Reduce padding
  display        : 'flex',
  flexDirection  : 'column',
  alignItems     : 'center',
  gap            : theme.spacing(1), // Reduce gap
  backgroundColor: theme.palette.background.paper,
  borderRadius   : theme.shape.borderRadius * 2,
  transition     : 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover'      : {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}));

const ScoreCard = ({ emotion, data }: { emotion: any, data: any }) => (
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
    <Typography variant="h4" sx={{ fontWeight : 'bold',
      paddingLeft: '10px' }}>
      {data ? `${(data.find(
        (e: any) => e.emotion === emotion.name.toLowerCase()
      )?.value * 100 || 0).toFixed(1)}%` : '0.0%'
      }
    </Typography>
  </ScoreCardContainer>
);

export default ScoreCard;
