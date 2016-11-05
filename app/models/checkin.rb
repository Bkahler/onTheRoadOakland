class Checkin < ActiveRecord::Base
  belongs_to :location
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }

end
