/**
 * yao run scripts.studio.menu.Menu
 * @returns
 */
function Menu(query) {
  // console.log(query);
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
// if (query["id"] && query["id"].length) {
//   var id = query["id"][0];
//   var one = Process("models.request.find", id, {});
//   var url = one["host"] + one["path"];
//   console.log(url);
//   var res = http.Get("www.baidu.com");
//   console.log(res);
//   // var res = http.Get(url);
//   //console.log(res);
// }
// var meunList = [];
// let res = Process("schemas.default.Tables");
// for (var i in res) {
//   let dsl = Process("schemas.default.TableGet", res[i]);
//   var name = "";
//   if (dsl["name"]) {
//     name = dsl["name"] + "(" + res[i] + ")";
//   } else {
//     name = res[i];
//   }

//   meunList.push({
//     path: "/index.html",
//     title: name,
//     value: res[i],
//     icon: "icon-home2",
//   });
// }
// return {
//   code: 200,
//   meunList: meunList,
// };

function Detail(query) {
  //console.log(query);
  // var col = [];

  // if (query["name"] && query["name"].length) {
  //   var name = query["name"][0];
  //   var res = Process("schemas.default.TableGet", name);
  //   var col = res["columns"];
  // }
  // return {
  //   code: 200,
  //   data: col,
  // };

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
  //var res = http.Get("www.baidu.com");
  //console.log("进入");
  var res = Process("models.request.get", {});
  return {
    code: 200,
    data: res,
  };
}
