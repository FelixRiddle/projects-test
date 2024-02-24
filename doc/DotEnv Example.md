# DotEnv example

Use the typical syntax from my other projects.

```bash
# JWT Secret key
# Minimum 64 by JWT standard
JWT_SECRET_KEY=SOME_SUPER_LONG_RANDOM_STRING_COMMA_THAT_I_WONT_GIVE_TO_ANYONE

# This server data
SERVER_PROTOCOL=http
SERVER_HOST=localhost
SERVER_PORT=3000

DISABLE_MAIL=true

# Allowed origins
ORIGIN=http://localhost:3000
ORIGIN_1=http://127.0.0.1:3000

# --- Databases ---
# General username and password for all databases(Recommended)
DATABASE_USERNAME=username
DATABASE_PASSWORD=password

# General Database name and Collection/Table name
DATABASE_NAME=bienesraices_node_mvc
DATABASE_COLLECTION_NAME=user

# --- DBSpecific ---
# MySQL database
# The database should never be visible from the outside(From internet)
# It should be accessed through specific endpoints in the backend
MYSQL_DATABASE_NAME=per-auth
MYSQL_USERNAME=username
MYSQL_PASSWORD=password
MYSQL_HOST=localhost
MYSQL_PORT=3306

# MongoDB
MONGO_HOST=localhost
MONGO_PORT=27017
```
