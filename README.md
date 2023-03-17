<p align="center">
    <h1 align="center">Yao Document</h1>
</p>
<p align="center">
  <a aria-label="website" href="https://yaoapps.com" target="_blank">
    Website
  </a>
  ·
  <a aria-label="producthunt" href="https://www.producthunt.com/posts/yao-app-engine" target="_blank">
    Producthunt
  </a>
  ·
  <a aria-label="twitter" href="https://twitter.com/YaoApp" target="_blank">
    Twitter
  </a>
  ·
  <a aria-label="discord" href="https://discord.gg/nsKmCXwvxU" target="_blank">
    Discord
  </a>
</p>


<center>Yao-Document,使用Yao构建的数据模型生成表格可视化</center>

![演示](https://release-bj-1252011659.cos.ap-beijing.myqcloud.com/docs/yao-document/1679041643689.png)

![演示](https://release-bj-1252011659.cos.ap-beijing.myqcloud.com/docs/yao-document/1679041776803.png)

#### 项目简介:

   ##### 把线上多个项目的模型文件汇总在一个页面 ,然后生成列表式的可视化表格, 以便于查阅


## 如何安装 **(建议在开发模式下和内网中使用)** :

1. 克隆代码 `git clone https://github.com/YaoApp/yao-document.git`

2. 添加并且配置 `.env`文件写入如下代码  ,然后执行:`yao migrate && yao start`
   
 ```json
YAO_DB_DRIVER="sqlite3"
YAO_DB_PRIMARY="./db/yao.db"
YAO_ENV="development"
YAO_HOST="0.0.0.0"
YAO_LANG="zh-cn"
YAO_LOG="./logs/application.log"
YAO_LOG_MODE="TEXT"
YAO_PORT="5099"
YAO_SESSION_FILE="./db/.session"
YAO_SESSION_STORE="file"
YAO_STUDIO_PORT="5077"

```

3. 访问 `http:127.0.0.1:5099/admin/login/admin`,账号密码: `xiang@iqka.com`,`A123456p+`

4. 如下图:新增您的项目域名配置和对应的项目名称 ![图片](https://release-bj-1252011659.cos.ap-beijing.myqcloud.com/docs/yao-document/1679042627908.png)

5. 在步骤四中您配置对应的域名的项目中加入以下代码,新增页面 `/apis/studio.http.json`文件,增加两个开放接口用于提供本项目的数据查询

```json
{
  "name": "studio",
  "version": "1.0.2",
  "description": "studio生成模型函数相关接口",
  "group": "studio",
  "guard": "-",
  "paths": [
    {
      "path": "/menu",
      "method": "GET",
      "guard": "-",
      "process": "scripts.studio.menu.Menu",
      "in": [":query"],
      "out": {
        "status": 200,
        "type": "application/json"
      }
    },
    {
      "path": "/detail",
      "method": "GET",
      "guard": "-",
      "process": "scripts.studio.menu.Detail",
      "in": [":query"],
      "out": {
        "status": 200,
        "type": "application/json"
      }
    }
  ]
}

```

6. 在步骤四中您配置对应的域名的项目中新增JavaScript文件 `/scripts/studio/menu.js`,在里面写入以下代码

```javascript
/**
 * yao run scripts.studio.menu.Menu
 * @returns
 */
function Menu() {
  var meunList = [];
  let res = Process("schemas.default.Tables");
  for (var i in res) {
    let dsl = Process("schemas.default.TableGet", res[i]);
    var name = "";
    if (dsl["name"]) {
      name = dsl["name"] + "(" + res[i] + ")";
    } else {
      name = res[i];
    }

    meunList.push({
      path: "/index.html",
      title: name,
      value: res[i],
      icon: "icon-iconfont1",
    });
  }
  return {
    code: 200,
    meunList: meunList,
  };
}

function Detail(query) {
  var col = [];

  if (query["name"] && query["name"].length) {
    var name = query["name"][0];
    var res = Process("schemas.default.TableGet", name);
    var col = res["columns"];
  }
  return {
    code: 200,
    data: col,
  };
}

```
然后重新启动本项目,访问 `http://127.0.0.1:5099/model/list.html`就能看到对应的页面




