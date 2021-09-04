# README

前端使用 React，后端使用 Django。

## 环境配置

系统：macOS 12.0。

### Python

包括爬虫程序和 Django 后端。

首先，创建虚拟环境：

```shell
python3 -m venv .venv
```

然后，激活虚拟环境：

```shell
source .venv/bin/activate
```

此时命令行输出类似于：

```
(.venv) liang2kl@liang2kl 2020-2021-Programming-Web %
```

最后，安装依赖：

Python 包（在虚拟环境中）：

```shell
pip3 install -r requirements.txt
```

Firefox driver（需要 Homebrew）：

```shell
brew install geckodriver
```

### React

安装依赖：

```shell
cd frontend
npm install
```

## 运行

### 爬虫

进入 `/crawler`：

```shell
cd crawler
```

爬虫分为爬取视频信息、获取用户信息两步。

#### 爬取视频信息

爬取视频信息使用配置文件进行爬取的配置和爬取过程的记录（以防爬取中断）。

在当前目录创建 `crawler_config.json` 文件，内容为：

```json
{
    "stride": 1,
    "max_pages": 300,
    "current_offset": 0
}
```

其中：

- `stride` 每爬取多少页面后写入数据库
- `max_pages` 总共爬取多少页
- `current_offset` 当前爬取到第几页 / 从第几页开始爬取

然后，运行

```shell
python3 videocrawler.py
```

每爬取 `stride` 页后，程序会更新数据库并将当前页面写入 `crawler_config.json` 的 `current_offset`。当爬虫中断时，直接重新运行上述命令即可，无需手动更改配置文件。

#### 获取用户信息

运行：

```shell
python3 videocrawler.py
```

与爬取视频信息相同，程序会记录当前爬取的位置，当爬虫中断后重新运行即可。

### Django 后端

进入 `/backend`：

```shell
cd backend
```

运行后端需要将爬虫中写入的数据库迁移到 Django 内置的数据库中。

将爬虫数据库拷贝到 `/backend`：

```shell
cp ../crawler/db.sqlite3 db.sqlite3
```

> 也可以 [下载已有的数据库](https://github.com/liang2kl/2020-2021-Programming-Web/files/7106341/db.sqlite3.zip)，将其拷贝到 `/backend` 中。

然后，运行命令进行迁移：

```shell
python3 manage.py migrate
```

最后，启动后端服务器：

```shell
python3 manage.py runserver
```

### React 前端

进入 `/frontend`：

```shell
cd frontend
```

启动服务器：

```shell
npm start
```

在浏览器中打开 `localhost:3000` 即可访问。