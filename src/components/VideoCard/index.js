import './index.css'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    title,
    publishedAt,
    thumbnailUrl,
    name,
    profileImageUrl,
    viewCount,
  } = videoDetails
  return (
    <li>
      <img src={thumbnailUrl} alt={thumbnailUrl} className="thumbnail-image" />
      <div className="home-image-details-container">
        <div className="image-container">
          <img
            src={profileImageUrl}
            alt={profileImageUrl}
            className="profile-image"
          />
        </div>
        <div className="description-container">
          <p className="title">{title}</p>
          <div className="video-description">
            <p className="name">{name}</p>
            <p className="published-at">{publishedAt}</p>
            <p>{viewCount}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default VideoCard
