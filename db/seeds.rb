require 'faker'

if Rails.env == 'development'

  # Prompt to  clena database if needed
  STDOUT.puts "Do you wish to clean your current database? \n Please respond with 'yes' or 'no' (or 'y' or 'n'). \n"
  answer = STDIN.gets.chomp

  if answer.match(/^y(|es)$/)
    User.destroy_all # It will also destroy all other dependent models.
    puts "Database cleaned"
  end

  # Create default user
  unless User.find_by(email: "user@example.com")
    User.create!(
      first_name: "John",
      last_name: "Doe",
      email: "user@example.com",
      password: "12345678"
    ) 
  end

  # Create a lot of users
  5.times do
    full_name = Faker::StarWars.character.split(" ")
    user = User.create!(
      first_name: full_name[0],
      last_name: full_name[1] || Faker::StarWars.droid,
      email: Faker::Internet.email,
      password: Faker::Internet.password
    ) 
    # With a lot of posts
    10.times do
      post = user.posts.create!(
        text: Faker::StarWars.quote,
        created_at: Faker::Date.between(2.days.ago, Date.today)
      )
    end
  
  # Create random comments
  10.times do
    if rand(1..10).odd? # Random action
      Comment.create!(
        post: Post.order("RANDOM()").first,
        user: User.order("RANDOM()").first,
        text: Faker::StarWars.quote
      )
    end
  end

  end

  puts "Database seeded, have fun"
  puts "Default test user email: user@example.com | password: 12345678"
end