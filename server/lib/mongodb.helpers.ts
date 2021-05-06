import { Db, MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!process.env.MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}


export interface MongoConn {
  client: MongoClient
  db: Db
}

interface MongoCache {
  conn: MongoConn
  promise: Promise<MongoConn>
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongoCache = global['mongo']

if (!cached) {
  cached = global['mongo'] = { conn: null, promise: null }
}

export async function connectToDatabase(): Promise<MongoConn> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(process.env.MONGODB_URI, opts).then((client): MongoConn => {
      return {
        client,
        db: client.db(process.env.MONGODB_DB),
      }
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
