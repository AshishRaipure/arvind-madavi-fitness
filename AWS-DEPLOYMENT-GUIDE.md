# 🚀 AWS Deployment Guide for Arvind Madavi Fitness Website

This guide will help you deploy the fitness website to AWS S3 and CloudFront. **No technical background required!** Follow each step carefully.

## 📋 Prerequisites

Before starting, you need:
- A computer with internet access
- An AWS account (free tier available)
- The website files ready

## 🎯 What We'll Deploy

- **S3 Bucket**: Stores your website files
- **CloudFront**: Makes your website fast worldwide
- **Custom Domain** (optional): Your own domain name

---

## 📝 Step 1: Create AWS Account

### 1.1 Sign Up for AWS
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click **"Create an AWS Account"**
3. Fill in your details:
   - Email address
   - Password
   - Account name (e.g., "Arvind Fitness Website")
4. Click **"Continue"**

### 1.2 Complete Registration
1. **Contact Information**:
   - Full name
   - Phone number
   - Address
   - Click **"Create Account and Continue"**

2. **Payment Information**:
   - Credit card details (AWS Free Tier available)
   - Click **"Secure Submit"**

3. **Identity Verification**:
   - Enter the code sent to your phone
   - Click **"Verify Code"**

4. **Support Plan**:
   - Select **"Free"** plan
   - Click **"Complete sign up"**

### 1.3 Access AWS Console
1. Go to [console.aws.amazon.com](https://console.aws.amazon.com)
2. Sign in with your email and password
3. You're now in the AWS Management Console!

---

## 🔑 Step 2: Create AWS Access Keys

### 2.1 Navigate to IAM
1. In AWS Console, search for **"IAM"**
2. Click on **"IAM"** service
3. Click **"Users"** in the left sidebar
4. Click **"Create user"**

### 2.2 Create User
1. **User name**: `arvind-fitness-deploy`
2. Check **"Access key - Programmatic access"**
3. Click **"Next: Permissions"**

### 2.3 Set Permissions
1. Click **"Attach existing policies directly"**
2. Search for and select:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
3. Click **"Next: Tags"**
4. Click **"Next: Review"**
5. Click **"Create user"**

### 2.4 Save Access Keys
1. **IMPORTANT**: Copy and save these details:
   - **Access Key ID**: (looks like `AKIA...`)
   - **Secret Access Key**: (looks like `wJalr...`)
2. Click **"Download .csv"** to save them
3. **Keep these secure** - you'll need them later!

---

## 🪣 Step 3: Create S3 Bucket

### 3.1 Navigate to S3
1. In AWS Console, search for **"S3"**
2. Click on **"S3"** service
3. Click **"Create bucket"**

### 3.2 Configure Bucket
1. **Bucket name**: `arvind-madavi-fitness-website` (must be unique globally)
2. **Region**: Choose closest to your location (e.g., `US East (N. Virginia)`)
3. Click **"Next"**

### 3.3 Configure Options
1. Leave all options unchecked
2. Click **"Next"**

### 3.4 Set Permissions
1. **Uncheck** "Block all public access"
2. Check **"I acknowledge that the current settings might result in this bucket and the objects within becoming public"
3. Click **"Next"**

### 3.5 Review and Create
1. Review settings
2. Click **"Create bucket"**

### 3.6 Configure Bucket for Website
1. Click on your bucket name
2. Go to **"Properties"** tab
3. Scroll down to **"Static website hosting"**
4. Click **"Edit"**
5. Select **"Enable"**
6. **Index document**: `index.html`
7. **Error document**: `index.html`
8. Click **"Save changes"**

---

## ☁️ Step 4: Create CloudFront Distribution

### 4.1 Navigate to CloudFront
1. In AWS Console, search for **"CloudFront"**
2. Click on **"CloudFront"** service
3. Click **"Create Distribution"**

### 4.2 Configure Origin
1. **Origin Domain**: Select your S3 bucket
2. **Origin Path**: Leave empty
3. **Origin ID**: Auto-filled

### 4.3 Configure Default Cache Behavior
1. **Viewer Protocol Policy**: `Redirect HTTP to HTTPS`
2. **Allowed HTTP Methods**: `GET, HEAD`
3. **Cache Policy**: `CachingOptimized`
4. **Origin Request Policy**: `CORS-S3Origin`
5. **Response Headers Policy**: `CORS-CustomOrigin`

### 4.4 Configure Distribution Settings
1. **Price Class**: `Use Only U.S., Canada and Europe` (cheaper)
2. **Alternate Domain Names (CNAMEs)**: Leave empty for now
3. **SSL Certificate**: `Default CloudFront Certificate`
4. **Default Root Object**: `index.html`

### 4.5 Create Distribution
1. Click **"Create Distribution"**
2. Wait 5-10 minutes for deployment
3. Note your **Distribution Domain Name** (looks like `d1234abcd.cloudfront.net`)

---

## 💻 Step 5: Install Node.js and Dependencies

### 5.1 Install Node.js
1. Go to [nodejs.org](https://nodejs.org)
2. Download **"LTS"** version
3. Run the installer
4. Follow installation steps
5. Restart your computer

### 5.2 Verify Installation
1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Type: `node --version`
3. Type: `npm --version`
4. Both should show version numbers

### 5.3 Install Project Dependencies
1. Navigate to your project folder
2. Run: `npm install`
3. Wait for installation to complete

---

## 🔧 Step 6: Configure Environment Variables

### 6.1 Create Environment File
1. In your project folder, create a file named `.env`
2. Add your AWS credentials:

```env
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
S3_BUCKET=arvind-madavi-fitness-website
CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id_here
```

### 6.2 Get Distribution ID
1. Go to CloudFront in AWS Console
2. Click on your distribution
3. Copy the **Distribution ID** (looks like `E1234ABCDEFGHI`)
4. Paste it in the `.env` file

---

## 🚀 Step 7: Deploy Website

### 7.1 Update Configuration
1. Open `aws-deploy.js`
2. Update the bucket name and region if needed
3. Save the file

### 7.2 Run Deployment
1. Open terminal/command prompt
2. Navigate to your project folder
3. Run: `node aws-deploy.js`
4. Wait for deployment to complete

### 7.3 Verify Deployment
1. Check the output for success messages
2. Visit your CloudFront URL
3. Test all website features

---

## 🌐 Step 8: Custom Domain (Optional)

### 8.1 Register Domain
1. Go to [Route 53](https://console.aws.amazon.com/route53) in AWS Console
2. Click **"Register Domain"**
3. Enter your desired domain name
4. Follow registration process

### 8.2 Configure SSL Certificate
1. Go to [Certificate Manager](https://console.aws.amazon.com/acm)
2. Request certificate for your domain
3. Validate via DNS or email

### 8.3 Update CloudFront
1. Go to your CloudFront distribution
2. Add your domain to **Alternate Domain Names**
3. Select your SSL certificate
4. Update distribution

---

## 📊 Step 9: Monitoring and Analytics

### 9.1 Enable CloudWatch
1. Go to [CloudWatch](https://console.aws.amazon.com/cloudwatch)
2. Enable monitoring for your distribution
3. Set up alarms if needed

### 9.2 Add Google Analytics
1. Get Google Analytics tracking code
2. Add it to your `index.html` file
3. Redeploy website

---

## 🔄 Step 10: Update Website

### 10.1 Make Changes
1. Edit your website files
2. Test locally: `npm start`

### 10.2 Redeploy
1. Run: `node aws-deploy.js`
2. Wait for deployment
3. Check your live website

---

## 💰 Cost Estimation

### AWS Free Tier (First 12 Months)
- **S3**: 5GB storage, 20,000 GET requests/month
- **CloudFront**: 1TB data transfer/month
- **Route 53**: 50 hosted zones
- **Total**: ~$0/month

### After Free Tier
- **S3**: ~$0.023/GB/month
- **CloudFront**: ~$0.085/GB
- **Route 53**: ~$0.50/month per domain
- **Total**: ~$1-5/month for typical usage

---

## 🛠️ Troubleshooting

### Common Issues

**1. "Access Denied" Error**
- Check your AWS credentials
- Verify IAM permissions
- Ensure bucket is public

**2. Website Not Loading**
- Check S3 bucket configuration
- Verify CloudFront distribution status
- Check for typos in URLs

**3. Images Not Showing**
- Verify image files are uploaded
- Check file permissions
- Clear browser cache

**4. SSL Certificate Issues**
- Wait for certificate validation
- Check domain configuration
- Verify CloudFront settings

### Getting Help
- AWS Documentation: [docs.aws.amazon.com](https://docs.aws.amazon.com)
- AWS Support: Available in AWS Console
- Community Forums: [forums.aws.amazon.com](https://forums.aws.amazon.com)

---

## 📞 Support

If you need help:
1. Check the troubleshooting section above
2. Review AWS documentation
3. Contact AWS support
4. Ask in community forums

---

## 🎉 Congratulations!

Your website is now live on AWS with:
- ✅ Fast global delivery (CloudFront)
- ✅ Secure HTTPS
- ✅ Scalable hosting (S3)
- ✅ Professional domain (optional)
- ✅ Cost-effective solution

**Your fitness website is ready to help Arvind grow his business!** 🏋️‍♂️💪 