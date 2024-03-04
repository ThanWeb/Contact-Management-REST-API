## Setup Project

- Create .env file and write database url

```
DATABASE_URL="mysql://johndoe:yourpassword@localhost:3306/your_db_name"
```

- Make sure your database already run
- Run this commands
```
npm install

npx prisma migrate dev

npx prisma generate
```
- Run the project with this command, there is two options for run the project (pre-build and post-build)
```
npm run dev
```

or
```
npm run build

npm start
```