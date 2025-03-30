export const generateId = async (
  lastDoc: any,
  prefix: string,
): Promise<string> => {
  const currentDate = new Date();
  const yearMonth = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;

  const parsedId = lastDoc ? parseInt(lastDoc) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');

  const newId = `${prefix}-${yearMonth}-${incrementedId}`;

  return newId;
};
