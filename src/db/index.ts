import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {bigint, text, timestamp} from "drizzle-orm/pg-core";

export const db = drizzle(process.env.DATABASE_URL!);

export const snowId = {
    id: bigint('id', {mode: 'bigint'}).primaryKey(),
}

export const creator = {
    createdBy: text('created_by').notNull(),
    createdById: bigint('created_by_id', {mode: 'bigint'}).notNull(),
}

export const createdAt = {
    createdAt: timestamp('created_at', {mode: 'date', withTimezone: true}).notNull(),
}

export const updater = {
    updatedBy: text('updated_by'),
    updatedById: bigint('updated_by_id', {mode: 'bigint'}),
}

export const updatedAt = {
    updatedAt: timestamp('updated_at', {mode: 'date', withTimezone: true}),
}
