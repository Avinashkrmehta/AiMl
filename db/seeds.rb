# Create a test user
User.find_or_create_by(email: 'admin@example.com') do |user|
  user.first_name = 'Admin'
  user.last_name = 'User'
  user.password = 'password123'
  user.password_confirmation = 'password123'
end

puts "Created test user: admin@example.com / password123"