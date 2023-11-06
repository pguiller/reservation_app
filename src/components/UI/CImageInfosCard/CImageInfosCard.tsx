import React from 'react';
import { cImageInfosCardStyles } from './styles';
import {
  Box,
  Tooltip,
  IconButton,
  Typography,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import CInfosCard from '../CInfosCard/CInfosCard';
import { AddressCardInfos } from 'src/utils/types/AddressCardInfos';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface CImageInfosCardProps {
  infos: AddressCardInfos;
  sx?: SxProps<Theme>;
}

const CImageInfosCard: React.FC<CImageInfosCardProps> = ({ infos, sx }) => {
  const theme = useTheme();

  return (
    <CInfosCard
      sx={[
        cImageInfosCardStyles(theme).card,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={cImageInfosCardStyles(theme).container}>
        <Box sx={cImageInfosCardStyles(theme).imageContainer}>
          <img src={infos.image} alt={infos.title} />
        </Box>
        <Box sx={cImageInfosCardStyles(theme).infosContainer}>
          <Typography variant="h3" color={'secondary'}>
            {infos.title}
          </Typography>
          <Typography
            variant="body1"
            color={'secondary'}
            sx={{ textAlign: 'justify' }}
          >
            {infos.description}
          </Typography>
          <Box sx={cImageInfosCardStyles(theme).iconsContainer}>
            <Tooltip title={'Adresse'}>
              <IconButton
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      infos.address,
                    )}`,
                    '_blank',
                  )
                }
              >
                <LocationOnIcon color="secondary" />
              </IconButton>
            </Tooltip>
            {infos.link !== null && (
              <Tooltip title={'Site internet'}>
                <IconButton
                  onClick={() =>
                    infos.link && window.open(infos.link, '_blank')
                  }
                >
                  <InsertLinkIcon color="secondary" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
    </CInfosCard>
  );
};

export default CImageInfosCard;
