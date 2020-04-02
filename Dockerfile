# ==== 阶段一，Vue 打包 ====
FROM harbor.leaniot.cn/lib/vue-cli as builder
WORKDIR /app
# 1. 安装依赖
COPY package.json ./
COPY yarn.lock ./

# 私有 NPM 仓库 (TODO: 在 .gitlab-ci.yml 中用 --build-arg 加环境变量指定密码)
ARG NPM_USER=admin
ARG NPM_PASS=AAbb123456
ARG NPM_EMAIL=admin@txiiot.cn

RUN npm install --dev npm-login-cmd --registry=https://registry.npm.taobao.org && rm package-lock.json
COPY .npmrc ./
RUN npx npm-login-cmd

RUN yarn config set registry http://npm.txiiot.cn/ && \
    yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass && \
    yarn install --ignore-optional --network-timeout 1000000
# 2. 拷贝所有代码，执行打包命令
COPY . .
RUN yarn run build

# ==== 阶段二，Nginx ====
FROM nginx:1.15-alpine
# 1. 将阶段一的 dist 产物拷贝到 Nginx 静态目录
COPY --from=builder /app/dist /usr/share/nginx/html
# 2. 将 nginx.conf 放置到正确位置
COPY nginx.conf /etc/nginx/conf.d/default.conf.template


EXPOSE 80

CMD /bin/sh -c "DOLLAR=$ envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
