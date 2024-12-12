export function getPublicImageURL(filename: string, cdn = false): string {
    if(!filename) {
        return '';
    }
    return process.env.NEXT_PUBLIC_IMAGE_SOURCE_URL + filename;
}