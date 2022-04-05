export const constants = {
  AUTHORIZATION: 'Authorization',

  EMAIL_REGEXP: /^.+@[^@]+\.[^@]{2,}$/,

  PHOTO_MAX_SIZE: 2 * 1024 * 1024,
  VIDEO_MAX_SIZE: 20 * 1024 * 1024,

  PHOTOS_MIMETYPES: [
    'image/gif', // .gif
    'image/jpeg', // .jpg, .jpeg
    'image/pjpeg', // .jpeg
    'image/png', // .png
    'image/webp' // .webp
  ],

  VIDEO_MIMETYPES: [
    'video/mp4',
    'video/x-msvideo'
  ]
}
