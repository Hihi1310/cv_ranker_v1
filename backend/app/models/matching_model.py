from app.db import db


class MatchingModel(db.Model):
    __tablename__ = "matching"
    __table_args__ = (db.UniqueConstraint("candidate_id", "job_id"),)

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey("candidate.id"))
    job_id = db.Column(db.Integer, db.ForeignKey("job.id"))
    score = db.Column(db.String())
    comment = db.Column(db.String())

    def __repr__(self) -> str:
        return f'<candidate_id:"{self.candidate_id}"\njob_id:"{self.job_id}"\nscore:"{self.score}"\ncomment:"{self.comment}">'