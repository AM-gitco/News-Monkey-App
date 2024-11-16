import React from 'react'

const Newsitem = (props) => {

  let { title, description, imgUrl, newsUrl, newsTime, author, source } = props;
  return (
    <div className='my-3 '>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source}</span></div>
        <img src={imgUrl ? imgUrl : 'https://d.newsweek.com/en/full/2478752/pac-12-logo.jpg'} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}.....</p>
          <a href={newsUrl} target='_blank' className="btn btn-sm btn-outline-info">Read more</a>
        </div>
        <div className="card-footer">
          <small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(newsTime).toGMTString()}</small>
        </div>
      </div>
    </div>
  )

}
export default Newsitem