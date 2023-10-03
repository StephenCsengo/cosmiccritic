from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy

from config import db


# Models go here!
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    __password_hash = db.Column(db.String)

    def __repr__(self):
        return f"<username: {self.username}, id: {self.id}>"


class Author(db.Model):
    __tablename__ = "authors"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<author: {self.first_name} {self.last_name}"


class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    cover_image = db.Column(db.String)
    page_count = db.Column(db.Integer)
    publish_year = db.Column(db.Integer)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), nullable=False)

    author = db.relationship("Author", backref="authors")

    def __repr__(self):
        return f"<{self.title} by author #{self.author_id}>"


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    review = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    user = db.relationship("User", backref="users")
    book = db.relationship("Book", backref="books")

    def __repr__(self):
        return f"<Rating: {self.rating}, Review: {self.review} by user #{self.user_id} of book #{self.book_id}>"
