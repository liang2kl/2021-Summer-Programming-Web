# README

前端使用 React，后端使用 Django，数据分析详见 [docs/analysis.md](./docs/analysis.md)。

![https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcblxuYyhDcmF3bGVyKVxuZGJbKERhdGFiYXNlKV1cbmIoQmFja2VuZClcbmYoRnJvbnRlbmQpXG5cbmMgLS0-IGRiXG5kYiAtLT4gYlxuZiAtLXJlcXVlc3QtLT4gYlxuYiAtLXJlc3BvbnNlLS0-IGYiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ](https://mermaid.ink/svg/eyJjb2RlIjoiZ3JhcGggTFJcblxuYyhDcmF3bGVyKVxuZGJbKERhdGFiYXNlKV1cbmIoQmFja2VuZClcbmYoRnJvbnRlbmQpXG5cbmMgLS0-IGRiXG5kYiAtLT4gYlxuZiAtLXJlcXVlc3QtLT4gYlxuYiAtLXJlc3BvbnNlLS0-IGYiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

网站可以访问 https://liang2kl.github.io/2020-2021-Programming-Web/ 进行预览，需要下载数据库文件并在本地运行 Django，否则将无法浏览信息。

在 macOS 下依次运行：

```shell
git clone https://github.com/liang2kl/2020-2021-Programming-Web
cd 2020-2021-Programming-Web/backend
pip3 install django
wget https://github.com/liang2kl/2020-2021-Programming-Web/files/7106341/db.sqlite3.zip
unzip db.sqlite3.zip
python3 manage.py runserver
```

即可打开网页进行浏览。

## 环境配置

系统：macOS 11.0~12.0。

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

Firefox 与 geckodriver（需要 Homebrew）：

```shell
brew install --cask firefox
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

因 B 站动态加载，使用 `selenium` 基于 `FireFox` 加载网页，并用 `BeautifulSoup4` 解析。

选择[数码区](https://www.bilibili.com/v/tech/digital/#/)的 `视频热度排序`，固定区间为 `2020-08-01` 至 `2020-08-31`。

#### 爬取视频信息

首先爬取页面排行榜上的视频 BVID，通过 URL 路径递增进行翻页。值得注意的是，视频 div 元素并不会立即加载，需要使用 `selenium` 的 `WebDriverWait` 等待元素加载后再进行解析：

```python
WebDriverWait(driver, 10, 0.5).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "l-item")))
```

在爬取了视频的 ID 后，我们根据 ID 依次进入视频的主界面爬取视频的详细信息。页面中用户评论是 lazy load 的，需要出现在屏幕上才会进行加载。我们需要滑动到页面底部，并等待元素加载：

```python
driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
WebDriverWait(driver, 10, 0.5).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "reply-wrap")))
```

加载完成后，根据页面结构爬取所需数据。这样我们就完成了一个视频信息的爬取。

另外，为了避免因反爬机制激活或程序中断导致爬取数据丢失，我们每隔一定页面将所得数据储存到数据库中，并在文件中储存当前爬取到第几页。规定一个配置文件格式：

```json
{
    "stride": 1,	// 每隔多少页保存一次数据库
    "max_pages": 300,	// 一共爬取多少页
    "current_offset": 0	// 当前爬取到第几页
}
```

在将数据保存至数据库后，程序更新 `current_offset`，这样就可以在爬虫中断的情况下直接重新运行程序继续爬取。

#### 爬取用户信息

爬取视频信息后，我们需要爬取其对应的用户信息。为了节省时间（使用 `selenium` 爬取一次需要 2 至 3 小时），我们在这里选择直接调用 API 的方式获取。

为尽可能避免反爬机制激活，程序每隔 1 秒爬取一次，并使用 `fake_useragent` 生成随机的 User Agent 头（虽然并没有什么作用）。同样，程序会使用文件记录当前爬取的位置，以便在中断后继续爬取。

#### 数据库

使用 Python 内置的 sqlite3，创建 `video` 和 `user` 两个表，将数据存入。

需要注意的是，sqlite3 并不支持储存数组，我们需要把视频的评论、用户的视频数组序列化存进 sqlite3 中：

```python
videos = json.dumps(user.videos, ensure_ascii=False)
```

### Django 后端

Django 后端仅提供 API，返回 JSON，不返回 HTML 页面。

运行前首先将爬虫所得的数据库迁移。迁移完成后即可直接使用。

调用 API 将返回 JSON 格式的响应，格式如下：

```json
{
    "code": 0,
    "msg": null,
    "data": {
        
    }
}
```

当且仅当 `code` 为 0 时返回有效数据 `data`；发生错误时 `code` 为负，并返回错误原因 `msg`。

后端提供的 API 如下：

#### `/list`

获取视频或用户列表。

| Parameter        | Value                     | Description                                           |
| ---------------- | ------------------------- | ----------------------------------------------------- |
| `type` required  | string, `v`,  `u` or `uv` | 类型， `v` 为视频， `u` 为用户，`uv` 为某一用户的视频 |
| `page` required  | int, >= 1                 | 第几页                                                |
| `count` required | int, >= 1 && <= 100       | 每页返回多少条记录                                    |
| `id` optional    | string                    | 用户 id，当且仅当 `type` 为 `uv` 时需要               |

返回：`data` 为视频或用户 object 的数组

#### `/video`

获取视频信息。

| Parameter     | Value  | Description     |
| ------------- | ------ | --------------- |
| `id` required | string | 所查询视频的 id |

返回：`data` 为所查询的视频 object

#### `/user`

获取用户信息。

| Parameter     | Value  | Description     |
| ------------- | ------ | --------------- |
| `id` required | string | 所查询用户的 id |

返回：`data` 为所查询的用户 object

#### `/stats`

获取统计数据。

| Parameter       | Value               | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `type` required | string, `v` or  `u` | 类型， `v` 为视频， `u` 为用户 |

返回：`data` 为视频或用户的总数，int

#### `/search`

搜索视频或用户。

| Parameter       | Value               | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `type` required | string, `v` or  `u` | 类型， `v` 为视频， `u` 为用户 |
| `q` required    | string              | 搜索关键词                     |

返回：`data` 为视频或用户 object 的数组，另外多了一项 `interval` 为查询用时（秒），double。

### React 前端

使用 [ant-design](https://github.com/ant-design/ant-design) 组件库。

#### 页面路由

在 `App` 中，使用 `react-router-dom` 的 `HashRouter` 进行各个页面的声明式路由，并对特定页面进行重定向：

```jsx
<HashRouter basename={"/"}>
  <Switch>
    <Route path="/" exact render={() => <IndexPage userNum={userCount} videoNum={videoCount}/>} />
    <Route path="/videos/:page" component={() => <VideoListPage videoNum={videoCount}/>} />
    <Route path="/users/:page" component={() => <UserListPage userNum={userCount} />} />
    <Route path="/video/:id" component={() => <VideoPage />} />
    <Route path="/user/:id" component={() => <UserPage />} />
    <Route path="/videos" component={() => <Redirect to="/videos/1"/>}/>
    <Route path="/users" component={() => <Redirect to="/users/1" />} />
    <Route path="/search" component={() => <SearchPage />} />
  </Switch>
</HashRouter>
```

处理页面跳转时，使用 `react-router-dom` 的 `Link` 或 `useHistory` hook 进行跳转：

```jsx
<Link to={"/user/" + users[index].id}>
  {...}
</Link>
```

```jsx
const history = useHistory()
...
history.push("/videos/" + page.toString())
// or: history.replace("/")
// or: history.goBack()
```
