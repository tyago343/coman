import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  s3 = new AWS.S3({
    accessKeyId: this.configService.get('S3_ACCESS_KEY'),
    secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
    region: this.configService.get('S3_BUCKET_REGION'),
  });
  async uploadFile(file: Express.Multer.File) {
    const { originalname, buffer, mimetype } = file;
    return this.s3_upload({
      file: buffer,
      bucket: this.configService.get('S3_BUCKET_NAME'),
      name: originalname,
      mimetype,
    });
  }
  async s3_upload({
    file,
    bucket,
    name,
    mimetype,
  }: {
    file: any;
    bucket: any;
    name: any;
    mimetype: any;
  }) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
