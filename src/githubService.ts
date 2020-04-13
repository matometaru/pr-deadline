import * as githubRepository from './githubRepository'

type DeadlinePull = {
  htmlUrl: string
  number: number
  title: string
}

export async function getDeadlinePullRequest(
  token: string,
  expirationDate: number = 7
): Promise<DeadlinePull[]> {
  const deadlinePullList: any[] = []
  const pullList = await githubRepository.fetchOpenPullRequest(token)

  for (const pull of pullList) {
    const today = new Date()
    const createdAt = new Date(pull.updated_at)
    // @ts-ignore
    const diff = (today - createdAt) / 86400000
    if (expirationDate <= diff) {
      deadlinePullList.push({
        number: pull.number,
        title: pull.title,
        htmlUrl: pull.html_url
      })
    }
  }
  return deadlinePullList
}

export async function closePullRequests(
  token: string,
  pulls: DeadlinePull[]
): Promise<void> {
  const closeFuncList = []
  for (const pull of pulls) {
    closeFuncList.push(githubRepository.closePullRequest(token, pull.number))
  }
  Promise.all(closeFuncList)
}
