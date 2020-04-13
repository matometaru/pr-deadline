import {validation} from '../src/validation'
import {advanceTo, clear} from 'jest-date-mock'
import * as githubService from '../src/githubService'
import * as githubRepository from '../src/githubRepository'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(validation(input)).rejects.toThrow('expirationDate not a number')
})

test('getDeadlinePullRequestのテスト', async () => {
  advanceTo(new Date('2020-04-12'))

  const oldPull = {
    updated_at: '2019-12-23T13:17:09Z',
    number: 1,
    title: 'テスト1',
    html_url: 'http://test1.com'
  }
  const newPull = {
    updated_at: '2020-04-10T13:17:09Z',
    number: 2,
    title: 'テスト2',
    html_url: 'http://test2.com'
  }
  jest
    .spyOn(githubRepository, 'fetchOpenPullRequest')
    .mockImplementation(() => {
      return Promise.resolve([oldPull, newPull])
    })
  const deadlinePullList = await githubService.getDeadlinePullRequest('')
  expect(deadlinePullList).toEqual([
    {
      number: 1,
      title: 'テスト1',
      htmlUrl: 'http://test1.com'
    }
  ])

  clear()
})

{
  jest.spyOn(githubService, 'closePullRequests').mockImplementation(() => {
    return Promise.resolve()
  })
}

// test('test runs', async () => {
//   process.env['INPUT_MILLISECONDS'] = '500'
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execSync(`node ${ip}`, options).toString())
// })
