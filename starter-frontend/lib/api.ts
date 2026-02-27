// API utility functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// TODO: 課題1 - fetchWithAuth関数を実装してください
// ヒント:
// 1. localStorageからトークンを取得
// 2. Authorizationヘッダーに Bearer トークンを設定
// 3. fetch()でAPIを呼び出し
// 4. レスポンスのエラーチェック
// 5. JSONをパースして返す

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // ここに実装してください
  throw new Error('fetchWithAuth not implemented yet')
}

export { API_BASE_URL }
