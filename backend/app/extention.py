from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_authorize import Authorize

authorize = Authorize()
bcrypt = Bcrypt()
loginManager = LoginManager()
migrate = Migrate()
cors = CORS()
