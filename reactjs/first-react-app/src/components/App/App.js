import React from 'react';
import './App.css';
import useFetchApi from "../../hooks/useFetchApi";

function App() {
    const {data: posts, loading, fetched} = useFetchApi({
        url: 'https://jsonplaceholder.typicode.com/posts'
    });

    return (
        <ul>
            { loading ? (
                <div>Loading...</div>
            ) : (
                <React.Fragment>
                    {posts.map(post => <li key={post.id}>{post.title}</li>)}
                </React.Fragment>
            )}
            {fetched && (<div>Done Fetching</div>)}
        </ul>
    );
}

export default App;
