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
  var yes = document.getElementById("yes");
  var no = document.getElementById("no");
  var pronun = document.getElementById("pronun");
  var meaning = document.getElementById("meaning");
  var examples = document.getElementById("examples");
  var progress = document.getElementById("progress");

  yes.disabled = false;
  result.innerHTML = htmlEncode(obj.word);
  pronun.innerHTML = "";
  meaning.innerHTML = "";
  examples.innerHTML = "";
  renderProgress();

  show = (function() {
    meaning.innerHTML = htmlEncode(obj.trans);
    renderIps(pronun, obj.pronun);
    renderExamples(examples, obj.examples);
  });

  yes.onclick = (function() {
    yes.onclick = nextWord;
    // Override the default "onclick" for button "Don't know".
    no.onclick = (function() {
      addWrongWord(obj);
      nextWord();
    });
    show();
  });

  no.onclick = (function() {
    yes.disabled = true;
    no.onclick = nextWord;
    addWrongWord(obj);
    show();
  });
}

function finishRender() {
  if (nextPartition()) {
    nextWord();
  } else {
    document.getElementById("result").innerHTML = "";
    document.getElementById("yes").disabled = true;
    document.getElementById("no").disabled = true;
    document.getElementById("pronun").innerHTML = "";
    document.getElementById("meaning").innerHTML = "";
    document.getElementById("examples").innerHTML = "";
    document.getElementById("progress").innerHTML = "Finished";
    document.getElementById("split").disabled = true;
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
  var index = Math.floor(Math.random() * data.length);
  var obj = data[index];
  data.splice(index, 1);
  pending = 1;
  render(obj);
}

function init() {
  document.getElementById("yes").disabled = false;
  document.getElementById("no").disabled = false;
  document.getElementById("split").disabled = false;
  nextWord();
}
