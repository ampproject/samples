import getWorksheetData from './getWorksheetData';

export const getUsers = async () => {
  const data = await getWorksheetData('users');
  return data
    .filter((item) => {
      if (!item.email || !item.name) {
        return false;
      }
      return true;
    })
    .map(({name, email, password}) => {
      return {
        name,
        email,
        password,
      };
    });
};

export const getUserByEmail = async (email) => {
  const users = await getUsers();
  return users.find(({email: target}) => target === email);
};

export default getUserByEmail;
