from app.db import db

class JobUser(db.Model):
    __tablename__ = "job_user"
    __table_args__ = (db.UniqueConstraint("user_id", "job_id"),)

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey("job.id")) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 

    def __repr__(self):
        return f'<job_id:"{self.job_id}"\nuser_id:"{self.user_id}">'