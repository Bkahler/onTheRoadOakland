class AddImageIdToCheckins < ActiveRecord::Migration
  def change
    add_column :checkins, :image_id, :string
  end
end

