from flask import request, redirect, url_for, Response
from flask_login import login_user, logout_user
from flask_smorest import abort
from pytz import timezone
from sqlalchemy import asc
from datetime import datetime

from app.db import db
from app.models.user_model import UserModel
from app.extention import loginManager, bcrypt, authorize

@loginManager.user_loader
def load_user(user_id: int) -> UserModel:
    '''
    Define how the user loginManager load the user info 
    '''

    return UserModel.query.get(int(user_id))

def login():
    '''
    Check for user password by account name and perform login for user
    '''
    try:
        #get user by account name
        user = UserModel.query.filter_by(username=request.form.get('username')).first()
        if user:
            #check password with bcrypt
            hash_password = bcrypt.check_password_hash(bytes(user.hash_password), request.form.get('password'))
            if hash_password:
                login_user(user)
                # return redirect(url_for(loginManager.login_view))
                return Response("login successfuly", 200)
            else:
                return Response("incorrect password", 405)
    except:
        abort(400, message='validation failed')


def logout():
    '''
    Perform user logout
    '''
    logout_user()
    # return redirect(url_for(loginManager.login_view))
    return Response("you are log out", 200)


def register():

    '''
    Pergorm information check for new user before saving to database
    the register form from request:
    {
        "username": string
        "email": string
        "password": string
    }
    '''
    try:
        #generate a hash password with bcrypt
        password = request.form.get('password')
        hash_password = bcrypt.generate_password_hash(password)

        #check for username
        existing_user = UserModel.query.filter_by(username=request.form.get('username')).first()
        if existing_user:
            abort(400, message="User name is taken")
        
        #check for email
        existing_user = UserModel.query.filter_by(username=request.form.get('email')).first()
        if existing_user:
            abort(400, message="This email is taken")

        #create user object
        new_user = UserModel()
        new_user.username = request.form.get('username')
        new_user.hash_password = str(hash_password)
        new_user.email = request.form.get('email')
        new_user.create_at = datetime.now(timezone("Asia/Ho_Chi_Minh")).strftime(
        "%Y-%m-%d %H:%M:%S"
    )
        
        #save user object to database
        db.session.add(new_user)
        db.session.commit()
        # return redirect(url_for(loginManager.login_view))
        return Response("register successfuly", 200)
    except:
        return Response('Failed to register new user', 500)



