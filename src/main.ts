import * as core from '@actions/core'
import {validation} from './validation'
import * as githubService from './githubService'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token')
    const expirationDate = core.getInput('expirationDate')
    validation(Number(expirationDate))

    let deadlinePullList = []
    deadlinePullList = await githubService.getDeadlinePullRequest(token, Number(expirationDate))
    githubService.closePullRequests(token, deadlinePullList)

    let message = "";
    for (const pull of deadlinePullList) {
      message += `* [${pull.title}](${pull.htmlUrl})\n`
    }

    core.setOutput('closedPulls', JSON.stringify(deadlinePullList))
    core.setOutput('message', message)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
