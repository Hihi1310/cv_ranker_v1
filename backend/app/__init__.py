import os

import manage
import config
from app.blueprint import register_routing
from app.db import db
from app.extention import cors, migrate
from app.utils.logging import configure_logging
from flask import Flask


def create_app(settings_module=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(settings_module)

    # Initialize the extensions
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, supports_credentials="true", resources={r"*": {"origins": "*"}})
    
    manage.init_app(app)

    # Logging configuration
    # configure_logging(app)

    # Register Blueprint
    register_routing(app)

    return app

settings_module = config.TestingConfig
print(settings_module)
app = create_app(settings_module)

