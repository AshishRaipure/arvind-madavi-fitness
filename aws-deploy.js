require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// AWS Configuration from environment variables
const awsConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// S3 Configuration
const s3Config = {
    Bucket: process.env.S3_BUCKET || 'arvind-madavi-fitness-website',
    ACL: 'public-read'
};

// CloudFront Configuration
const cloudFrontConfig = {
    DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID || '',
    InvalidationPath: '/*'
};

// Validate required environment variables
function validateEnvironment() {
    const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(key => console.error(`   - ${key}`));
        console.error('\nPlease create a .env file with your AWS credentials.');
        console.error('See env-template.txt for the required format.');
        process.exit(1);
    }
}

// Initialize AWS services
const s3 = new AWS.S3(awsConfig);
const cloudFront = new AWS.CloudFront(awsConfig);

// Files to upload
const filesToUpload = [
    'index.html',
    'styles.css',
    'script.js',
    'IMG_8094.JPG',
    '1000172021.jpg'
];

// Upload file to S3
async function uploadFileToS3(filePath, key) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const contentType = mime.lookup(filePath) || 'application/octet-stream';
        
        const params = {
            ...s3Config,
            Key: key,
            Body: fileContent,
            ContentType: contentType,
            CacheControl: key === 'index.html' ? 'no-cache' : 'max-age=31536000' // 1 year cache for static assets
        };

        console.log(`📤 Uploading ${filePath} to S3...`);
        await s3.upload(params).promise();
        console.log(`✅ Successfully uploaded ${filePath}`);
    } catch (error) {
        console.error(`❌ Error uploading ${filePath}:`, error.message);
        throw error;
    }
}

// Create CloudFront invalidation
async function createCloudFrontInvalidation() {
    if (!cloudFrontConfig.DistributionId) {
        console.log('⚠️  CloudFront Distribution ID not set. Skipping invalidation.');
        return;
    }

    try {
        const params = {
            DistributionId: cloudFrontConfig.DistributionId,
            InvalidationBatch: {
                CallerReference: `invalidation-${Date.now()}`,
                Paths: {
                    Quantity: 1,
                    Items: [cloudFrontConfig.InvalidationPath]
                }
            }
        };

        console.log('🔄 Creating CloudFront invalidation...');
        await cloudFront.createInvalidation(params).promise();
        console.log('✅ CloudFront invalidation created successfully');
    } catch (error) {
        console.error('❌ Error creating CloudFront invalidation:', error.message);
        throw error;
    }
}

// Test AWS connection
async function testAWSConnection() {
    try {
        console.log('🔍 Testing AWS connection...');
        await s3.listBuckets().promise();
        console.log('✅ AWS connection successful');
    } catch (error) {
        console.error('❌ AWS connection failed:', error.message);
        console.error('Please check your AWS credentials and permissions.');
        process.exit(1);
    }
}

// Main deployment function
async function deployToAWS() {
    console.log('🚀 Starting AWS deployment for Arvind Madavi Fitness Website...\n');
    
    // Validate environment
    validateEnvironment();
    
    // Test AWS connection
    await testAWSConnection();

    try {
        console.log(`📦 Uploading files to S3 bucket: ${s3Config.Bucket}\n`);
        
        // Upload all files to S3
        for (const file of filesToUpload) {
            if (fs.existsSync(file)) {
                await uploadFileToS3(file, file);
            } else {
                console.log(`⚠️  File ${file} not found, skipping...`);
            }
        }

        // Create CloudFront invalidation
        await createCloudFrontInvalidation();

        console.log('\n🎉 Deployment completed successfully!');
        console.log('\n📱 Your website is now live at:');
        console.log(`   S3 Website: https://${s3Config.Bucket}.s3-website-${awsConfig.region}.amazonaws.com`);
        
        if (cloudFrontConfig.DistributionId) {
            console.log(`   CloudFront: https://[YOUR-CLOUDFRONT-DOMAIN].cloudfront.net`);
        }
        
        console.log('\n💡 To get your CloudFront URL:');
        console.log('   1. Go to AWS CloudFront Console');
        console.log('   2. Find your distribution');
        console.log('   3. Copy the Domain Name');
        
    } catch (error) {
        console.error('\n❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

// Run deployment if this script is executed directly
if (require.main === module) {
    deployToAWS();
}

module.exports = { deployToAWS, uploadFileToS3, createCloudFrontInvalidation }; 