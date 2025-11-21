export const getRandomAvatar = (id?: number): string => {
  if (!id) {
    return "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp";
  }

  const asString = id?.toString();
  const lastNum = asString[asString.length - 1];

  switch (lastNum) {
    case "0":
      return "https://img.daisyui.com/images/profile/demo/batperson@192.webp";
    case "1":
      return "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";
    case "2":
      return "https://img.daisyui.com/images/profile/demo/averagebulk@192.webp";
    case "3":
      return "https://img.daisyui.com/images/profile/demo/wonderperson@192.webp";
    case "4":
      return "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp";
    case "5":
      return "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";
    case "6":
      return "https://img.daisyui.com/images/profile/demo/superperson@192.webp";
    case "7":
      return "https://img.daisyui.com/images/profile/demo/gordon@192.webp";
    case "8":
      return "https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp";
    case "9":
      return "https://img.daisyui.com/images/profile/demo/distracted1@192.webp";

    default:
      return "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp";
  }
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


export const formatDate = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`); // ensure it's parsed as local date
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};