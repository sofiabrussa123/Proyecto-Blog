import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = () => {
  
  let { id } = useParams()
  let intId = parseInt(id)
  let navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    let jsonPosts = JSON.parse(localStorage.getItem('posts'))
    if (jsonPosts) {
        setPosts(jsonPosts)

        let post = jsonPosts[intId]
        if (post) {
        setAuthor(post.author)
        setTitle(post.title)
        setContent(post.content)
        }
    }
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    let input = {author: author, title: title, content: content}
    let newPosts = posts
    newPosts[intId] = input
    setPosts(newPosts)
    localStorage.setItem('posts', JSON.stringify(newPosts))

    setAuthor('')
    setTitle('')
    setContent('')
    navigate(`/posts/${intId}`)
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={author} placeholder='Author' onChange={e => setAuthor(e.target.value)}/>
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)}/>
        <textarea
                onChange={(e) => setContent(e.target.value)} 
                name="content" 
                value={content} 
                cols="30" 
                rows="10"
                spellCheck="false"
                placeholder="Edit your post in .md"
            >
        </textarea>
        <button type="submit">Submit</button>
    </form>
  )
}

export default Edit