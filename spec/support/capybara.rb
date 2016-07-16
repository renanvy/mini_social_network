require 'capybara/rails'
require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, { js_errors: true })
end

Capybara.javascript_driver = :poltergeist
Capybara.default_max_wait_time = 5