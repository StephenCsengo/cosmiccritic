#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow

from config import app, db, api
from models import User, Book, Review, Author


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
    author = ma.Nested(author_schema)


book_schema = BookSchema()
many_books_schema = BookSchema(many=True)


class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review

    id = ma.auto_field()
    rating = ma.auto_field()
    review = ma.auto_field()
    user = ma.Nested(user_schema)
    book = ma.Nested(book_schema)


review_schema = ReviewSchema()
many_reviews_schema = ReviewSchema(many=True)


class cookieTest(Resource):
    def get(self):
        session["user_id"] = 5
        user = User.query.filter(User.id == session["user_id"]).first()
        import ipdb

        ipdb.set_trace()


class Login(Resource):
    def post(self):
        json = request.get_json()
        username = json.get("username")
        password = json.get("password")

        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id

            return user_schema.dump(user), 200
        else:
            return {"message": "401: Unauthorized"}, 401


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "Logout successful"}, 204


class Signup(Resource):
    pass


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return user_schema.dump(user), 200
        else:
            return {"message": "401: Unauthorized"}, 401


class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        response = make_response(
            many_reviews_schema.dump(reviews),
            200,
        )

        return response

    def post(self):
        json = request.get_json()

        new_rating = Review(
            user_id=json.get("user_id"),
            book_id=json.get("book_id"),
            rating=json.get("rating"),
            review=json.get("review"),
        )

        try:
            db.session.add(new_rating)
            db.session.commit()
            return review_schema.dump(new_rating), 201

        except IntegrityError:
            return {"message": "401: Unauthorized"}, 401


class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()

        if review:
            return review_schema.dump(review), 200
        else:
            return {"message": "Review not found"}, 404

    def patch(self, id):
        review = Review.query.filter_by(id=id).first()

        if review:
            for attr in request.form:
                setattr(dog, attr, request.form[attr])
            db.session.add(review)
            db.session.commit()

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

    def post(self):
        json = request.get_json()

        user = User(username=json.get("username"))
        user.password_hash = json.get("password")

        try:
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user_schema.dump(user), 201

        except IntegrityError:
            return {"message": "401: Unauthorized"}, 401


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


class BooksByAuthorID(Resource):
    def get(self, author_id):
        books = Book.query.filter(Book.author_id == author_id).all()

        if books:
            return many_books_schema.dump(books), 200
        else:
            return {"message": "No books by this author"}, 404


class ReviewsByBookID(Resource):
    def get(self, book_id):
        reviews = Review.query.filter(Review.book_id == book_id).all()

        if reviews:
            return many_reviews_schema.dump(reviews), 200
        else:
            return {"message": "No reviews for book"}, 404


class ReviewsByUserID(Resource):
    def get(self, user_id):
        reviews = Review.query.filter(Review.user_id == user_id).all()

        if reviews:
            return many_reviews_schema.dump(reviews), 200
        else:
            return {"message": "No reviews by user"}, 404


api.add_resource(cookieTest, "/cookie")

api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/checksession", endpoint="checksession")
api.add_resource(Reviews, "/reviews", endpoint="reviews")
api.add_resource(ReviewByID, "/reviews/<int:id>", endpoint="reviews/<int:id>")
api.add_resource(Users, "/users", endpoint="users")
api.add_resource(UserByID, "/users/<int:id>", endpoint="users/<int:id>")
api.add_resource(Authors, "/authors", endpoint="authors")
api.add_resource(AuthorByID, "/authors/<int:id>", endpoint="authors/<int:id>")
api.add_resource(Books, "/books", endpoint="books")
api.add_resource(BookByID, "/books/<int:id>", endpoint="books/<int:id>")
api.add_resource(
    ReviewsByBookID,
    "/books/<int:book_id>/reviews",
    endpoint="books/<int:book_id>/reviews",
)
api.add_resource(
    BooksByAuthorID,
    "/authors/<int:author_id>/books",
    endpoint="author/<int:author_id>/books",
)
api.add_resource(
    ReviewsByUserID,
    "/users/<int:user_id>/reviews",
    endpoint="users/<int:user_id>/reviews",
)


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
