import { Octokit } from '@octokit/rest';
import { Session, User } from 'next-auth';

import type { Maybe } from '@/types';
import type {
  GetResponseDataTypeFromEndpointMethod,
  GetResponseTypeFromEndpointMethod,
} from '@octokit/types';
import { getSession } from 'next-auth/react';

// import { env } from '@/env/server.mjs';

export const octokitInit = new Octokit({
  // auth: `client_id:${clientId}, client_secret:${clientSecret}`,
  auth: `${process.env.GITHUB_CLIENT_ID}, ${process.env.GITHUB_CLIENT_SECRET}`,
});

export type Octo = typeof Octokit;

type GitOpsInput = {
  path: string;
  content: any;
  message: string;
  sha: string;
};

export type Repository = GetResponseDataTypeFromEndpointMethod<
  typeof octokitInit.repos.createUsingTemplate
>;

type Author = {
  name: Maybe['string'];
  email: Maybe['string'];
};

export class GitFileManager {
  repository: Repository | null;
  octokit: any;
  committer: Author;
  author: Author;
  constructor(session: Session | null) {
    this.repository = null;
    this.octokit = new Octokit({ auth: session?.accessToken });
    this.committer = {
      name: session?.user?.name,
      email: session?.user?.email,
    };
    this.author = {
      name: session?.user?.name,
      email: session?.user?.email,
    };
  }

  async createFile({ path, content, message }: Omit<GitOpsInput, 'sha'>) {
    const { data } = await this.octokit.repos.createOrUpdateFile({
      owner: this.repository?.owner.name,
      repo: this.repository?.name,
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      committer: this.committer,
      author: this.author,
    });
    return data;
  }

  async readFile({ path }: Pick<GitOpsInput, 'path'>) {
    const { data } = await this.octokit.repos.getContent({
      owner: this.repository?.owner,
      repo: this.repository?.name,
      path,
    });
    return {
      content: Buffer.from(data.content, 'base64').toString(),
      sha: data.sha,
    };
  }

  async updateFile({ path, content, message, sha }: GitOpsInput) {
    const { data } = await this.octokit.repos.createOrUpdateFile({
      owner: this.repository?.owner,
      repo: this.repository?.name,
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      sha,
      committer: this.committer,
      author: this.author,
    });
    return data;
  }

  async deleteFile({ path, sha, message }: Omit<GitOpsInput, 'content'>) {
    const { data } = await this.octokit.repos.deleteFile({
      owner: this.repository?.owner,
      repo: this.repository?.name,
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
      const { data: directory } = await this.createFile({
        path: `${path}/`,
        content: '',
        message,
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
      const { data: directory } = await this.updateFile({
        path: `${path}/`,
        content: '',
        message,
        sha,
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
      await this.deleteFile({
        path: `${path}/`,
        sha,
        message: 'deleting directory',
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
        owner: this.repository?.owner.name,
        repo: this.repository?.name,
      });

      return repository ?? { message: 'something went wrong' };
    } catch (error) {}
  }

  async selectRepository(repositoryName: string) {
    try {
      const { data: repositories } =
        await this.octokit.repos.listForAuthenticatedUser();
      const selectedRepository = repositories.find(
        (repo: Repository) => repo.name === repositoryName
      );

      if (!selectedRepository) {
        throw new Error(`Repository ${repositoryName} not found`);
      }
      this.repository = selectedRepository;
      return selectedRepository ?? { message: 'could not select repository' };
    } catch (error) {
      console.error(error);
    }
  }
  async createRepository(repositoryName: string) {
    try {
      const { data: repository } =
        await this.octokit.repos.createForAuthenticatedUser({
          name: repositoryName,
        });
      console.log(
        '🚀 | file: file-manager.ts:219 | GitFileManager | repository',
        repository
      );
      this.repository = repository;
      return repository;
    } catch (error) {
      console.error(error);
    }
  }
}
