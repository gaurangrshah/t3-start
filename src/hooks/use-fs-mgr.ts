import { trpc } from '@/utils/trpc';
import { cancelRetry } from '../utils/react-query';

export function useFsManager() {
  // const { data: file, isLoading: isReadFileLoading } =
  //   trpc.fs.readFile.useQuery({
  //     fileName,
  //   });

  // const { mutate: createFile, isLoading: isCreateLoading } =
  //   trpc.fs.createFile.useMutation();

  // const { mutate: updateFile, isLoading: isUpdateLoading } =
  //   trpc.fs.updateFile.useMutation();

  // const { mutate: deleteFile, isLoading: isDeleteLoading } =
  //   trpc.fs.deleteFile.useMutation();

  // const { mutate: createDirectory, isLoading: isCreateDirLoading } =
  //   trpc.fs.createDirectory.useMutation();

  // const { data: listDir, isLoading: isDirLoading } =
  //   trpc.fs.listDirectory.useQuery({
  //     dirName: fileName,
  //   });

  // const { mutate: renameDir, isLoading: isRenameDirLoading } =
  //   trpc.fs.renameDirectory.useMutation();

  // const { mutate: deleteDir, isLoading: isDeleteDirLoading } =
  //   trpc.fs.deleteDirectory.useMutation();

  return {
    readFile: trpc.fs.readFile.useQuery,
    createFileMutation: trpc.fs.createFile.useMutation(),
    updateFileMutation: trpc.fs.updateFile.useMutation(),
    deleteFileMutation: trpc.fs.deleteFile.useMutation(),
    // listDir,
    // isDirLoading,
    // createDirectory,
    // isCreateDirLoading,
    // renameDir,
    // isRenameDirLoading,
    // deleteDir,
    // isDeleteDirLoading,
  };
}
