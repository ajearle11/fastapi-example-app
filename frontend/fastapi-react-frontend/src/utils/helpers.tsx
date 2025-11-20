export const getRandomAvatar = (): string => {
  const photos = [
    "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp",
    "https://img.daisyui.com/images/profile/demo/averagebulk@192.webp",
    "https://img.daisyui.com/images/profile/demo/wonderperson@192.webp",
    "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp",
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    "https://img.daisyui.com/images/profile/demo/superperson@192.webp",
    "https://img.daisyui.com/images/profile/demo/gordon@192.webp",
    "https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp",
  ];

  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

export const workOutAge = (dateString: string): number => {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
