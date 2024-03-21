from flask import request, redirect, url_for
from flask_login import login_user, logout_user
from flask_smorest import abort
from pytz import timezone
from sqlalchemy import asc
from datetime import datetime

from app.db import db
from app.models.user_model import UserModel
from app.extention import loginManager, bcrypt, authorize
import logging

logger = logging.getLogger(__name__)

@loginManager.user_loader
def load_user(user_id: int) -> UserModel:
    '''
    Define how the user loginManager load the user info 
    '''
    return UserModel.query.get(int(user_id))

def get_all_user():
    results = UserModel.query.order_by(asc(UserModel.id)).all()
    return results

def login():
    '''
    Check for user password by account name and perform login for user
    '''
    
    #extract data from request
    user_name = request.form.get('username')
    password = request.form.get('password').encode('utf-8') 
    if not user_name and not password:   
        abort(400, "bad request")
    elif not password:
        abort(400, "missing password")
    elif not user_name:
        abort(400, 'missing user name')
   
    try:    
        #get user by account name
        user = UserModel.query.filter_by(username=user_name).first()
        # user = UserModel.query.filter_by(username='aaa').first()

        #check if user exist
        if user:
            #check password with bcrypt
            hash_password = bcrypt.check_password_hash(user.hash_password, password)
            if hash_password:
                if login_user(user):
                # return redirect(url_for(loginManager.login_view))
                    return "login successfuly"
    except:
        #get user by account name
        user = UserModel.query.filter_by(username=user_name).first()
        # user = UserModel.query.filter_by(username='aaa').first()

        #check if user exist
        if user:
            #check password with bcrypt
            hash_password = bcrypt.check_password_hash(user.hash_password, password)
            if hash_password:
                if login_user(user):
                # return redirect(url_for(loginManager.login_view))
                    return "login successfuly"
        logger.error("Error in login service!")
        abort(500, message='validation of user account failed')

def logout():
    '''
    Perform user logout
    '''
    try:
        logout_user()
        # return redirect(url_for(loginManager.login_view))
        return "you are log out"
    except:
        abort(400, "some thing went wrong")

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
        hash_password = bcrypt.generate_password_hash(password).decode("utf-8") #decode from byte to string

        #check for username
        existing_user = UserModel.query.filter_by(username=request.form.get('username')).first()
        if existing_user:
            abort(400, message="User name is taken")

        #check for email
        existing_user = UserModel.query.filter_by(email=request.form.get('email')).first()
        if existing_user:
            abort(400, message="This email is taken")
        

        #create user object
        new_user = UserModel()
        new_user.username = request.form.get('username')
        new_user.hash_password = hash_password
        new_user.email = request.form.get('email')
        new_user.create_at = datetime.now(timezone("Asia/Ho_Chi_Minh")).strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        
        #save user object to database
        db.session.add(new_user)
        db.session.commit()
        # return redirect(url_for(loginManager.login_view))
        return"register successfuly"
    except:
        abort(500, 'Failed to register new user')



