// Build the migration(s) in Knex inside the data/migrations folder using appropriate data types and constraints. You must use the table names and the column names described below. To give a primary key a name different than id, do table.increments("project_id") instead of table.increments().

exports.up = function (knex) {
  return (
    knex.schema
      // A project is what needs to be done and is stored in a *PROJECTS* table with the following columns:

      // project_id - primary key
      // project_name - required
      // project_description - optional
      // project_completed - the database defaults it to false (integer 0) if not provided
      .createTable("projects", (tbl) => {
        tbl.increments("project_id");
        tbl.string("project_name").notNullable();
        tbl.string("project_description");
        tbl.boolean("project_completed").notNullable().defaultTo(false);
      })
      // A *RESOURCE* is anything needed to complete a project and is stored in a *RESOURCES TABLE* with the following columns:
      // resource_id - primary key
      // resource_name - required and unique
      // resource_description - optional
      .createTable("resources", (tbl) => {
        tbl.increments("resource_id");
        tbl.string("resource_name").notNullable().unique();
        tbl.string("resource_description");
      })
      // *A TASK* is one of the steps needed to complete a project and is stored in a tasks table with the following columns:

      // task_id - primary key
      // task_description - required
      // task_notes - optional
      // task_completed - the database defaults it to false (integer 0) if not provided
      .createTable("tasks", (tbl) => {
        tbl.increments("task_id");
        tbl.string("task_description").notNullable();
        tbl.string("task_notes");
        tbl.boolean("task_completed").notNullable().defaultTo(false);
        // project_id - required and points to an actual project_id in the projects table
        tbl
          .integer("project_id")
          .notNullable()
          .unsigned()
          .references("projects.project_id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      // A resource assignment connects a resource and a project, and is stored in a project_resources table. You decide what columns to use.
      .createTable("project_resources", (tbl) => {
        tbl.increments("res_id");
        tbl
          .integer("project_id")
          .notNullable()
          .unsigned()
          .references("projects.project_id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("resource_id")
          .notNullable()
          .unsigned()
          .references("resources.resource_id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
