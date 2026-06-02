import { pool } from '../../../../lib/db';
import { authorize } from '../../../../middleware/auth';

export default async function handler(req, res) {
  authorize([1])(req, res, async () => { // Only Admin
    try {
      const db = await pool(); // Singleton pool
      const result = await db.request()
        .execute('sp_GetAllRoles');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
}