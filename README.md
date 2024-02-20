## steps in order to install Nodsjs and MongoDB in windows 11

1. Installing Node.js:
Download Node.js Installer:

Go to the official Node.js download page: Node.js Downloads
Choose the Windows Installer (.msi) either for 32-bit or 64-bit based on your system.

https://nodejs.org/en/download/current

Run the Installer:

Open the downloaded .msi file.
Follow the installation wizard:
Click on the Next button.
Accept the license agreement and click Next.
Leave the default destination folder or choose a different one, then click Next.
Let the installer install the necessary components, including npm (Node.js Package Manager).
Click on the Next button and then Install.
Verify the Installation:

Open Command Prompt or PowerShell and type the following commands to ensure Node.js and npm are installed correctly:

## node -v
## npm -v



2. Installing MongoDB:
Download MongoDB:
Go to the official MongoDB download page: MongoDB Download Center

https://www.mongodb.com/try/download/community


Choose the version you want.
Select the Windows platform and the package you want (usually msi).
Click Download.
Run the Installer:

Open the downloaded .msi file.
Follow the installation wizard:
Click on the Next button.
Accept the license agreement and click Next.
Choose the Complete installation or Custom if you want to customize the install.
Let the installer proceed and install MongoDB.
Set up MongoDB as a Windows Service:

During installation, there should be an option to install MongoDB as a service. This ensures that MongoDB starts automatically every time you start your computer.
Choose Path to Store Data:

By default, MongoDB wants to store data in C:\data\db. If you haven't changed this path during installation, you need to create this directory:

## mkdir C:\data\db


## Start MongoDB:

If you installed MongoDB as a service, it should start automatically after installation and every subsequent restart of your computer.
If not, you can navigate to the MongoDB directory in Command Prompt or PowerShell and start it manually using mongod.
Connect to MongoDB:

In Command Prompt or PowerShell, type mongo to connect to your MongoDB server. This will start the MongoDB shell.
(Optional) Install MongoDB Compass:

MongoDB Compass is the official graphical user interface for MongoDB. During the MongoDB installation, there may be an option to install Compass as well. If you haven't done so, you can download and install it separately from the MongoDB website.
After completing these steps, you should have both Node.js and MongoDB installed and running on your Windows 11 system. Remember to regularly check for updates to both platforms to ensure you have the latest features and security patches.




## Backend (NodeJS + MongoDB): Create a directory named telecom_lab_booking and navigate into it:
mkdir telecom_lab_booking
cd telecom_lab_booking

Inside this directory, create another directory named backend:

mkdir backend
cd backend

Initialize a new NodeJS project:
## npm init -y
Your backend directory might look something like this:

node_modules/: All your installed npm packages will reside here.
controllers/: Houses the logic for handling client requests.
models/: Describes the data model and schema for MongoDB.
routes/: Defines the API endpoints and associates them with the correct controller functions.
utils/: Utility files, like the script for importing Excel data into MongoDB.
app.js: Main file to run your NodeJS server.


## Frontend (React)
Navigate back to the telecom_lab_booking directory and create a React app:

## npx create-react-app frontend

node_modules/: Installed npm packages for the frontend.
public/: Static files.
src/components/: React components for various UI parts.
src/pages/: Components representing entire pages in the React app.
App.js: Main file to bootstrap your React components.
Additional Files and Folders
README.md: Documentation on how to run and use your system.
.gitignore: List of files and folders to ignore if you're using Git.
.env: Environment variables like your MongoDB connection string.




### How to Add Packages

After running npm init -y, you would typically start adding packages (libraries) that your project needs. For example, to add Express, you would run:

## npm install express

## npm init -y 

npm init -y  is just the first step to set up your Node.js project. Installing specific packages comes next, and that's when the node_modules/ directory gets populated.
Navigate to Project Directory: Open a terminal and navigate to the directory where your package.json file is located. This is usually the root directory of your Node.js project.
Run 

## npm install: 

Run the npm install command followed by the package name you want to install. For example, if you want to install the package express, you'd type:

npm install express

This command will download the Express package and its dependencies and place them in a folder called node_modules/ within your project directory.



## Solution 1: Downgrade Node.js

The quickest solution would be to downgrade your Node.js version. Node.js v14 (LTS) or v16 (LTS) are recommended since they're more stable and compatible with a broader range of packages. You can use 

## Node Version Manager (NVM) 

to easily switch between Node.js versions.
Here's how you can do it:

    Install NVM:
        On Windows: Use nvm-windows.
        On macOS/Linux: Use nvm.

    Install Node.js v16 (LTS) using NVM:

# nvm install 16

Switch to Node.js v16:
nvm use 16
After switching to Node.js v16, try running your project again:

## npm start


## activate VScode GIT extensions:
Open Settings: You can open settings by using the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS) and typing 
"Preferences: Open Settings (UI)" to use the graphical interface, or 
"Preferences: Open Settings (JSON)" to edit the settings JSON file directly.
Add the following line to your settings.json file: 

"git.enabled": false


## Dockerfiles:
1) Use Node.js v16 as the base image:

FROM node:16

Base Image Compatibility with Ubuntu 22.10:
The node:16 image used in the Dockerfile is a standalone image that contains the Node.js runtime and is based on Debian. 
This image is designed to run in any Docker environment, regardless of the host OS. So, whether you're running Docker on Ubuntu 22.10 or another OS, the node:16 image will function as expected. Docker ensures this compatibility through containerization, where the container's environment is isolated from the host OS.

2) Purpose of Copying package*.json and Running npm install:

The COPY package*.json ./ command is used to copy the package.json and package-lock.json files from your local project directory into the Docker container. These files define your project's dependencies.

The command npm install doesn't create these files; it reads them to understand which packages need to be installed. 
The package.json file lists the dependencies of your project, and npm install uses this information to install those specific versions of packages into the node_modules directory inside the Docker container.

The reason for copying these files before running npm install is to allow Docker to cache the installed node modules. 
If you change your source code but not your dependencies, Docker can use the cached layers with the already installed node modules, speeding up the build process. If you were to copy all your application's files before running npm install, then any change in your application's source code would invalidate the Docker cache for the npm install step, causing the dependencies to be reinstalled from scratch every time you rebuild the image.

## MongoDB Docker Container Setup:

1) Pulling the MongoDB Image:
- MongoDB Docker Container Setup
Pulling the MongoDB Image:
To get the latest MongoDB image, run the following command:

docker pull mongo:latest


2) Running MongoDB Container:
Start a MongoDB container with the following command. This will also expose the default MongoDB port (27017) so that it can be accessed by your backend service.

docker run --name mongodb -p 27017:27017 -d mongo:latest


Here, --name mongodb gives a name to the container for easier reference, -p 27017:27017 maps the port 27017 from the container to the host, and -d runs the container in detached mode.

3) Importing Your Database:
To import your existing MongoDB database into the container, you'll first need to get the data dump from your current database. If you already have a dump file (for example, mydbdump), you can import it into the Docker container using the following steps:

Copy the dump file into the MongoDB container:

docker cp mydbdump mongodb:/tmp/mydbdump

Execute the import command inside the container. Adjust the command according to your dump file format. For a typical BSON dump, you might use the mongorestore tool:

docker exec -it mongodb mongorestore /tmp/mydbdump

For a JSON or CSV file, you would use mongoimport.

4) Persisting MongoDB Data:
To ensure that your MongoDB data persists across container restarts, you should use a Docker volume. This can be done by modifying the run command:

docker run --name mongodb -v mongo_data:/data/db -p 27017:27017 -d mongo:latest

Here, -v mongo_data:/data/db creates a named volume mongo_data that stores MongoDB data.






