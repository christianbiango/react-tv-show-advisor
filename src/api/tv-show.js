import axios from "axios";
import { BASE_URL } from "../config";

export class TVShowAPI {
  static async fetchPopulars() {
    console.log(process.env.REACT_APP_API_KEY_PARAM);
    const response = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
    );
    return response.data.results;
  }

  static async fetchRecommandations(tvShowId) {
    const response = await axios.get(
      `${BASE_URL}/tv/${tvShowId}/recommendations?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
    );
    return response.data.results;
  }

  static async fetchByTitle(title) {
    const response = await axios.get(
      `${BASE_URL}/search/tv?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${title}`
    );
    return response.data.results;
  }
}
