
<!-- prettier-ignore-start -->

Author - Valentyna Aleksandrova

User Authentication & Authorization API
This server provides authentication and authorization functionalities, allowing users to register, log in, and manage their profiles securely. It also includes endpoints for tracking daily and monthly water consumption. It includes social authentication, password recovery, and image storage using Cloudinary.


Public Endpoints

User Registration (POST /users/register)
Allows users to create an account by providing necessary details (email, password).
Returns a success response with the user's information or an error message if registration fails.

User Login (POST /users/login)
Authenticates users by validating their credentials.
Returns an access token and a refresh token upon successful login.

Get Total Registered Users (GET /users/count)
Returns the total number of registered users in the application.

Google Authentication (POST /users/google-login)
Allows users to log in or register via Google OAuth.
Returns user details along with authentication tokens.

Password Reset Request (POST /users/send-reset-email)
Sends a password reset link to the user's email.

Password Reset (POST /auth/reset-pwd)
Allows users to set a new password using a token sent via email.

Authorization Layer
A middleware that verifies and validates access tokens.
Ensures only authenticated users can access private endpoints.
Handles token expiration and unauthorized access attempts.
Private Endpoints (User Management)

Get Current User Info (GET /users/current)
Returns details of the currently authenticated user.

Update User Profile (PATCH /users/current)
Allows users to update their profile details, including:
Name
Email
Gender
Weight
Active sports time
Daily water intake goal
Profile avatar

Token Refresh (POST /users/refresh)
Issues a new access token and refresh token.
Requires a valid refresh token.

User Logout (POST /users/logout)
Revokes the user's authentication tokens and logs them out.


Private Endpoints (Water Consumption)

Add Water Intake Record (POST /water)
Allows users to record their water intake for tracking purposes.

Edit Water Intake Record (PATCH /water/{id})
Allows users to update a specific water consumption record.

Delete Water Intake Record (DELETE /water/{id})
Allows users to remove a specific water consumption record.

Get Daily Water Intake (GET /water/day)
Retrieves water consumption data for the current day.

Get Monthly Water Intake (GET /water/month)
Retrieves water consumption data for the current month.

Security Measures
Passwords are securely hashed.
Authentication is managed using JWT tokens.


<!-- prettier-ignore-end -->