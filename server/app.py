#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Book, Review, Author

app.secret_key = b"?w\x85Z\x08Q\xbdO\xb8\xa9\xb65Kj\xa9_"


# Views go here!
class Signup(Resource):
    def post(self):
        json = request.get_json()

        username = json.get("username")
        password = json.get("password")

        new_user = User(username=username)
        new_user.__password_hash = password
        import ipdb

        ipdb.set_trace()
        try:
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id

            return make_response(new_user.to_dict(), 201)

        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
