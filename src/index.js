import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import Book from './Book/index';
import './index.scss';

function BookApp() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [splashImg, setSplashImg] = useState([])
  const [query, setQuery] = useState("cars")

  const updateQuery = (event) => {
    setQuery(event.target.value)
  };

  const getPhotos = async () => {
    const _url = "https://api.pexels.com/v1/search?per_page=20&query=" + query;
    setIsLoading(true)
    await fetch(_url, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: '563492ad6f9170000100000120d03a3e3ee14acfa82ea087c573b3cc'
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        }
        else {
          setIsLoading(false)
          setIsError(true)
          throw new Error(response.statusText)
        }
      })
      .then(img => {
        console.log(img.photos)
        setSplashImg(img.photos);
        setIsLoading(false)
      })
      .catch(error => setIsError(error))
  }

  useEffect(() => {
    getPhotos();
  }, [])

  const loadingTemplate = <div className="container text-center">
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>

  const errorTemplate = <div className="container text-center">
    <h1>Error.....</h1>
  </div>

  const template = splashImg.map(x => (
    <Book url={x.url} src={x.src.medium} author={x.photographer} key={x.id} />
  ))

  return (
    <section className="book-app" id="book-app">
      <div className="container">
        <h1 className="text-center">
          Get Photos From <a href="https://www.pexels.com/" target="_blank" rel='noreferrer noopener'>Pexels.com</a>
        </h1>

        <div className="search-bar text-center">
          <input type="text" name="search" id="search" placeholder="Search by categories" onChange={updateQuery} />
          <button className="search-btn" type="submit" onClick={getPhotos}>Search</button>
        </div>

        <div className="book-wrapper">
          {
            isLoading ? loadingTemplate : (
              isError ? errorTemplate : template
            )
          }
        </div>
      </div>
    </section>
  )
}

ReactDom.render(
  <BookApp />,
  document.getElementById('root')
);