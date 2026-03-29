# ⚙️ Installation Guide for Team Members

Follow these steps to set up the project locally on your machine.

1. Clone the Repository
bash
git clone [https://github.com/YOUR_USERNAME/InternShield_AI.git](https://github.com/YOUR_USERNAME/InternShield_AI.git)
cd InternShield-AI

2. Backend Setup (Python Flask)
The backend handles the ML logic and database connections.
cd server

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

3. Frontend Setup (React)
The frontend handles the user interface.

cd ../client

# Install Node modules
npm install

4. Database Setup (MongoDB)
Install MongoDB Community Server.

Open MongoDB Compass and connect to "mongodb://localhost:27017".

The database internshield_db will be created automatically when you run the first scan.


# 🏃‍♂️ How to Run the Project
(cd.. to back)
Need to run the Backend and Frontend in two separate terminals.

Terminal 1: Start Backend
cd server
python app.py
 Server will start at http://localhost:5000

Terminal 2: Start Frontend
cd client
npm run dev
 Client will start at http://localhost:5173
