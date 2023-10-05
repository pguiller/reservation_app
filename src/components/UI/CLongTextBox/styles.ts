import { SxProps, Theme } from '@mui/material';

interface CLongtextBoxStyles {
  // eslint-disable-next-line no-unused-vars
  card: (maxLineCount?: number) => SxProps;
}

export const cLongtextBoxStyles = (theme: Theme): CLongtextBoxStyles => ({
  card: (maxLineCount) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    minHeight: theme.spacing(maxLineCount ?? 10),
    display: '-webkit-box',
    alignItems: 'center',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLineCount ?? 'unset',
    overflow: 'auto',
    overflowX: 'hidden',
  }),
});
