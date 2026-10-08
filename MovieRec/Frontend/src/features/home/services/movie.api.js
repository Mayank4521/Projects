import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

const HOME_LISTS = {
  popular: "/3/discover/movie?with_origin_country=IN&with_original_language=hi&sort_by=popularity.desc&page=1",
  trending: "/3/trending/all/week?language=en-US",
  comedy: "/3/discover/movie?with_genres=35&sort_by=popularity.desc&language=en-US&page=1",
  topRated: "/3/movie/top_rated?language=en-US&page=1",
  hollywood: "/3/discover/movie?with_origin_country=US&with_original_language=en&sort_by=popularity.desc&language=en-US&page=1",
};

export const getHomeLists = async () => {
  try {
    const listEntries = Object.entries(HOME_LISTS);
    const responses = await Promise.allSettled(
      listEntries.map(async ([key, url]) => {
        const response = await api.get(url);
        return [key, response.data.results ?? []];
      }),
    );

    const failedPopularRequest = responses[0];
    if (failedPopularRequest.status === "rejected") {
      throw failedPopularRequest.reason;
    }

    responses.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Failed to load ${listEntries[index][0]} movies:`, result.reason);
      }
    });

    const lists = Object.fromEntries(
      responses.flatMap((result) => result.status === "fulfilled" ? [result.value] : []),
    );
    const { popular, ...sections } = lists;

    return { movies: popular, sections };
  } catch (error) {
    console.error(error);
    throw error;
  }
};