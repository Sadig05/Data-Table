import { runInAction, makeAutoObservable, reaction } from "mobx";
import userService from "../services/service"

class UserStore {
  users = [];
  filters = { _page: 1, _limit: 10 };
  status = "inital";
  count;
  constructor() {
    this.userService = new userService();
    makeAutoObservable(this);

    reaction(
      () => [this.filters],
      () => this.getUsers()
    );
  }

  getUsers = async () => {
    try {
      const { data, headers } = await this.userService.getData(this.filters);
      console.log(this.filters[0]);
      const totalCount = parseInt(headers["x-total-count"]);
      runInAction(() => {
        this.users = data;
        this.count = totalCount;
      });
    } catch (e) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  setFilters(filters) {
    console.log(filters);
    this.filters = { ...this.filters, ...filters };
  }
}

export default UserStore;
