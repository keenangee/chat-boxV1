// aws-config.ts
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-west-2", // replace with your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // use environment variables or other secure methods
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default AWS;
