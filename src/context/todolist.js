import { createContext, useContext } from 'react';

export const todoListContext = createContext();

export function useTodoList() {
  return useContext(todoListContext);
}
