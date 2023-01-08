import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { Session, User } from 'next-auth';

import {
  Endpoints,
  GetResponseDataTypeFromEndpointMethod,
} from '@octokit/types';

export const octokit = new Octokit(Octokit.defaults);

export type Octo = typeof Octokit;

type GitOpsInput = {
  path: string;
  content: any;
  message: string;
  sha: string;
};

type GHUser = {
  name: string;
};

type Repository = {
  name: string;
  owner: GHUser;
};

// export type Repository = GetResponseDataTypeFromEndpointMethod<
//   // @ts-ignore @TODO: fix 'repos' does not exist on type
//   typeof octokit.repos.get
// >;

type Author = {
  name: string;
  email: string;
};

type createFileInput =
  RestEndpointMethodTypes['repos']['createOrUpdateFileContents']['parameters'];
type createFileOutput = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.repos.createOrUpdateFileContents
>;

// type readFileOutput = GetResponseDataTypeFromEndpointMethod<
//   typeof octokit.repos.getContent
// >;
type readFileOutput =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

function bufferContent(content: any) {
  return Buffer.from(content).toString('base64');
}

export class GitFileManager {
  private octokit: Octokit;
  private repository: Repository | null;
  private committer: Author;
  private author: Author;
  constructor(session: Session | null) {
    this.repository = null;
    this.octokit = new Octokit({ auth: session?.accessToken });
    this.committer = {
      name: String(session?.user?.name),
      email: String(session?.user?.email),
    };
    this.author = {
      name: String(session?.user?.name),
      email: String(session?.user?.email),
    };
  }

  async createFile({
    path,
    content,
    message,
  }: createFileInput): Promise<createFileOutput> {
    const { data: file } = await this.octokit.repos.createOrUpdateFileContents({
      owner: String(this.repository?.owner.name),
      repo: String(this.repository?.name),
      path,
      // content: Buffer.from(content).toString('base64'),
      content: bufferContent(content),
      message,
      committer: this.committer,
      author: this.author,
    });
    return file;
  }

  async readFile({ path }: { path: string }) {
    const file = await this.octokit.repos.getContent({
      owner: 'gaurangrshah' || String(this.repository?.owner),
      repo: 'boiler' || String(this.repository?.name),
      path,
    });

    return {
      content: Buffer.from(
        // @ts-ignore
        file.data?.content,
        // @ts-ignore
        file.data.encoding || 'base64'
      ).toString(),
      // sha: data?.sha,
      data: file,
    };
  }

  async updateFile({ path, content, message, sha }: GitOpsInput): Promise<
    GetResponseDataTypeFromEndpointMethod<
      // @ts-ignore
      typeof octokit.repos.createOrUpdateFile
    >
  > {
    const { data } = await this.octokit.repos.createOrUpdateFileContents({
      owner: String(this.repository?.owner),
      repo: String(this.repository?.name),
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      sha,
      committer: this.committer,
      author: this.author,
    });
    return data;
  }

  async deleteFile({
    path,
    sha,
    message,
  }: Omit<GitOpsInput, 'content'>): Promise<
    // @ts-ignore
    GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.deleteFile>
  > {
    const { data } = await this.octokit.repos.deleteFile({
      owner: String(this.repository?.owner),
      repo: String(this.repository?.name),
      path,
      sha,
      message,
      committer: this.committer,
    });
    return data;
  }

  async createDirectory({
    path,
    message,
  }: Omit<GitOpsInput, 'sha' | 'content'>) {
    try {
      // To create a directory on GitHub, you need to create a file with a trailing slash in the name
      // This will create a file named `directory/` that represents the directory
      const { data: directory } =
        await this.octokit.repos.createOrUpdateFileContents({
          path: `${path}/`,
          content: '',
          message,
          owner: String(this.repository?.owner),
          repo: String(this.repository?.name),
        });
      return directory;
    } catch (error) {
      console.error(error);
    }
  }

  async readDirectory({ path }: Pick<GitOpsInput, 'path'>) {
    try {
      const { data: directory } = await this.octokit.repos.getContent({
        owner: this.repository?.owner,
        repo: this.repository?.name,
        path,
      });
      return directory;
    } catch (error) {
      console.error(error);
    }
  }

  async updateDirectory({ path, message, sha }: Omit<GitOpsInput, 'content'>) {
    try {
      // To update a directory on GitHub, you need to update the file with a trailing slash in the name
      // that represents the directory
      const { data: directory } =
        await this.octokit.repos.createOrUpdateFileContents({
          path: `${path}/`,
          content: '',
          message,
          sha,
          owner: String(this.repository?.owner),
          repo: String(this.repository?.name),
        });
      return directory;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteDirectory({ path, sha }: Pick<GitOpsInput, 'path' | 'sha'>) {
    try {
      // To delete a directory on GitHub, you need to delete the file with a trailing slash in the name
      // that represents the directory
      await this.octokit.repos.deleteFile({
        path: `${path}/`,
        sha,
        message: 'deleting directory',
        owner: String(this.repository?.owner),
        repo: String(this.repository?.name),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async listPublicRepositories() {
    try {
      const { data: repositories } =
        await this.octokit.repos.listForAuthenticatedUser({
          visibility: 'public',
          sort: 'updated',
          direction: 'desc',
          perPage: 10,
          page: 1,
        });
      return repositories ?? [];
    } catch (error) {
      console.error(error);
    }
  }

  async getSelectedRepository() {
    try {
      const { data: repository } = await this.octokit.repos.get({
        owner: String(this.repository?.owner.name),
        repo: String(this.repository?.name),
      });

      return repository ?? { message: 'something went wrong' };
    } catch (error) {}
  }

  async selectRepository(repositoryName: string) {
    try {
      const { data: repositories } =
        await this.octokit.repos.listForAuthenticatedUser();
      const selectedRepository = repositories.find(
        (repo: any) => repo.name === repositoryName
      );

      if (!selectedRepository) {
        throw new Error(`Repository ${repositoryName} not found`);
      }
      // this.repository = selectedRepository; // @TODO: @FIXME:
      return selectedRepository ?? { message: 'could not select repository' };
    } catch (error) {
      console.error(error);
    }
  }

  async createRepository(repositoryName: string) {
    // @TODO: CHECK IF A REPO WITH THIS NAME ALREADY EXISTS BEFORE CREATEING
    try {
      const { data: repository } =
        await this.octokit.repos.createForAuthenticatedUser({
          name: repositoryName,
          auto_init: true,
        });

      // this.repository = selectedRepository; // @TODO: @FIXME:
      return repository;
    } catch (error) {
      console.error(error);
    }
  }
  async createTemplateRepository(repositoryName: string) {
    // @TODO: CHECK IF A REPO WITH THIS NAME ALREADY EXISTS BEFORE CREATEING
    try {
      const { data: repository } = await this.octokit.repos.createUsingTemplate(
        {
          template_owner: 'gaurangrshah',
          template_repo: 'fm',
          name: repositoryName,
        }
      );

      // this.repository = selectedRepository; // @TODO: @FIXME:
      return repository;
    } catch (error) {
      console.error(error);
    }
  }
}
