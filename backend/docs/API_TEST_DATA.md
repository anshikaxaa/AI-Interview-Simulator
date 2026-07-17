Test User 1
Login
POST http://localhost:5000/api/auth/login

Body

{
  "email": "user1@gmail.com",
  "password": "password123"
}

Response

User ID:
cmravmvn60000u1i0hp13rkwx

Name:
User1

Email:
user1@gmail.com

JWT

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbXJhdm12bjYwMDAwdTFpMGhwMTNya3d4IiwiaWF0IjoxNzgzNDQyNzU4LCJleHAiOjE3ODQwNDc1NTh9.cuEsD_BfFRhUV1k7pONAWkpymTzK0OYhwwUB-qFAVgk
Resumes
AI Resume ⭐ (Primary Resume)
Resume ID:
cmrbygv1r0001u10gifr6047j
Backend Resume
Resume ID:
cmrb01r8d0005u1iwn4wi2yln
Backend Resume (Old)
Resume ID:
cmrazzq4l0003u1iw1wrvlnhl
Job Descriptions
Google Frontend Developer ⭐
Job Description ID:
cmrm9wh9n0001u13oc8rezvkp

Company

Google
Frontend Dev (Google)
Job Description ID:
cmrmakx6a0001u1tgiihrltoi
Frontend Dev (No Company)
Job Description ID:
cmrma32840003u13osupnjuvo
Test User 2
Login
POST http://localhost:5000/api/auth/login

Body

{
  "email": "user2@gmail.com",
  "password": "password123"
}

Response

User ID:
cmravnqtu0001u1i06v99wdes

Name:
User2

Email:
user2@gmail.com

JWT

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbXJhdm5xdHUwMDAxdTFpMDZ2OTl3ZGVzIiwiaWF0IjoxNzgzNDQyNjk5LCJleHAiOjE3ODQwNDc0OTl9.1hK9yZjIVlYSAMHcRNTCDxKWqeJtEnKeNXvG2jTbr3s
Resumes
Frontend Resume
Resume ID:
cmrb0ncxh0007u1iwswlbspbp
Frequently Used Test Data
Valid Blueprint Request

Use:

User1 JWT
AI Resume
Google Frontend JD

Request

POST /api/interview-blueprints

Body

{
  "resumeId": "cmrbygv1r0001u10gifr6047j",
  "jobDescriptionId": "cmrm9wh9n0001u13oc8rezvkp"
}

Expected

201 Created