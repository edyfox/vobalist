/*
  Copyright 2010 Edward Leap Fox (edyfox@gmail.com).

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

function htmlEncode(str) {
  var result = str;
  result = result.replace("&", "&amp;");
  result = result.replace("<", "&lt;");
  result = result.replace(">", "&gt;");
  result = result.replace("'", "&apos;");
  result = result.replace("\"", "&quot;");
  result = result.replace("\n", "<br />");
  return result;
}

function renderIps(obj, text) {
  for (var i = 0; i < text.length; ++i) {
    var img = document.createElement("img");
    var key = "char" + text.charCodeAt(i).toString(16);
    if (key in imageMap) {
      img.src = imageMap[key].src;
    } else {
      img.src = imageMap["char3f"].src;
    }
    obj.appendChild(img);
  }
}

function renderExamples(control, obj) {
  var list = document.createElement("ul");
  for (var index in obj) {
    var sentence = obj[index];
    var li = document.createElement("li");
    li.innerHTML = htmlEncode(sentence.orig + "\n" + sentence.trans);
    list.appendChild(li);
  }
  control.appendChild(list);
}
