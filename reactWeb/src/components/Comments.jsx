import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Requests from './Requests.jsx';

const Comments = (props) => {
  const { ID } = props;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/showComments')
      .then(response => response.json())
      .then(data => setComments(data.comments))
      .catch(error => console.error('Error al obtener comentarios:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Requests.CreateComment(author, title, content, ID);
    setAuthor('');
    setTitle('');
    setContent('');
  };

  const filteredComments = comments.filter(comment => comment.postId === ID);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)}/>
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
        <textarea
            onChange={(e) => setContent(e.target.value)} 
            name="content" 
            value={content} 
            cols="30" 
            rows="10"
            spellCheck="false"
            placeholder="Write your comment in .md"
        >
        </textarea>
        <button type="submit">Submit</button>
      </form>

      <h3>Comments</h3>

      {filteredComments.map((comment, i) => (
        <div key={i}>
          <h5>{comment.author}</h5>
          <h4>{comment.title}</h4>
          <Markdown remarkPlugins={[remarkGfm]}>{comment.content}</Markdown>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Comments;



