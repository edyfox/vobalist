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

var wrong = [];
var total = data.length;
var finished = false;

function render(obj) {
  var result = document.getElementById("result");
  var button = document.getElementById("button");
  var pronun = document.getElementById("pronun");
  var meaning = document.getElementById("meaning");
  var examples = document.getElementById("examples");
  var form = document.getElementById("form");
  var progress = document.getElementById("progress");

  result.value = obj.word[0];

  pronun.innerHTML = "";
  meaning.innerText = obj.trans;
  examples.innerHTML = "";
  progress.innerText = data.length + "/" + total;

  form.onsubmit = (function() {
    form.onsubmit = (function() {
      nextWord();
      return false;
    });
    renderIps(pronun, obj.pronun);
    renderExamples(examples, obj.examples);
    if (result.value == obj.word) {
      result.className = "correct";
    } else {
      result.value = obj.word;
      result.className = "wrong";
      wrong.push(obj);
    }
    button.value = "Next";
    return false;
  });
}

function finishRender() {
  document.getElementById("result").value = "";
  document.getElementById("button").disabled = true;
  document.getElementById("pronun").innerHTML = "";
  document.getElementById("meaning").innerText = "";
  document.getElementById("examples").innerHTML = "";
  document.getElementById("progress").innerText = "Finished";
  finished = true;
}

function nextWord() {
  if (data.length == 0) {
    if (wrong.length == 0) {
      finishRender();
      return;
    } else {
      data = wrong;
      wrong = [];
      total = data.length;
    }
  }

  var button = document.getElementById("button");
  button.value = "Go";
  var index = Math.floor(Math.random() * data.length);
  var obj = data[index];
  render(obj);
  data.splice(index, 1);
  var result = document.getElementById("result");
  result.className = "normal";
  result.focus();
}
