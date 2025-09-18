# TODO: Prepare Bloomzon-Server for Hosting on Render

## Steps to Complete:
- [ ] Update index.ts to use process.env.PORT for Render compatibility
- [ ] Verify build and start scripts in package.json
- [ ] Set up environment variables for database on Render
- [ ] Test build locally
- [ ] Deploy to Render

## Information Gathered:
- Project is a Node.js/TypeScript Express API with Socket.IO
- Uses MySQL database via Sequelize
- Build script compiles TS to JS in dist/
- Start script runs from dist/index.js
- Database connection uses env vars (DB_HOST, DB_USER, etc.)
- Server listens on APP_PORT_NUMBER, needs to change to PORT for Render

## Dependent Files:
- index.ts (change port)
- package.json (scripts are ready)
- Environment variables (to be set on Render)

## Followup Steps:
- Create Render account and service
- Connect GitHub repo
- Set build command: npm run build
- Set start command: npm start
- Add environment variables for DB
- Deploy and test endpoints
