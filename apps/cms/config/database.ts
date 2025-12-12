type Env = {
  (name: string): string | undefined;
  (name: string, defaultValue: any): string | any;
  int: (name: string, defaultValue?: number) => number;
  bool: (name: string, defaultValue?: boolean) => boolean;
};

interface DatabaseContext {
  env: Env;
}

export default ({ env }: DatabaseContext) => ({
  connection: {
    // Database client to use
    client: 'postgres',
    connection: {
      // Hostname or IP of PostgreSQL server
      host: env('DATABASE_HOST'),

      // Port number (defaults to 5432)
      port: env.int('DATABASE_PORT', 5432),

      // Name of the database (default: 'strapi')
      database: env('DATABASE_NAME', 'strapi'),

      // Database username and password
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),

      // Enable SSL for Azure PostgreSQL (recommended)
      // Azure requires SSL by default, so we accept self-signed certs
      ssl: env.bool('DATABASE_SSL', true)
        ? { rejectUnauthorized: false }
        : false,
    },

    settings: {
      forceMigration: true,
      runMigrations: true
    },
    
    // Optional connection pool configuration
    pool: {
      min: 0,
      max: 10,
    },
  },
});