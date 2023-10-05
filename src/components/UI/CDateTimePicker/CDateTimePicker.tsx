import React from 'react';
import { cDateTimePickerStyles } from './styles';
import { Box, Link, SxProps, Theme, useTheme } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { Dayjs } from 'dayjs';

interface CDateTimePickerProps {
  value: Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setValue: (arg: Dayjs | null) => void;
  hasTodayButton?: boolean;
  hasTomorrowButton?: boolean;
  label?: string;
  minDate?: dayjs.Dayjs | undefined;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const CDateTimePicker: React.FC<CDateTimePickerProps> = ({
  value,
  setValue,
  hasTodayButton,
  hasTomorrowButton,
  label,
  minDate,
  disabled = false,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cDateTimePickerStyles(theme).container,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DateTimePicker
        label={label}
        value={value}
        onChange={(newValue: Dayjs | null) => setValue(newValue)}
        minDate={minDate}
        disabled={disabled}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
      {hasTodayButton && (
        <Box>
          <Link
            sx={cDateTimePickerStyles(theme).link}
            onClick={() => setValue(dayjs())}
          >
            {"Aujourd'hui"}
          </Link>
        </Box>
      )}
      {hasTomorrowButton && (
        <Box>
          <Link
            sx={cDateTimePickerStyles(theme).link}
            onClick={() => setValue(dayjs().add(1, 'day'))}
          >
            {'Demain'}
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default CDateTimePicker;
