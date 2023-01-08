import { Octokit } from '@octokit/rest';
import { Session } from 'next-auth';

import type { Maybe } from '@/types';
import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

export type Repository = GetResponseDataTypeFromEndpointMethod<
  // @ts-ignore @TODO: fix 'repos' does not exist on type
  typeof octokit.repos.createForAuthenticatedUser
>;

type GitOpsInput = {
  path: string;
  content: any;
  message: string;
  sha: string;
};

type GHConstructor = {
  auth: Session['accessToken'];
};

type Author = {
  name: Maybe['string'];
  email: Maybe['string'];
};

export class GitHubProvider {
  octokit: Octokit | any;
  constructor({ auth }: GHConstructor) {
    this.octokit = new Octokit({ auth });
  }

  async getUser(username: string): Promise<any> {
    const { data: user } = await this.octokit.users.getByUsername({ username });
    return user;
  }
}

class GitHubRepoApi extends GitHubProvider {
  repository: Repository;
  constructor({ session }: { session: Session }) {
    super({ auth: session?.accessToken });
    this.repository = null;
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
    // @TODO: CHECK IF A REPO WITH THIS NAME ALREADY EXISTS BEFORE CREATEING
    try {
      const { data: repository } =
        await this.octokit.repos.createForAuthenticatedUser({
          name: repositoryName,
          auto_init: true,
        });

      this.repository = repository;
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

      this.repository = repository;
      return repository;
    } catch (error) {
      console.error(error);
    }
  }
}

class GitHubFileAPI extends GitHubProvider {
  author: Author;
  constructor(session: Session) {
    super({ auth: session?.accessToken });
    this.author = {
      name: session?.user?.name,
      email: session?.email,
    };
  }

  async createFile({ path, content, message }: Omit<GitOpsInput, 'sha'>) {
    const { data } = await this.octokit.repos.createOrUpdateFile({
      owner: this.repository?.owner.name,
      repo: this.repository?.name,
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      committer: this.author,
      author: this.author,
    });
    return data;
  }

  async updateFile({ path, content, message, sha }: GitOpsInput) {
    const { data } = await this.octokit.repos.createOrUpdateFile({
      owner: this.repository?.owner,
      repo: this.repository?.name,
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      sha,
      committer: this.author,
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
      committer: this.author,
    });
    return data;
  }
}

// @ts-ignore
type CreateOrUpdateFileResponse = Octokit.CreateOrUpdateFilesResponse;
// @ts-ignore
type ReposGetContentsResponse = Octokit.ReposGetContentsResponse;
// @ts-ignore
type ReposCreateOrUpdateFileResponse = Octokit.ReposCreateOrUpdateFileResponse;
// @ts-ignore
type ReposDeleteFileResponse = Octokit.ReposDeleteFileResponse;

class GitHubBatchAPI extends GitHubProvider {
  repository: Repository;
  author: Author;
  branch: Maybe['string'];
  constructor({ session }: { session: Session }) {
    super({ auth: session?.accessToken });
    this.repository = null;
    this.branch = 'main';
    this.author = {
      name: session?.user?.name,
      email: session?.email,
    };
  }

  async createFiles(
    repo: string,
    files: Array<{ path: string; content: string }>,
    message: string
  ): Promise<CreateOrUpdateFileResponse> {
    try {
      const responses = await Promise.all(
        files.map((file) =>
          this.octokit.repos.createOrUpdateFile({
            owner: this.repository.owner,
            repo,
            path: file.path,
            message,
            content: file.content,
            branch: this.branch,
          })
        )
      );
      return responses.map((response) => response.data);
    } catch (error) {
      throw error;
    }
  }
  async readFiles(
    repo: string,
    paths: string[],
    ref: string = 'master'
  ): Promise<ReposGetContentsResponse> {
    try {
      const responses = await Promise.all(
        paths.map((path) =>
          this.octokit.repos.getContents({
            owner: this.repository.owner,
            repo,
            path,
            ref,
          })
        )
      );
      return responses.map((response) => response.data);
    } catch (error) {
      throw error;
    }
  }
  async updateFiles(
    repo: string,
    files: Array<{ path: string; content: string; sha: string }>,
    message: string
  ): Promise<ReposCreateOrUpdateFileResponse> {
    try {
      const responses = await Promise.all(
        files.map((file) =>
          this.octokit.repos.createOrUpdateFile({
            owner: this.repository.owner,
            repo,
            path: file.path,
            message,
            content: file.content,
            sha: file.sha,
            branch: this.branch,
          })
        )
      );
      return responses.map((response) => response.data);
    } catch (error) {
      throw error;
    }
  }
  async deleteFiles(
    repo: string,
    files: Array<{ path: string; sha: string }>,
    message: string
  ): Promise<ReposDeleteFileResponse> {
    try {
      const responses = await Promise.all(
        files.map((file) =>
          this.octokit.repos.deleteFile({
            owner: this.repository.owner,
            repo,
            path: file.path,
            message,
            sha: file.sha,
            branch: this.branch,
          })
        )
      );
      return responses.map((response) => response.data);
    } catch (error) {
      throw error;
    }
  }
}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

type GHFileManager = GitHubBatchAPI & GitHubFileAPI;

// class GitFileManager extends applyMixins(GitFileManager, [GitHubProvider, GitHubRepoApi, GitHubFileAPI, GitHubBatchAPI]) {}
