# Venus Inventory Management System

A complete inventory management system built with Express.js, TypeScript, and Prisma ORM.

## Features

- **Inventory Management**: Create, read, update, and delete inventory items
- **Stock Additions**: Track inventory additions with vendor details, pricing, and quantities
- **Stock Subtractions**: Record inventory usage/sales with automatic stock validation
- **Real-time Stock Calculation**: Automatic current stock calculation based on additions and subtractions
- **Transaction History**: Complete audit trail of all inventory movements

## Tech Stack

- **Backend**: Express.js 5.x
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Runtime**: Node.js

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd venusInventory
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file and update the DATABASE_URL with your PostgreSQL connection string:
```
DATABASE_URL="postgresql://username:password@localhost:5432/venus_inventory?schema=public"
PORT=3000
NODE_ENV=development
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Inventory Items

- `POST /api/inventory` - Create new inventory item
- `GET /api/inventory` - Get all inventory items with current stock
- `GET /api/inventory/:id` - Get specific inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item

### Inventory Additions

- `POST /api/inventory/additions` - Create inventory addition
- `GET /api/inventory/additions` - Get all additions
- `GET /api/inventory/additions/inventory/:inventoryId` - Get additions by inventory ID
- `GET /api/inventory/additions/:id` - Get specific addition
- `DELETE /api/inventory/additions/:id` - Delete addition

### Inventory Subtractions

- `POST /api/inventory/subtractions` - Create inventory subtraction
- `GET /api/inventory/subtractions` - Get all subtractions
- `GET /api/inventory/subtractions/inventory/:inventoryId` - Get subtractions by inventory ID
- `GET /api/inventory/subtractions/:id` - Get specific subtraction
- `DELETE /api/inventory/subtractions/:id` - Delete subtraction

## API Request Examples

### Create Inventory Item
```json
POST /api/inventory
{
  "name": "Laptop",
  "unit": "pieces",
  "price": 50000,
  "remarks": "Dell Latitude series"
}
```

### Add Stock
```json
POST /api/inventory/additions
{
  "inventory_id": 1,
  "quantity": 10,
  "price": 48000,
  "vendor": "Tech Suppliers Ltd",
  "phone": "+1234567890",
  "date": "2024-01-15",
  "remarks": "Bulk purchase discount applied"
}
```

### Subtract Stock
```json
POST /api/inventory/subtractions
{
  "inventory_id": 1,
  "quantity": 2,
  "price": 55000,
  "vendor": "ABC Corporation",
  "phone": "+0987654321",
  "date": "2024-01-20",
  "remarks": "Sold to corporate client"
}
```

## Database Schema

The application uses three main tables:

1. **inventory**: Base inventory items (name, unit, price, remarks)
2. **inventory_addition**: Records of stock additions
3. **inventory_subtraction**: Records of stock subtractions

Current stock is calculated dynamically by summing additions and subtracting the sum of subtractions.

## Additional Scripts

- `npm run prisma:studio` - Open Prisma Studio for database management
- `npm run build` - Build TypeScript to JavaScript
- `npm test` - Run tests (to be implemented)

## Project Structure

```
venusInventory/
├── config/
│   └── db.ts              # Prisma client configuration
├── controllers/
│   └── inventoryController.ts  # Request handlers
├── routes/
│   └── inventoryRoute.ts       # API routes
├── services/
│   └── inventoryService.ts     # Business logic
├── prisma/
│   └── schema.prisma           # Database schema
├── index.ts                    # Application entry point
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## License

ISC

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.
