# Employee Management System

A role-based authentication Angular application with dynamic routing, dashboards for admin and employee, and a modular sidebar.

## Features
- Role-based login (Admin/Employee)
- Dynamic sidebar and routing based on user role
- Static credentials for demo (can be replaced with API)
- Separate dashboards for Admin and Employee
- Angular Standalone Components
- Responsive UI with Bootstrap/Material

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Angular CLI (`npm install -g @angular/cli`)

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/NikhileshGarol/AngularPoc.git
   cd AngularPoc/angular-poc
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the Application
```sh
ng serve
```
- The app will be available at `http://localhost:4200/`


## Usage
1. **Login:**
   - Enter the credentials above and select the role.
   - On successful login, you will be routed to the respective dashboard.
2. **Sidebar:**
   - Menu items change dynamically based on the logged-in role.
3. **Logout:**
   - Click the logout button in the sidebar to end the session.

## Project Structure
```
angular-poc/
  src/
    app/
      login/                # Login component
      admin-dashboard/      # Admin dashboard component
      employee-dashboard/   # Employee dashboard component
      sidebar/              # Sidebar component
      services/
        auth.ts             # Auth service (role-based logic)
      ...
  angular.json
  package.json
  README.md
```

## Customization
- To switch to API-based authentication, update `auth.ts` to call your backend and store the role in localStorage.
- Add more roles or menu items by editing the sidebar component's menu array.

## Troubleshooting
- If you see errors about missing modules, run `npm install` again.
- For port conflicts, change the port with `ng serve --port 4300`.

## License
MIT

## Author
Nikhilesh Garol
