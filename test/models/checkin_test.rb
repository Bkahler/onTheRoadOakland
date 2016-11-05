require 'test_helper'

class CheckinTest < ActiveSupport::TestCase
  def setup
    @checkin = Checkin.create(name: 'test name',comment: 'test comment', location_id: 1)
  end
  test 'category should be valid' do
    assert @checkin.valid?
  end

  test 'name should be present' do
    @checkin.name = " "
    assert_not @checkin.valid?
  end

end