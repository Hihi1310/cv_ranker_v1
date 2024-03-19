from app.schemas.user_schema import *
from app.services import user_service
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_login import login_required
import config

blp = Blueprint("User", __name__, description="User API")


@blp.route('/login')
class user_login(MethodView):
    def post(self):
        response = user_service.login()
        return response


@blp.route('/logout')
@login_required
class user_logout(MethodView):
    def get(self):
        response = user_service.logout_user()
        return response
    

@blp.route('/register')
class register_user(MethodView):
    def post(self):
        response = user_service.register()
        return response
