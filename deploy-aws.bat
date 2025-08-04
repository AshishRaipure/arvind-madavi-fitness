@echo off
echo ========================================
echo AWS Deployment for Arvind Madavi
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please create .env file with your AWS credentials
    echo See AWS-DEPLOYMENT-GUIDE.md for instructions
    pause
    exit /b 1
)

echo Installing dependencies...
npm install

echo.
echo Starting AWS deployment...
echo.

node aws-deploy.js

echo.
echo Deployment completed!
echo Check the output above for your website URL
pause 