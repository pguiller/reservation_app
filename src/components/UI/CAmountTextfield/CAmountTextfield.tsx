import React from 'react';
import { SxProps, Theme } from '@mui/material';
import CTextField from '../CTextField/CTextField';

interface CAmountTextfieldProps {
  id: string;
  label?: string;
  currency: string;
  value: string | number;
  minValue?: number;
  maxValue?: number;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number) => void;
  sx?: SxProps<Theme>;
}

const CAmountTextfield: React.FC<CAmountTextfieldProps> = ({
  id,
  label,
  currency,
  minValue,
  maxValue,
  value,
  setValue,
  sx,
}) => {
  const checkMinMaxAmountFortextField = (eventValue: string) => {
    let valueChecked = +eventValue;

    if (typeof maxValue !== 'undefined' && valueChecked > maxValue) {
      valueChecked = maxValue;
    }

    if (typeof minValue !== 'undefined' && valueChecked < minValue) {
      valueChecked = minValue;
    }

    setValue(+eventValue);
  };

  return (
    <CTextField
      id={id}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      label={label}
      type="number"
      endAdornment={currency}
      value={value}
      minValue={0}
      maxValue={maxValue}
      setValue={checkMinMaxAmountFortextField}
    />
  );
};

export default CAmountTextfield;
