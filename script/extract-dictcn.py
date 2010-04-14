#!/usr/bin/env python
#
# Copyright 2010 Edward Leap Fox (edyfox@gmail.com).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import sys
import urllib
import xml.dom.minidom

def encode(str):
  result = str
  result = result.replace("\"", "\\\"")
  result = result.replace("\n", "\\n")
  return result

if len(sys.argv) < 2:
  print "Usage: extract.py word"
  sys.exit(1)

ret = 0

word = sys.argv[1]
pronun = ""
trans = "Not found."
examples = []
found = False

sys.stderr.write('Downloading "' + word + '"...\n')

try:
  file = urllib.urlopen("http://api.dict.cn/ws.php?" +
      urllib.urlencode({ "q": word, "utf8": "true" }))
  content = file.read()
  file.close()

  obj = xml.dom.minidom.parseString(content)
  topNode = obj.childNodes[0]
  if topNode.tagName != "dict":
    sys.stderr.write('"' + word + '" not found.\n')
    ret = 1
  else:
    for node in topNode.childNodes:
      if node.nodeType == node.ELEMENT_NODE:
        if node.tagName == "key":
          found = True
          key = node.firstChild.nodeValue
          if key.lower() != word.lower():
            sys.stderr.write('"' + word + '" not found, use "' + key + '".\n')
            word = key
            ret = 1
        if node.tagName == "pron":
          pronun = node.firstChild.nodeValue
        elif node.tagName == "def":
          trans = node.firstChild.nodeValue
        elif node.tagName == "sent":
          sent = { "orig": "", "trans": "" }
          for part in node.childNodes:
            if part.nodeType == part.ELEMENT_NODE:
              if part.tagName == "orig":
                sent["orig"] = part.firstChild.nodeValue
              elif part.tagName == "trans":
                sent["trans"] = part.firstChild.nodeValue
          examples.append(sent)
  obj.unlink()
except:
  found = True
  sys.stderr.write('Failed to look up "' + word + '".\n')
  ret = 1

if not found:
  sys.stderr.write('Failed to look up "' + word + '".\n')
  ret = 1

if pronun != "":
  pronun = "[" + pronun.replace(" ", "") + "]"

result = "{"
result = result + '"word":"' + encode(word) + '",'
result = result + '"pronun":"' + encode(pronun) + '",'
result = result + '"trans":"' + encode(trans) + '",'
result = result + '"examples":['
for sent in examples:
  result = result + '{"orig":"' + encode(sent["orig"]) + '",'
  result = result + '"trans":"' + encode(sent["trans"]) + '"},'
if result[-1] == ',':
  result = result[:-1]
result =  result + ']}'

sys.stdout.write(result.encode("utf-8"))
sys.exit(ret)
