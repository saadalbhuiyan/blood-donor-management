import React from 'react';
import { useState , useEffect  } from 'react';

const App = () => {
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {setPosts(data) ; setLoading(false)})
  }, [])
 
  if(loading) {
    return <div>loading ...........</div>
  }
  return (
    <div>
      <h1>posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;