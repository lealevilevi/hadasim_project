
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import patientReducer from '../slices/patientSlice';
import authSlice  from '../slices/authSlice' 

export const store = configureStore({
  reducer: {
          patient:patientReducer,
          auth:authSlice

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;