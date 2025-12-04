export default defineEventHandler(async (event) => {
  const db = useDatabase("myDB");
  
  const query = getQuery(event);
  const name = query.name || 'mydata';
  
  const drivers = await db.sql`SELECT * FROM drivers`;
  const calendar = await db.sql`SELECT * FROM calendar`;
  const circuits = await db.sql`SELECT * FROM circuits`;
  const manager = await db.sql`SELECT * FROM manager`;
  const teams = await db.sql`SELECT * FROM teams`;
  const leadboard = await db.sql`SELECT * FROM leadboard`;

  const data = {
    drivers: drivers.rows,
    calendar: calendar.rows,
    circuits: circuits.rows,
    manager: manager.rows,
    teams: teams.rows,
    leadboard: leadboard.rows
  };
  
  setResponseHeader(event, 'Content-Type', 'application/json');
  setResponseHeader(event, 'Content-Disposition', `attachment; filename="${name}.json"`);
  
  return data;
});