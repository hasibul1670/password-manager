import CryptoJS from 'crypto-js';

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, import.meta.env.VITE_ENCRYPTION_KEY || 'default-key').toString();
};

export const demoPasswords = [
  {
    id: 1,
    title: 'Gmail Account',
    url: 'https://mail.google.com',
    username: 'john.doe@gmail.com',
    password: encryptPassword('StrongPass123!'),
    category: 'Personal',
    createdAt: '2023-01-15T08:00:00.000Z'
  },
  {
    id: 2,
    title: 'Company Portal',
    url: 'https://portal.company.com',
    username: 'jdoe@gmail.com',
    password: encryptPassword('WorkAcc3ss#2023'),
    category: 'Work',
    createdAt: '2023-02-20T10:30:00.000Z'
  },
  {
    id: 3,
    title: 'Online Banking',
    url: 'https://banking.example.com',
    username: 'john.doe.banking',
    password: encryptPassword('B@nk1ngS3cure!'),
    category: 'Finance',
    createdAt: '2023-03-10T14:15:00.000Z'
  },
  {
    id: 4,
    title: 'LinkedIn',
    url: 'https://www.linkedin.com',
    username: 'john.doe.professional',
    password: encryptPassword('L1nked!n2023'),
    category: 'Social',
    createdAt: '2023-04-05T09:45:00.000Z'
  },
  {
    id: 5,
    title: 'Amazon Account',
    url: 'https://www.amazon.com',
    username: 'john.doe.shopping',
    password: encryptPassword('Sh0pp1ng@m@zon'),
    category: 'Personal',
    createdAt: '2023-05-01T11:20:00.000Z'
  }
];