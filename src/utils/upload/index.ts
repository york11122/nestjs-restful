import * as cloudinary from 'cloudinary'
import * as fs from 'fs'
import {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} from '@environment'
import { GridFSBucketReadStream } from 'typeorm'

/**
 * Returns image url by upload file.
 *
 * @remarks
 * This method is part of the {@link shared/upload}.
 *
 * @param file - 1st input
 *
 * @returns The string mean of `createReadStream`
 *
 * @beta
 */
export const uploadFile = async (file: any, folder: string, tags: string): Promise<string> => {
    cloudinary.v2.config({
        cloud_name: CLOUDINARY_NAME!,
        api_key: CLOUDINARY_API_KEY!,
        api_secret: CLOUDINARY_API_SECRET!
    })
    const uniqueFilename = tags + new Date().toISOString()

    const result = await new Promise(async (resolve, reject) =>
        cloudinary.v2.uploader.upload_stream(
            {
                folder: folder,
                public_id: uniqueFilename,
                tags: tags
            }, // directory and tags are optional
            (err, image) => {
                if (err) {
                    reject(err)
                }
                resolve(image)
            }
        ).end(file.buffer)
    )

    return result['secure_url']
}
