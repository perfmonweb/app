import { createSelector } from 'reselect';

const directoryState = (state) => state.directory;

export const selectFolders = createSelector(
  [directoryState],
  (state) => state.folders
);

export const selectPath = createSelector(
  [directoryState],
  (state) => state.selectedPath
);
