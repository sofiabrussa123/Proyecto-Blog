import { useEffect, useState } from 'react'
import { Router, Route, Link, useParams } from 'react-router-dom';

function App() {

  const [posts, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/showPosts')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then(data => {
      setPost(data.posts);
    })
    .catch(error => {
      console.error('Error al obtener posts:', error);
    });
  },[])

  // const toggleAdmin = () =>{
  //   setIsAdmin(false)
  //   localStorage.setItem('isAdmin', JSON.stringify(false))
  // }

  const handleDelete = (id) => {
    let deletedPost = [...posts]
    let deletedComment = [...comments]

    deletedPost.splice(id, 1)
    deletedComment.splice(id, 1)

    setComments(deletedComment)
    setPost(deletedPost)

    localStorage.setItem('posts', JSON.stringify(deletedPost))
    localStorage.setItem('comments', JSON.stringify(deletedComment))
  }

  return (
    <>
    <Link to={'/create'}><button>Create</button></Link>
    {isAdmin && (
      <button onClick={toggleAdmin}> Toggle Admin</button>
    )}
    
    <ul>
      {posts.map((post, id) => (
        <li key={id}>
          <Link to={`/posts/${id}`}>
            <strong>{post.title}</strong>
          </Link>
          {
            isAdmin && (
              <>
                <button onClick={() => handleDelete(id)}>Delete</button>
                <Link to={`/edit/${id}`}> <button>Edit</button> </Link>
              </>
            )
          }
        </li>
      ))}
    </ul>
    </>
  )
}

export default App
