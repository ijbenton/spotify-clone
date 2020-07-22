import { createSelector } from 'reselect';

const selectUI = state => state.ui;

export const selectIsSidebarOpen = createSelector(
  [selectUI],
  ui => ui.isSidebarOpen
);
