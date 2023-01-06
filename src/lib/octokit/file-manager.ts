import { Octokit } from '@octokit/rest';

export const octokit = new Octokit({
  // auth: `${nextAuth.providers[0].credentials.token}`,
  // auth: `client_id:${clientId}, client_secret:${clientSecret}`,
});

interface Repository {
  name: string;
  owner: string;
}

type GitOpsInput = {
  path: string;
  content: any;
  message: string;
  sha: string;
};

class FileManager {
  repository: Repository;
  octokit: any;
  constructor(repository: Repository, token: string) {
    this.repository = repository;
    this.octokit = octokit;
  }

  async createFile({ path, content, message }: Omit<GitOpsInput, 'sha'>) {
    const { data } = await this.octokit.repos.createOrUpdateFile({
      owner: this.repository.owner,
      repo: this.repository.name,
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      committer: {
        name: 'Your Name',
        email: 'your@email.com',
      },
      author: {
        name: 'Your Name',
        email: 'your@email.com',
      },
    });
    return data;
  }

  async readFile({ path }: Pick<GitOpsInput, 'path'>) {
    const { data } = await this.octokit.repos.getContent({
      owner: this.repository.owner,
      repo: this.repository.name,
      path,
    });
    return {
      content: Buffer.from(data.content, 'base64').toString(),
      sha: data.sha,
    };
  }

  async updateFile({ path, content, message, sha }: GitOpsInput) {
    const { data } = await this.octokit.repos.createOrUpdateFile({
      owner: this.repository.owner,
      repo: this.repository.name,
      path,
      content: Buffer.from(content).toString('base64'),
      message,
      sha,
      committer: {
        name: 'Your Name',
        email: 'your@email.com',
      },
      author: {
        name: 'Your Name',
        email: 'your@email.com',
      },
    });
    return data;
  }

  async deleteFile({ path, sha, message }: Omit<GitOpsInput, 'content'>) {
    const { data } = await this.octokit.repos.deleteFile({
      owner: this.repository.owner,
      repo: this.repository.name,
      path,
      sha,
      message,
      committer: {
        name: 'Your Name',
        email: 'your@email.com',
      },
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
        owner: this.repository.owner,
        repo: this.repository.name,
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
}

module.exports = FileManager;

export async function selectRepository(repositoryName: string) {
  try {
    const { data: repositories } =
      await octokit.repos.listForAuthenticatedUser();
    const selectedRepository = repositories.find(
      (repo) => repo.name === repositoryName
    );
    if (!selectedRepository) {
      throw new Error(`Repository ${repositoryName} not found`);
    }
    return selectedRepository;
  } catch (error) {
    console.error(error);
  }
}
