FROM node:20-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

EXPOSE 3000

# 開発環境ではtsxを使用するため、ビルドは不要
CMD ["npm", "run", "dev"]
