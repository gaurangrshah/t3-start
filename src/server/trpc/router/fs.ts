import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { fsManager } from '@/lib/fs';
import { protectedProcedure, router } from '../trpc';

const fileInputSchema = z.object({ fileName: z.string(), data: z.string() });
const dirInputSchema = z.object({ dirName: z.string() });
const dirUpdateInputSchema = z.object({
  oldDirName: z.string(),
  newDirName: z.string(),
});

export const fsRouter = router({
  createFile: protectedProcedure
    .input(fileInputSchema)
    .mutation(async ({ input }) => {
      if (!input.fileName || !input.data) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        const result = await fsManager.createFile(input);
        console.log('🚀 | file: fs.ts:28 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  readFile: protectedProcedure
    .input(fileInputSchema.pick({ fileName: true }))
    .query(async ({ input }) => {
      if (!input.fileName) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        const result = await fsManager.readFile(input);
        console.log('🚀 | file: fs.ts:49 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  updateFile: protectedProcedure
    .input(fileInputSchema)
    .mutation(async ({ input }) => {
      if (!input.fileName || !input.data) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        const result = await fsManager.updateFile(input);
        console.log('🚀 | file: fs.ts:70 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  deleteFile: protectedProcedure
    .input(fileInputSchema.pick({ fileName: true }))
    .mutation(async ({ input }) => {
      if (!input.fileName) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        const result = await fsManager.deleteFile(input);
        console.log('🚀 | file: fs.ts:91 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  createDirectory: protectedProcedure
    .input(dirInputSchema)
    .mutation(async ({ input }) => {
      if (!input.dirName) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }
      try {
        const result = await fsManager.createDirectory(input);
        console.log('🚀 | file: fs.ts:111 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  listDirectory: protectedProcedure
    .input(dirInputSchema)
    .query(async ({ input }) => {
      if (!input.dirName) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        const result = await fsManager.listDirectory(input);
        console.log('🚀 | file: fs.ts:132 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  renameDirectory: protectedProcedure
    .input(dirUpdateInputSchema)
    .mutation(async ({ input }) => {
      if (!input.oldDirName || !input.newDirName) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        const result = await fsManager.renameDirectory(input);
        console.log('🚀 | file: fs.ts:153 | result', result);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
  deleteDirectory: protectedProcedure
    .input(dirInputSchema)
    .mutation(async ({ input }) => {
      if (!input.dirName) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'invalid input',
        });
      }

      try {
        return await fsManager.deleteDirectory(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'something went wrong',
        });
      }
    }),
});
