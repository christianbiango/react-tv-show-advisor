import axios from "axios";
import { useEffect, useState } from "react";
import "./global.css";
import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/img/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommandationsList, setRecommandationsList] = useState([]);
  // Use effects ne peut retourner que des fonctions et pas des promesses donc on créer une fonction qui contiendra la promesse à l'exterieur
  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (err) {
      alert(
        "Erreur lors de la récupération des séries populaires " + err.message
      );
    }
  }

  async function fetchRecommandations(tvShowId) {
    try {
      const recommandations = await TVShowAPI.fetchRecommandations(tvShowId);
      if (recommandations.length > 0) {
        setRecommandationsList(recommandations.slice(0, 10));
      }
    } catch (err) {
      alert(
        "Erreur durant la recherche des séries recommandées " + err.message
      );
    }
  }
  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommandations(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (err) {
      alert("Erreur lors de la recherche des séries " + err.message);
    }
  }
  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="Watowatch"
              subtitles="Find a show you may like"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommandations}>
        {recommandationsList && recommandationsList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            tvShowList={recommandationsList}
          />
        )}
      </div>
    </div>
  );
}
