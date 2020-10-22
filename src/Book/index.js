import React from 'react'
import './book.scss'

export default function Book(props) {
    // const { title, src, author } = props;
    const { src, author } = props;
    return (
        <article className="book">
            <a href="#" className="book-inner">
                <figure>
                    <img src={src} alt="good morning 1" />
                </figure>
                <h4>
                    <i>By</i> {author}
                </h4>
            </a>
        </article>
    )
}
