from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tpTwitter.db'  # El nombre de la base de datos es usuarios.db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Creo la "tabla" Posts
class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(100), nullable=False)

# Creo la "tabla" Comments
class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(100), nullable=False)
    postId = db.Column(db.Integer, nullable=False)

@app.route('/api/createPost', methods=['POST'])
def createPost():
    data = request.json

    if 'author' in data and 'title' and 'content' in data:
        newPost = Posts(author=data['author'], title=data['title'], content=data['content'])
        db.session.add(newPost)
        db.session.commit()
        return jsonify({"mensaje": "Post creado correctamente"})
    else:
        return jsonify({"mensaje": "Error en los datos recibidos"}), 400

@app.route('/api/showPosts', methods=['GET'])
def showPosts():
    posts = Posts.query.all()
    postsData = [{"author": post.author, "title": post.title, "content": post.content} for post in posts]
    return jsonify({"posts": postsData})

@app.route('/api/createComment', methods=['POST'])
def createComment():
    data = request.json

    if 'author' in data and 'title' and 'content' and 'postId' in data:
        newComment = Comments(author=data['author'], title=data['title'], content=data['content'], postId=data['postId'])
        db.session.add(newComment)
        db.session.commit()
        return jsonify({"mensaje": "Comentario creado correctamente"})
    else:
        return jsonify({"mensaje": "Error en los datos recibidos"}), 400
    
@app.route('/api/showComments', methods=['GET'])
def showComments():
    comments = Comments.query.all()
    commentsData = [{"author": comment.author, "title": comment.title, "content": comment.content, "postId": comment.postId} for comment in comments]
    return jsonify({"comments": commentsData})

if __name__ == '__main__':
    with app.app_context():
        # Crear las tablas en la base de datos
        db.create_all()
    app.run(debug=True)