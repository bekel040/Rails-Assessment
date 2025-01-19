class AddCityToWorkOrders < ActiveRecord::Migration[8.0]
  def change
    add_column :work_orders, :city, :string
  end
end
