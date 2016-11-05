class Location < ActiveRecord::Base
  has_many :checkins, dependent: :destroy
  validates :name, presence: true

end
