#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Book, Review, Author

app.secret_key = b"?w\x85Z\x08Q\xbdO\xb8\xa9\xb65Kj\xa9_"

ma = Marshmallow(app)


# Marshmallow schemas
class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field()
    username = ma.auto_field()


user_schema = UserSchema()
many_users_schema = UserSchema(many=True)


class AuthorSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Author

    id = ma.auto_field()
    name = ma.auto_field()


author_schema = AuthorSchema()
many_authors_schema = AuthorSchema(many=True)


class BookSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Book

    id = ma.auto_field()
    title = ma.auto_field()
    desc = ma.auto_field()
    cover_image = ma.auto_field()
    page_count = ma.auto_field()
    publish_year = ma.auto_field()
    author_id = ma.auto_field
    author = ma.Nested(author_schema)


book_schema = BookSchema()
many_books_schema = BookSchema(many=True)


class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review

    id = ma.auto_field()
    rating = ma.auto_field()
    review = ma.auto_field()
    user_id = ma.auto_field()
    book_id = ma.auto_field()
    user = ma.Nested(user_schema)
    book = ma.Nested(book_schema)


review_schema = ReviewSchema()
many_reviews_schema = ReviewSchema(many=True)


# Views go here!
class Signup(Resource):
    def post(self):
        pass


class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        response = make_response(
            many_reviews_schema.dump(reviews),
            200,
        )

        return response

    def post(self):
        pass


class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()

        if review:
            return review_schema.dump(review), 200
        else:
            return {"message": "Review not found"}, 404


class Users(Resource):
    def get(self):
        users = User.query.all()
        response = make_response(
            many_users_schema.dump(users),
            200,
        )

        return response


class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            return user_schema.dump(user), 200
        else:
            return {"message": "User not found"}, 404


class Authors(Resource):
    def get(self):
        authors = Author.query.all()
        response = make_response(
            many_authors_schema.dump(authors),
            200,
        )
        return response


class AuthorByID(Resource):
    def get(self, id):
        author = Author.query.filter_by(id=id).first()

        if author:
            return author_schema.dump(author), 200
        else:
            return {"message": "Author not found"}, 404


class Books(Resource):
    def get(self):
        books = Book.query.all()
        response = make_response(
            many_books_schema.dump(books),
            200,
        )
        return response


class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()

        if book:
            return book_schema.dump(book), 200
        else:
            return {"message": "Book not found"}, 404


api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Reviews, "/reviews", endpoint="reviews")
api.add_resource(ReviewByID, "/reviews/<int:id>")
api.add_resource(Users, "/users", endpoint="users")
api.add_resource(UserByID, "/users/<int:id>")
api.add_resource(Authors, "/authors", endpoint="authors")
api.add_resource(AuthorByID, "/authors/<int:id>")
api.add_resource(Books, "/books", endpoint="books")
api.add_resource(BookByID, "/books/<int:id>")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
