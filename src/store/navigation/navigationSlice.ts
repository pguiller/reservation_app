import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  leftMenuOpened: boolean;
  themeMode: 'light' | 'dark';
}

const initialState: NavigationState = {
  leftMenuOpened: false,
  themeMode: 'light',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    leftMenuOpened: (state, action: PayloadAction<boolean>) => {
      state.leftMenuOpened = action.payload;
    },
    switchThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { leftMenuOpened, switchThemeMode } = navigationSlice.actions;

export default navigationSlice.reducer;
