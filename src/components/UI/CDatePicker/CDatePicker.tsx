import React from 'react';
import { cDatePickerStyles } from './styles';
import { Box, Link, SxProps, Theme, useTheme } from '@mui/material';
import useIsTabletPortait from 'src/hooks/useIsTablet';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface CDatePickerProps {
  value: Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setValue: (arg: Dayjs | null) => void;
  onChange?: () => void;
  hasTodayButton?: boolean;
  hasTomorrowButton?: boolean;
  label?: string;
  minDate?: dayjs.Dayjs | undefined;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const CDatePicker: React.FC<CDatePickerProps> = ({
  value,
  setValue,
  onChange,
  hasTodayButton,
  hasTomorrowButton,
  label,
  minDate,
  disabled = false,
  sx,
}) => {
  const isTablet = useIsTabletPortait();
  const theme = useTheme();

  return (
    <Box
      sx={[
        cDatePickerStyles(theme).container,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {isTablet ? (
        <MobileDatePicker
          label={label}
          value={value}
          onChange={(newValue: Dayjs | null) => {
            setValue(newValue);
            if (onChange) {
              onChange();
            }
          }}
          minDate={minDate}
          disabled={disabled}
        />
      ) : (
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue: Dayjs | null) => setValue(newValue)}
          minDate={minDate}
          disabled={disabled}
        />
      )}
      {hasTodayButton && (
        <Box>
          <Link
            sx={cDatePickerStyles(theme).link}
            onClick={() => setValue(dayjs())}
          >
            {"Aujourd'hui"}
          </Link>
        </Box>
      )}
      {hasTomorrowButton && (
        <Box>
          <Link
            sx={cDatePickerStyles(theme).link}
            onClick={() => setValue(dayjs().add(1, 'day'))}
          >
            {'Demain'}
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default CDatePicker;
