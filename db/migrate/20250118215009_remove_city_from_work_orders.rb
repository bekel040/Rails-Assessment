class RemoveCityFromWorkOrders < ActiveRecord::Migration[8.0]
  def change
    remove_column :work_orders, :city, :string
  end
end
