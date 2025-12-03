'use strict';

/**
 * Migration: increase URL length in the "files" table.
 * This migration ensures the column is wide enough for longer Azure Blob Storage URLs.
 */
async function up(knex) {
  const tableName = 'files';

  //Safety check: ensure the table exists before attempting to alter it.
  const hasTable = await knex.schema.hasTable(tableName);
  if (!hasTable) {
    console.log(`[migration] Table "${tableName}" not found — skipping migration.`);
    return;
  }

  //Alter the column definitions. Knex's .alter() updates the existing schema.
  await knex.schema.alterTable(tableName, (table) => {
    //Increase the URL column to 400 characters.
    table.string('url', 400).alter();
  });

  console.log('[migration] Successfully increased files.url length to varchar(400)');
}

module.exports = { up };
