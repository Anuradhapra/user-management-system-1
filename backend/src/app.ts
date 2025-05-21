// backend/ormconfig.json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "your_db_password",
  "database": "user_access_db",
  "synchronize": true,
  "logging": false,
  "entities": ["dist/entity//*.js"],
  "migrations": ["dist/migration//*.js"],
  "subscribers": ["dist/subscriber//*.js"]
}