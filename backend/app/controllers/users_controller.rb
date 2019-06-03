class UsersController < ApplicationController
  before_action :find_user, only: [:show]

  def index
    @users = User.all
    render json: @users
  end

  def new
    @user = User.new
  end

  def create
    if User.find_by(email: user_params[:email])
      @user = User.find_by(email: user_params[:email])
      render json: @user
    else
      @user = User.create(user_params)
      if @user.save
        render json: @user, status: :accepted
      else
        render json: { errors: 'Failed to create User' }, status: :unprocessible_entity
      end
    end
  end

  private

  def user_params
    params.require(:user).permit!
  end

  def find_user
    @user = User.find(params[:id])
  end

end
