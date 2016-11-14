class CheckinsController < ApplicationController

  def index
    @checkins = Checkin.all
  end

  def new
    @checkin = Checkin.new
  end

  def create
    @checkin = Checkin.new(checkin_params)
    binding.pry
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

  def show
    @location = Location.find_by_id(params[:id])
    @checkins = @location.checkins
    @checkin = Checkin.new

    respond_to do |format|
      format.js
    end
  end

  def all_checkins
    @all_checkins = Checkin.all
    @locations = Location.all

    respond_to do |format|
      format.json { render json: @all_checkins}
      format.html
    end
  end

  private

  def checkin_params
    params.require(:checkin).permit(:name, :comment, :location_id, :image)
  end
end
