class Checkin < ActiveRecord::Base
  belongs_to :location
  attachment :image
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }
  validates :location_id, presence: true
end
