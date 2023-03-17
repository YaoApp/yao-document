/**
 * yao run scripts.studio.menu.Menu
 * @returns
 */
function Menu(query) {
  if (query["id"] && query["id"].length) {
    var id = query["id"][0];
    var exists = Process("models.request.find", id, {});
    var url = exists["host"] + "/api/studio/menu";

    var res = http.Get(url);
    if (res.code == 200 && res.data.code == 200) {
      var all = res.data.meunList;
      return {
        code: 200,
        meunList: all,
      };
    }
  }
}

function Detail(query) {
  var id = "";
  var name = "";
  if (query["id"] && query["id"].length) {
    id = query["id"][0];
  }

  if (query["name"] && query["name"].length) {
    name = query["name"][0];
  }

  var exists = Process("models.request.find", id, {});
  var url = exists["host"] + "/api/studio/detail?name=" + name;

  var res = http.Get(url);
  console.log(res);
  if (res.code == 200 && res.data.code == 200) {
    var all = res.data.data;
    return {
      code: 200,
      data: all,
    };
  }
}

function All() {
  var res = Process("models.request.get", {});
  return {
    code: 200,
    data: res,
  };
}
