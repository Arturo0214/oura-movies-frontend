import alfabet from '../assets/a-z.png'
import rating from '../assets/rating.png'
import video from '../assets/video.png'

const Filters = ({ setSortBy, setShowAll, sortBy, showAll, setSortOrder, sortOrder, handleShowAll }) => {

  const handleSort = (sortType) => {
    if (sortType === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(sortType)
      setSortOrder('asc')
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
          style={{ width: '80px', height: '80px' }}
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
          style={{ width: '80px', height: '80px' }}
          onClick={() => handleSort('popularity')}
          className={sortBy === 'popularity' ? 'active' : ''}
        />
      </div>
      <div className="titulos-filtros">
        <label className="labels-filters">
          <strong>All Movies</strong>
        </label>
        <img
          src={video}
          style={{ width: '80px', height: '80px' }}
          onClick={() => handleShowAll(setShowAll(true))}
          className={showAll ? 'active' : ''}
        />
      </div>
    </div>
    
  )
}

export default Filters