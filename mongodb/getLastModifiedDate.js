export const getLastModifiedDate = () => {
  return {
    lastModifiedDate: new Date(),
    $setOnInsert: {
      createAt: new Date()
    }
  }
}
