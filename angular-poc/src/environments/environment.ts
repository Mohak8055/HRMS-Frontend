export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:8000',
  version: 'v1',
  endpoints: {
    login: '/auth/login',
    getAllRoles: '/master/roles',
    getAllDepartements: '/master/depts',
    createEmployee: '/user/create',
    updateEmployee: '/user/update',
    user: '/user',
    getAllEmployees: '/user/all-user',
    sendMail: '/leave-mail/send',
  }
};
