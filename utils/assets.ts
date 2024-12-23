export function getPublicImageURL(filename: string): string {
    if(!filename) {
        return '';
    }
    return (process.env.NEXT_PUBLIC_IMAGE_SOURCE_URL ?? '/assets/images/fpo/') + filename;
}