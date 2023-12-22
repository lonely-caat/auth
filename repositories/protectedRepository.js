export class ProtectedRepository {
  async getProtected(){
    return {secret:'value'}
  }
}
