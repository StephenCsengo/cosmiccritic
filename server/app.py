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
class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review

    rating = ma.auto_field()
    review = ma.auto_field()
    user_id = ma.auto_field()
    book_id = ma.auto_field()


review_schema = ReviewSchema()
many_reviews_schema = ReviewSchema(many=True)


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field()
    username = ma.auto_field()


user_schema = UserSchema()
many_users_schema = UserSchema(many=True)


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


api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Reviews, "/reviews", endpoint="reviews")
api.add_resource(ReviewByID, "/reviews/<int:id>")
api.add_resource(Users, "/users", endpoint="users")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
