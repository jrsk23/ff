class CreateRatings < ActiveRecord::Migration
  def change
    add_column :movies, :url, :string
  end
end
