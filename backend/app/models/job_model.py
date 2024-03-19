from app.db import db


class JobModel(db.Model):
    __tablename__ = "job"

    id = db.Column(db.Integer, primary_key=True)
    job_name = db.Column(db.String(), unique=True, nullable=False)
    job_description = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.TIMESTAMP)

    candidates = db.relationship(
        "CandidateModel", back_populates="jobs", secondary="matching"
    )

    users = db.relationship(
        "UserModel", back_populates="jobs", secondary="job_user"
    )

    def __repr__(self):
        return f'<job_name:"{self.job_name}"\njob_description:"{self.job_description}"\ncreated_at:"{self.created_at}">'
