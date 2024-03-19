from app.db import db


class CandidateUser(db.Model):
    __tablename__ = "candidate_user"
    __table_args__ = (db.UniqueConstraint("user_id", "candidate_id"),)

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey("candidate.id")) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 

    def __repr__(self):
        return f'<candidate_id:"{self.candidate_id}"\nuser_id:"{self.user_id}">'