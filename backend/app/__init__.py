import os

import manage
from app.blueprint import register_routing
from app.db import db
from app.extention import cors, migrate, bcrypt, loginManager, authorize
from app.utils.logging import configure_logging
from flask import Flask



def create_app(settings_module):
    app = Flask(__name__)
    app.config.from_object(settings_module)

    # Initialize database the extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize login the extensions
    bcrypt.init_app(app)
    authorize.init_app(app)
    loginManager.init_app(app)
    loginManager.login_view='User.user_login'

    # Initialize cross origin resource sharing extensions
    cors.init_app(app, supports_credentials="true", resources={r"*": {"origins": "*"}})

    #set up app ENV
    manage.init_app(app)

    # Logging configuration
    configure_logging(app)

    # Register Blueprint
    register_routing(app)

    return app


settings_module = os.getenv("APP_SETTINGS_MODULE")
app = create_app(settings_module)