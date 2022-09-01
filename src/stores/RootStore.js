import { makeAutoObservable } from "mobx";
import { createContext , useContext} from "react";
import UserStore from "./UserStore";

export class RootStore {
  userStore;
  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.userStore.getUsers(); 
  }
}

export const StoreContext = createContext(RootStore);

export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

export default RootStore;
