class AddImagetoCheckins < ActiveRecord::Migration
  def self.up
    add_attachment :checkins, :image
  end

  def self.down
    remove_attachment :checkins, :image
  end
end
