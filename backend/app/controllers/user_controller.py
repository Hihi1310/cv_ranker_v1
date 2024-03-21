from app.schemas.user_schema import *
from app.services import user_service
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_login import login_required
import config

blp = Blueprint("User", __name__, description="User API")

@blp.route('/user')
class user_info(MethodView):
    @blp.response(200, PlainUserSchema(many=True))
    def get(self):
        results = user_service.get_all_user()
        return results


@blp.route('/login')
class user_login(MethodView):
    @blp.response(200)
    def post(self):
        response = user_service.login()
        return response


@login_required
@blp.route('/logout')
class user_logout(MethodView):
    @blp.response(200)
    def post(self):
        response = user_service.logout_user()
        return response
    

@blp.route('/register')
class register_user(MethodView):
    @blp.response(200)
    def post(self):
        response = user_service.register()
        return response
