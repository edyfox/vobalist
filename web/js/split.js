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

var partitions = [];
var wrong = [];
var total = data.length;
var pending;

function addWrongWord(word) {
  pending = 0;
  wrong.push(word);
}

function renderProgress() {
  var progress = document.getElementById("progress");
  progress.innerText = "Current partition: " +
      (data.length + 1) + " remaining, " +
      wrong.length + " wrong, " +
      total + " total (" +
      (partitions.length + 1) +
      (partitions.length > 0 ? " partitions)" : " partition)");
}

function insertWord(word, container) {
  var index = Math.floor(Math.random() * container.length);
  container[index].push(word);
}

function split() {
  var split = document.getElementById("split");
  var pieces = parseInt(split.value);
  // NaN > 0 returns false, and NaN <= 0 also returns false.
  // That's why we say "!(pieces > 0)" here instead of "pieces <= 0".
  if (!(pieces > 0)) {
    alert("Please input a positive number as partitions");
    split.value = "";
    return;
  }

  var newPartition = [];
  for (var i = 0; i < pieces; ++i) {
    newPartition.push([]);
  }

  for (var word in data) {
    insertWord(data[word], newPartition);
  }

  for (var word in wrong) {
    insertWord(wrong[word], newPartition);
  }

  for (var p in partitions) {
    for (var word in partitions[p]) {
      insertWord(partitions[p][word], newPartition);
    }
  }

  partitions = [];
  while (newPartition.length > 0) {
    var item = newPartition.pop();
    if (item.length > 0) {
      partitions.push(item);
    }
  }

  data = partitions.pop();
  wrong = [];
  total = data.length + pending;

  renderProgress();
}

function nextPartition() {
  if (partitions.length == 0) {
    return false;
  } else {
    data = partitions.pop();
    wrong = [];
    total = data.length;
    return true;
  }
}
