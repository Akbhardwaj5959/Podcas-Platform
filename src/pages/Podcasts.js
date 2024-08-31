import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/common/Input";

function PodcastsPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  console.log(podcasts)
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.error("Error fetching podcasts", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );


  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1> Discover Podcasts</h1>

        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />

        {filteredPodcasts.length > 0 ? (
          <div className="podcast-flex" style={{marginTop: "1rem"}}>
            {" "}
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}{" "}
          </div>
        ) : (
            <p>{search? "Podcast Not Found" :"No Podcast On The Plateform"}</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
