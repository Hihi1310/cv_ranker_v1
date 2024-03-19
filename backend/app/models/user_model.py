from flask_login import UserMixin
from app.db import db


class UserModel(db.Model, UserMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    hash_password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    # role = db.Column(db.String(30), nullable=False)
    create_at = db.Column(db.TIMESTAMP)

    # create table relation ship
    candidates = db.relationship(
        "CandidateModel", back_populates="users", secondary="candidate_user"
    )

    jobs = db.relationship(
        "JobModel", back_populates="users", secondary="job_user"
    )