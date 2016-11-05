class CreateCheckins < ActiveRecord::Migration
  def change
    create_table :checkins do |t|
      t.string   "name"
      t.text     "comment"
      t.integer  "location_id"
      t.datetime "created_at",         :null => false
      t.datetime "updated_at",         :null => false
      t.timestamps null: false
    end
  end
end
