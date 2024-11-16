/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import React, { Component } from 'react';
// import Newsitem from './Newsitem';
// import Spinner from './Spinner';
// import propTypes from 'prop-types';

// export default class News extends Component {
//   static defaultProps = {
//     pageSize: 8,
//     country: 'us'
//   }

//   static propTypes = {
//     pageSize: propTypes.number,
//     country: propTypes.string
//   }

//   capitilizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//        articles: [],
//        loading: false,
//        pageNo: 1,
//        totalresults: 0 
//     }
//     document.title = `${this.capitilizeFirstLetter(props.category)} - NewsMonkey`;
//   }

//   async updateNews() {
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=01765f60e7d04974a6762cf15188d97e&page=${this.state.pageNo}&pageSize=${props.pageSize}`
//     // let url = `https://newsapi.org/v2/everything?country=${props.country}&q=sports&sortBy=publishedAt&apiKey=01765f60e7d04974a6762cf15188d97e&page=1&pageSize=${props.pageSize}`;
//     this.setState({loading: true});
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({
//       articles: parsedData.articles,
//       totalresults: parsedData.totalResults,
//       loading: false
//     });
//   }
//   async componentDidMount() {
//     this.updateNews();
//   }

//   handlePreviousclick = async () => {
//     this.setState({pageNo: this.state.pageNo - 1});
//     this.updateNews();
//   }

//   handleNextclick = async () => {
//     this.setState({pageNo: this.state.pageNo + 1});
//     this.updateNews();
//   }

//   render() {
//     return (
//       <div className="container my-3">
//         <h2 className='text-center' style={{margin: '35px 0'}}>NewsMonkey - Top   {this.capitilizeFirstLetter(props.category)} highlights</h2>
//         {this.state.loading && <Spinner />}
//         <div className="row">
//           {!this.state.loading && this.state.articles && this.state.articles.length > 0 && this.state.articles.map((element) => {
//             return (
//               <div className="col-md-4" key={element.url}>
//                 <Newsitem 
//                   title={element.title ? element.title.slice(0, 45) : ''} 
//                   description={element.description ? element.description.slice(0, 85) : ''} 
//                   imgUrl={element.urlToImage} 
//                   newsUrl={element.url} 
//                   newsTime={element.publishedAt}
//                   author={element.author}
//                   source={element.source.name}
//                 />
//               </div>
//             );
//           })}
//         </div>
//         <div className="container d-flex justify-content-between my-5">
//           <button disabled={this.state.pageNo <= 1} type="button" className="btn btn-lg btn-dark" onClick={this.handlePreviousclick}>&#8617; Previous</button>
//           <button disabled={this.state.pageNo + 1 >= Math.ceil(this.state.totalresults / props.pageSize)} type="button" className="btn btn-lg btn-dark" onClick={this.handleNextclick}>Next &#8618;</button>
//         </div>
//       </div>
//     );
//   }
// }
import React, { useEffect , useState} from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalresults, setTotalresults] = useState(0);
  const [progress, setProgress] = useState(0);

  const capitilizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

 
  

  const updateNews =async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`
    // let url = `https://newsapi.org/v2/everything?country=${props.country}&q=sports&sortBy=publishedAt&apiKey=01765f60e7d04974a6762cf15188d97e&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalresults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() =>{
    document.title = `${capitilizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [ ])

  // const handlePreviousclick = async () => {
  //   setPageNo(pageNo - 1);
  //   updateNews();
  // }

  // const handleNextclick = async () => {
  //   setPageNo(pageNo + 1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo + 1}&pageSize=${props.pageSize}`
    // let url = `https://newsapi.org/v2/everything?country=${props.country}&q=sports&sortBy=publishedAt&apiKey=01765f60e7d04974a6762cf15188d97e&page=1&pageSize=${props.pageSize}`;
    setPageNo(pageNo + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalresults(parsedData.totalResults);
    
  }

 
    return (
      <>
        <h2 className='text-center' style={{ margin: '35px 0' , marginTop: '90px'}}>NewsMonkey - Top   {capitilizeFirstLetter(props.category)} highlights</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalresults}
          loader={<Spinner />}
        >

          <div className="container my-3 ">
            <div className="row">
              {articles && articles.length > 0 && articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ''}
                      description={element.description ? element.description.slice(0, 85) : ''}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      newsTime={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
{/* 
        <div className="container d-flex justify-content-between my-5">
          <button disabled={pageNo <= 1} type="button" className="btn btn-lg btn-dark" onClick={handlePreviousclick}>&#8617; Previous</button>
          <button disabled={.pageNo + 1 >= Math.ceil(totalresults / props.pageSize)} type="button" className="btn btn-lg btn-dark" onClick={handleNextclick}>Next &#8618;</button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {
  pageSize: 8,
  country: 'us'
}

News.propTypes = {
  pageSize: propTypes.number,
  country: propTypes.string
}

export default News