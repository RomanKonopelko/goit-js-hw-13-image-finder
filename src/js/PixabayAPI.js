import { error } from "@pnotify/core";

export default class ApiDataService {
  constructor() {
    this.perPage = 4;
    this._page = 1;
    this.searchQuery = "";
  }
  async fetchRequest() {
    console.log(this._page);
    try {
      const url = "https://pixabay.com/api/";
      const key = "19834827-b752d1c95cba28ff11bc03641";
      if (this.searchQuery === "") return;

      const response = await fetch(
        `${url}?key=${key}&q=${this.searchQuery}&orientation=horizontal&per_page=${this.perPage}&page=${this._page}`,
      );

      const data = await response.json().then(this.increasePage());
      if (data.hits.length === 0) throw error;
      const { hits } = data;
      return hits;
    } catch (error) {
      throw new Error();
    }
  }
  increasePage() {
    this._page += 1;
  }
  resetPage() {
    this._page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
