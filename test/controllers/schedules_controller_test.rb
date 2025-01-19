require "test_helper"

class SchedulesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get schedules_path
    assert_response :success
  end
end
