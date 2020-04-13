export async function validation(expirationDate: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (isNaN(expirationDate)) {
      throw new Error('expirationDate not a number')
    }

    setTimeout(() => resolve('done!'), expirationDate)
  })
}
