export const isEmail = (value: string | null) => {
  if (!value) return;
  return /\S+@\S+\.\S+/.test(value);
};

export const isLength = (value: string | null) => {
  if (!value) return;
  return value.length > 6;
};

