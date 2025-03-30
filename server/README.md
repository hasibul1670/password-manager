nestjs-backend/
│── src/
│   ├── common/               # Shared utilities and helpers
│   │   ├── decorators/       # Custom decorators
│   │   ├── dto/              # Shared DTOs
│   │   ├── filters/          # Exception filters
│   │   ├── guards/           # Authorization guards
│   │   ├── interceptors/     # Interceptors for requests
│   │   ├── middleware/       # Custom middleware
│   │   ├── pipes/            # Validation pipes
│   │   ├── utils/            # Utility functions/helpers
│   │   └── constants.ts      # Global constants
│   │
│   ├── config/               # Configuration files
│   │   ├── database.config.ts # Database connection config
│   │   ├── jwt.config.ts     # JWT authentication config
│   │   ├── env.config.ts     # Environment variables config
│   │   └── app.config.ts     # General app configuration
│   │
│   ├── modules/              # Feature modules
│   │   ├── auth/             # Authentication module
│   │   │   ├── dto/          # DTOs for authentication
│   │   │   ├── entities/     # Database entities
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.guard.ts
│   │   │
│   │   ├── users/            # Users module
│   │   │   ├── dto/          # DTOs for users
│   │   │   ├── entities/     # User entity
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.repository.ts
│   │   │
│   │   ├── products/         # Products module (example)
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── products.controller.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.repository.ts
│   │   │
│   │   └── orders/           # Orders module (example)
│   │
│   ├── database/             # Database configuration & migrations
│   │   ├── migrations/       # TypeORM migrations
│   │   ├── entities/         # Global entities
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   │
│   ├── app.module.ts         # Main application module
│   ├── main.ts               # Application entry point
│
├── test/                     # Unit and e2e tests
│
├── .env                      # Environment variables
├── .env.example              # Example environment file
├── .gitignore                # Git ignore file
├── package.json              # Package dependencies
├── nest-cli.json             # Nest CLI configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation


nest generate module module-name
# OR
nest g mo module-name

nest generate controller module-name
# OR
nest g co module-name

nest generate service module-name
# OR
nest g s module-name
llll

