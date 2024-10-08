import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
function PodcastCard({id, title, displayImage }) {
  console.log(id);
  return (
  <Link to={`/podcast/${id}`}>
    <div className="podcast-card">
      <img className="display-image-podcast" src={displayImage}/>
      <p className="title-podcast">{title}</p>
    </div>
  </Link>
  )
}

export default PodcastCard
