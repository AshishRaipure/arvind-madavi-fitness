@echo off
echo ========================================
echo Vercel Deployment for Arvind Madavi
echo ========================================
echo.

echo Starting Vercel deployment...
echo Project will be named: arvind-madavi-fitness
echo.

npx vercel --name arvind-madavi-fitness --yes

echo.
echo Deployment completed!
echo Check your Vercel dashboard for the live URL
pause 