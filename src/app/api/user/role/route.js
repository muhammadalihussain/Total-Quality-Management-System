import { pool } from '../../../../lib/db';

export default async function handler(req, res) {
  const { roleId } = req.query;

  try {
    const db = await pool(); // Singleton pool
    const result = await db.request()
      .input('RoleID', roleId)
      .execute('sp_GetMenuByRole');

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}