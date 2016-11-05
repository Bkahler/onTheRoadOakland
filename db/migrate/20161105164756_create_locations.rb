class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string   "name"
      t.float    "lat"
      t.float    "long"
      t.datetime "created_at",  :null => false
      t.datetime "updated_at",  :null => false
      t.string   "description"
      t.timestamps null: false
    end
  end
end
