import {Octokit} from '@octokit/rest'

type Pull = {
  updated_at: string
  html_url: string
  number: number
  title: string
}

export async function fetchOpenPullRequest(token: string): Promise<Pull[]> {
  try {
    const octokit = new Octokit({
      auth: `token ${token}`
    })
    // @ts-ignore
    const [ownerName, repoName] = process.env.GITHUB_REPOSITORY.split('/')
  
    const response = await octokit.pulls.list({
      owner: ownerName,
      repo: repoName,
      state: 'open'
    })
  
    return response.data
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export async function closePullRequest(token: string, number: number) {
  const octokit = new Octokit({
    auth: `token ${token}`
  })
  // @ts-ignore
  const [ownerName, repoName] = process.env.GITHUB_REPOSITORY.split('/')

  octokit.pulls.update({
    owner: ownerName,
    repo: repoName,
    pull_number: number,
    state: 'closed'
  })
}
