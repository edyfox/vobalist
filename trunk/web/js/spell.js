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

var finished = false;

function render(obj) {
  var result = document.getElementById("result");
  var go = document.getElementById("go");
  var pronun = document.getElementById("pronun");
  var meaning = document.getElementById("meaning");
  var examples = document.getElementById("examples");
  var form = document.getElementById("form");

  result.value = obj.word[0];

  pronun.innerHTML = "";
  meaning.innerText = obj.trans;
  examples.innerHTML = "";
  renderProgress();

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
      addWrongWord(obj);
    }
    go.value = "Next";
    return false;
  });
}

function finishRender() {
  if (nextPartition()) {
    nextWord();
  } else {
    document.getElementById("result").value = "";
    document.getElementById("go").disabled = true;
    document.getElementById("pronun").innerHTML = "";
    document.getElementById("meaning").innerText = "";
    document.getElementById("examples").innerHTML = "";
    document.getElementById("progress").innerText = "Finished";
    document.getElementById("split").disabled = true;
    document.getElementById("splitbtn").disabled = true;
    finished = true;
  }
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

  var go = document.getElementById("go");
  go.value = "Go";
  var index = Math.floor(Math.random() * data.length);
  var obj = data[index];
  data.splice(index, 1);
  pending = 1;
  render(obj);
  var result = document.getElementById("result");
  result.className = "normal";
  result.focus();
}
