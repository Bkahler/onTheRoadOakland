class Location < ActiveRecord::Base
  has_many :checkins, dependent: :destroy
  validates :name, presence: true

  def index
  end

  def show
  end

end
