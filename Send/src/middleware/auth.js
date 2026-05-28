import { verifyToken } from '../lib/jwt';

/**
 * Middleware to protect API routes with JWT and optional role-based access.
 * 
 * Usage:
 *   authorize([1,2])(req, res, () => { ... });
 *   - roles: array of allowed RoleIDs (optional)
 */
export const authorize = (roles = []) => (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: 'Unauthorized: No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json({ message: 'Unauthorized: Invalid token format' });

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });

    // Check role-based access if roles array is provided
    if (roles.length && !roles.includes(decoded.role))
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });

    // Attach user info to request for API handlers
    req.user = decoded;

    // Call the next function in the API handler
    if (typeof next === 'function') next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    return res.status(500).json({ message: 'Server error in auth middleware' });
  }
};