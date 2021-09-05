# README

前端使用 React，后端使用 Django。

![https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcblxuYyhDcmF3bGVyKVxuZGJbKERhdGFiYXNlKV1cbmIoQmFja2VuZClcbmYoRnJvbnRlbmQpXG5cbmMgLS0-IGRiXG5kYiAtLT4gYlxuZiAtLXJlcXVlc3QtLT4gYlxuYiAtLXJlc3BvbnNlLS0-IGYiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ](https://mermaid.ink/svg/eyJjb2RlIjoiZ3JhcGggTFJcblxuYyhDcmF3bGVyKVxuZGJbKERhdGFiYXNlKV1cbmIoQmFja2VuZClcbmYoRnJvbnRlbmQpXG5cbmMgLS0-IGRiXG5kYiAtLT4gYlxuZiAtLXJlcXVlc3QtLT4gYlxuYiAtLXJlc3BvbnNlLS0-IGYiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

## 环境配置

系统：macOS 11.x。

### Python

包括爬虫程序和 Django 后端。

首先，进入项目根目录，创建虚拟环境：

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

进入 `/frontend`，安装依赖：

```shell
npm install
```

## 运行

### 爬虫

激活虚拟环境，并进入 `/crawler`。爬虫分为爬取视频信息、获取用户信息两步。

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
python3 usercrawler.py
```

与爬取视频信息相同，程序会记录当前爬取的位置，当爬虫中断后重新运行即可。

### Django 后端

激活虚拟环境，并进入 `/backend`。

运行后端需要将爬虫中写入的数据库迁移到 Django 内置的数据库中。将爬虫数据库拷贝到 `/backend`：

```shell
cp ../crawler/db.sqlite3 db.sqlite3
```

然后，运行命令进行迁移：

```shell
python3 manage.py migrate
```

> 也可以[下载已有的数据库](https://github.com/liang2kl/2020-2021-Programming-Web/files/7106341/db.sqlite3.zip)，将其拷贝到 `/backend` 中。

最后，启动后端服务器：

```shell
python3 manage.py runserver
```

### React 前端

进入 `/frontend`，启动服务器：

```shell
npm start
```

在浏览器中打开 `localhost:3000` 即可访问。

## 技术实现

### 爬虫

因 B 站动态加载，使用 `selenium` 基于 `FireFox` 加载并用 `BeautifulSoup4` 爬取网页。

选择[数码区](https://www.bilibili.com/v/tech/digital/#/)的 `视频热度排序`，固定区间为 `2020-08-01` 至 `2020-08-31`。

#### 爬取视频 id

