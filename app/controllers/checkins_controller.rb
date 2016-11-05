class CheckinsController < ApplicationController

  def index
    @checkins = Checkin.all
  end

  def new
    @checkin = Checkin.new
  end

  def create
    @checkin = Article.new(article_params)

    if @checkin.save
      flash[:notice] = 'Your check-in was successfully saved!'
      respond_to do |format|
        format.js
      end
    else
      respond_to do |format|
        format.js { render :show }
      end
    end
  end


  private

  def checkin_params
    params.require(:checkin).permit(:name, :comment, :location_id)
  end
end
