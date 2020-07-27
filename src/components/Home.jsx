import React from 'react'
import img from '../assets/images/work.png'

const Home = () => {
    return (
        <div>
            <div className="mt-3">
                <blockquote className="blockquote text-center">
                    <p className="mb-0">Create an account today...</p>
                    <footer className="blockquote-footer">and start organizing your daily activities</footer>
                </blockquote>
                <img src={img} className="mx-auto d-block w-50" alt="your chore list"/>
            </div>
        </div>
    )
}

export default Home