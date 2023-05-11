import alfabet from '../assets/a-z.png'
import rating from '../assets/rating.png'
import video from '../assets/video.png'
import likes from '../assets/amor.png'

const Filters = ({ setSortBy, sortBy, showAll, setSortOrder, sortOrder, handleShowAll}) => {

  const handleSort = (sortType) => {
    if (sortType === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(sortType)
      if (sortType === 'title') {
        setSortOrder('desc')
      } else if (sortType === 'popularity' || sortType === 'likes') {
        setSortOrder('asc')
      }
    }
  }

  return (
    <div className="filter-buttons">
      <div className="titulos-filtros">
        <label className="labels-filters">
          <strong>Name</strong>
        </label>
        <img
          src={alfabet}
          onClick={() => handleSort('title')}
          className={sortBy === 'title' ? 'active' : ''}
        />
      </div>
      <div className="titulos-filtros">
        <label className="labels-filters">
          <strong>Rating</strong>
        </label>
        <img
          src={rating}
          onClick={() => handleSort('popularity')}
          className={sortBy === 'popularity' ? 'active' : ''}
        />
      </div>
      <div className="titulos-filtros">
        <label className="labels-filters">
          <strong>Likes</strong>
        </label>
        <img
          src={likes}
          onClick={() => handleSort('likes')}
          className={sortBy === 'likes' ? 'active': ''}
        />
      </div>
      <div className="titulos-filtros">
        <label className="labels-filters">
          <strong>All Movies</strong>
        </label>
        <img
          src={video}
          onClick={() => handleShowAll()}
          className={showAll ? 'active' : ''}
        />
      </div>
    </div>
    
  )
}

export default Filters