from app.schemas.job_schema import *
from app.services import job_service
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_login import login_required

blp = Blueprint("Job", __name__, description="Job API")

@blp.route("/job-page")
@login_required
class JobPageList(MethodView):
    @blp.arguments(JobFilterPageSchema)
    @blp.response(200, JobPageSchema)
    def post(self, job_data):
        result = job_service.get_job_page(job_data)
        return result


@blp.route("/job")
@login_required
class JobList(MethodView):
    @blp.response(200, PlainJobSchema(many=True))
    def get(self):
        result = job_service.get_all_job()
        return result

    @blp.arguments(CreateUpdateJobSchema)
    def post(self, job_data):
        result = job_service.post_job(job_data)
        return result


@blp.route("/job/<int:job_id>")
@login_required
class JobQnA(MethodView):
    @blp.response(200, PlainJobSchema)
    def get(self, job_id):
        result = job_service.get_job(job_id)
        return result

    @blp.arguments(CreateUpdateJobSchema)
    def put(self, job_data, job_id):
        result = job_service.update_job(job_data, job_id)
        return result

    def delete(self, job_id):
        result = job_service.delete_job(job_id)
        return result


@blp.route("/job-detail/<int:job_id>")
@login_required
class Candidate(MethodView):
    @blp.response(200, JobDetailSchema)
    def get(self, job_id):
        result = job_service.get_job_detail(job_id)
        return result
