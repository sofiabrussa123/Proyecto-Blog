const CreatePost = (author, title, content) => {
    fetch(`http://localhost:5000/api/createPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, content }),  
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json();  
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error al enviar mensaje:', error);
        });
}

const CreateComment = (author, title, content, postId) => {
  fetch(`http://localhost:5000/api/createComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, title, content, postId }),  
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();  
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al enviar mensaje:', error);
      });
}

export default {CreatePost, CreateComment}