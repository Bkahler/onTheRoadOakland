class Checkin < ActiveRecord::Base
  belongs_to :location
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }
  validates :location_id, presence: true
  
  has_attached_file :image, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
end
