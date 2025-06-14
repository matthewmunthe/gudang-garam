import request from 'supertest';
import express from 'express';
import { db } from '../models/db';
import authRoutes from '../routes/auth';
import itemRoutes from '../routes/items';
import { authenticateJWT } from '../middlware/auth';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', authenticateJWT, itemRoutes);

let token: string;

beforeAll(async () => {
  // Optional: insert a test user
  await db.query(`INSERT INTO users(username, password, role) VALUES('testuser', 'testpass', 'admin') ON CONFLICT DO NOTHING`);
});

afterAll(async () => {
  await db.end();
});

describe('Auth Route', () => {
  it('should login and return a JWT token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'admin',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});

describe('Items Route', () => {
  it('should get items with auth token', async () => {
    const res = await request(app).get('/api/items').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create item as admin', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Item',
        quantity: 10,
        description: 'For testing',
      });
    expect(res.statusCode).toBe(201);
  });
});
