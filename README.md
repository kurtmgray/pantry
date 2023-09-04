# Pantry App #

This is a web application to help manage your home pantry and ingredients.

## Features ##
* Add ingredients to your virtual pantry
* Search for recipes based on what's in your pantry
* Get suggestions for ingredients to add to your pantry
* View nutrition information for ingredients
* Filter recipes by dietary preferences, prep time, etc.

## Tech Stack ##
* Next.js
* React
* TypeScript
* Prisma
* PostgreSQL
* NextAuth.js

## Getting Started ##
1. Clone the repo
2. Install dependencies with npm install
3. Configure environment variables
4. Run npm run dev to start the dev server
5. Open http://localhost:3000 in your browser


## API Reference ##
API routes are defined under /pages/api. Key routes include:

* POST /api/pantry - Add a new pantry item
* GET /api/pantry - Get pantry items for a user
* DELETE /api/pantry - Delete a pantry item
* POST /api/recipes - Search recipes by ingredients and filters
* Database
The database is PostgreSQL and is managed via Prisma. The schema and models are under /prisma.

## Authentication ##
Authentication is implemented using NextAuth.js. Users can sign in with credentials or OAuth providers like Google and GitHub.

## Contributing ##
Pull requests are welcome! Feel free to open issues for any bugs or feature requests.

## License ##
This project is licensed under the MIT license. See LICENSE for more details.
