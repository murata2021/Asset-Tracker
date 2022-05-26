# Asset-Tracker

Asset Tracker is my second capstone project for my software engineering bootcamp with Springboard. It is a web application that helps companies to:
- Track their assets
- Get instant access to their asset data
- Monitor the status of their asset & stay in the know with real-time reports

It is hosted on https://asset-tracker-mya.surge.sh/

## Navigation

Here is the general process for a user:

1. When the user signs up to the system, the company account is created and the user becomes the system administrator. 
2. Each company account has only one system administrator and deleting the system administrator, deletes the company account as well
3. System Administrator can create new users, edit/delete users, create/edit/delete asset-related information, view reports and delete company account
4. When the non-admin user logs in, he/she can perform a different set of tasks:
 - they can edit/delete asset groups, asset and vendor information.
 - view vendor, asset groups, and asset reports
 - edit their own information

## Backend

- Backend is deployed on https://asset-tracker-2022.herokuapp.com/
- Backend repository: https://github.com/murata2021/Asset-Tracker/tree/main/asset-tracker-backend

  ### Technologies & Tools Used
  
  Node.js
  Express.js
  PostgreSQL
  Sequelize.js
  Express-Validator
  Json Web Token
  Bcrypt

## Frontend

- Frontend repository: https://github.com/murata2021/Asset-Tracker/tree/main/asset-tracker-frontend

  ### Technologies & Tools Used
  
  - React.js
  - React-redux
  - React-router
  - React-chartsjs-2
  - React-datepicker
  - React-currency-input-field
  
  
