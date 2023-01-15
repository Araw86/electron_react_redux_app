import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  aDownloadQueue: [],
  sDownloading: null,
  /**
   * 0 - no download
   * 1 - download complete
   * 2 - download error possible opende file
   * 3 - waiting for next download
   * 4 - downloading
   */
  iDownloadState: 0
}

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    itemDownloaded: (state) => {
      /* remove element from queue */
      state.aDownloadQueue.shift()
      state.sDownloading = null
      /*indicate that download is stopped */
      if (state.aDownloadQueue.length == 0) {
        state.iDownloadState = 0
      } else {
        state.iDownloadState = 1
      }
    },
    itemDownloadError: (state) => {
      state.iDownloadState = 2

    },
    addItemForDownload: (state, action) => {
      console.log(action)
      const iArrayINdex = state.aDownloadQueue.findIndex((sItem) =>
        sItem === action.payload
      )
      console.log(iArrayINdex)
      if (iArrayINdex == -1) {
        state.aDownloadQueue.push(action.payload)
      }
      if (state.iDownloadState == 0) {
        state.iDownloadState = 4
        state.sDownloading = state.aDownloadQueue[0]
      }
    },
    removeItemFromDownload: (state, action) => {
      if (state.aDownloadQueue.length == 0) {
        return
      }
      const iArrayIndex = state.aDownloadQueue.findIndex((sItem) =>
        sItem === action.payload
      )

      if ((state.aDownloadQueue.length > 1) || (iDownloadState == 0) || (iDownloadState == 3)) {
        state.aDownloadQueue.splice(iArrayIndex, 1)
      }
    },
    startDownload: (state) => {
      if ((state.iDownloadState != 1) && (state.aDownloadQueue.length > 0)) {
        state.iDownloadState = 4;
        state.sDownloading = state.aDownloadQueue[0]
      }
    },

    resetDownload: (state) => {
      state.iDownloadState = 0
      state.sDownloading = null
    }
  }
});

export const { itemDownloaded, itemDownloadError, downloadItem, addItemForDownload, removeItemFromDownload, startDownload, resetDownload } = downloadSlice.actions

export default downloadSlice.reducer