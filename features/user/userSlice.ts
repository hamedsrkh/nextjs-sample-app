import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../app/store'
import { fetchUser } from './UserAPI'
import {User} from "../../types";

export interface UserState {
  user: User | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UserState = {
  user: null,
  status: 'idle',
}
export const fetchAsync = createAsyncThunk(
  'counter/fetchUser',
  async (id: string) => {
    const response = await fetchUser(id)
    return response
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
      })
  },
})

export const { setUser } = userSlice.actions


export const selectUser = (state: AppState) => state.user.user

export default userSlice.reducer
